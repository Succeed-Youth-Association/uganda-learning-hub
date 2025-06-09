import os
import fitz  # PyMuPDF
from datetime import datetime

def compress_pdf_lossy(input_path, output_path, image_quality=70):
    """
    Compress a PDF file with lossy image compression.
    
    Args:
        input_path (str): Path to the input PDF file
        output_path (str): Path to save the compressed PDF file
        image_quality (int): Quality for JPEG compression (1-100), lower means more compression
    """
    doc = fitz.open(input_path)
    
    # Process each page to compress images
    for page in doc:
        # Get all images on the page
        img_list = page.get_images(full=True)
        
        for img in img_list:
            xref = img[0]
            base_image = doc.extract_image(xref)
            
            # Only process JPEG images (we'll convert others to JPEG)
            if base_image["ext"] not in ("jpeg", "jpg"):
                # Convert non-JPEG images to JPEG with quality setting
                pix = fitz.Pixmap(doc, xref)
                
                # Convert to RGB if needed (JPEG doesn't support transparency)
                if pix.n - pix.alpha > 3:  # CMYK or something else
                    pix = fitz.Pixmap(fitz.csRGB, pix)
                
                # Convert to JPEG with quality setting
                img_data = pix.tobytes("jpeg", quality=image_quality)
                doc.update_image(xref, img_data)
                pix = None  # Free memory
    
    # Save with aggressive compression options
    doc.save(
        output_path,
        garbage=4,          # Remove unused objects
        deflate=True,       # Compress other objects
        clean=True,         # Clean and sanitize the file
        deflate_images=True,  # Compress images
        deflate_fonts=True,   # Compress fonts
    )
    
    doc.close()

def compress_pdfs_in_folder(folder_path, image_quality=70):
    """
    Compress all PDF files in a folder with lossy compression.
    
    Args:
        folder_path (str): Path to the folder containing PDF files
        image_quality (int): JPEG quality setting (1-100)
    """
    # Create a subfolder for compressed files
    compressed_folder = os.path.join(folder_path, "compressed_lossy")
    os.makedirs(compressed_folder, exist_ok=True)
    
    # Get all PDF files in the folder
    pdf_files = [f for f in os.listdir(folder_path) if f.lower().endswith('.pdf')]
    
    if not pdf_files:
        print("No PDF files found in the specified folder.")
        return
    
    print(f"Found {len(pdf_files)} PDF files to compress.")
    print(f"Using JPEG quality setting: {image_quality} (lower = more compression)")
    
    # Process each file
    for pdf_file in pdf_files:
        input_path = os.path.join(folder_path, pdf_file)
        
        # Create output filename
        filename, ext = os.path.splitext(pdf_file)
        output_filename = f"{filename}_compressed_q{image_quality}{ext}"
        output_path = os.path.join(compressed_folder, output_filename)
        
        print(f"Compressing: {pdf_file}...", end=" ")
        
        try:
            # Get original size
            original_size = os.path.getsize(input_path)
            
            # Compress the file
            start_time = datetime.now()
            compress_pdf_lossy(input_path, output_path, image_quality)
            compression_time = (datetime.now() - start_time).total_seconds()
            
            # Get compressed size
            compressed_size = os.path.getsize(output_path)
            
            # Calculate savings
            savings = original_size - compressed_size
            percent_saved = (savings / original_size) * 100
            
            print(f"Done! Original: {original_size/1024:.1f} KB, "
                  f"Compressed: {compressed_size/1024:.1f} KB, "
                  f"Saved: {percent_saved:.1f}%, "
                  f"Time: {compression_time:.2f}s")
            
        except Exception as e:
            print(f"Failed to compress {pdf_file}: {str(e)}")

if __name__ == "__main__":
    # Specify your folder path here
    folder_path = r"F:\docs\past papers\primary\P.7\ENG"
    
    # Set the image quality (try values between 30-70)
    # Lower numbers mean more compression but lower quality
    jpeg_quality = 50
    
    # Verify the folder exists
    if not os.path.exists(folder_path):
        print(f"The specified folder does not exist: {folder_path}")
    else:
        compress_pdfs_in_folder(folder_path, jpeg_quality)
    print("Compression process completed.")