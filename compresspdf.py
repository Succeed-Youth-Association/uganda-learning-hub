import os
import fitz  # PyMuPDF
from PIL import Image
import io
import shutil
from datetime import datetime

def compress_pdf(input_path, output_path, quality=80, resolution=150):
    """
    Compress a PDF file while maintaining quality.
    
    Args:
        input_path (str): Path to input PDF file.
        output_path (str): Path to save compressed PDF.
        quality (int): JPEG quality (1-100), higher = better.
        resolution (int): DPI for images, lower = smaller file size.
    """
    doc = fitz.open(input_path)
    
    # Create a new PDF writer
    writer = fitz.open()
    
    for page in doc:
        # Get the page
        pix = page.get_pixmap(dpi=resolution)
        
        # Convert to image for compression
        img = Image.open(io.BytesIO(pix.tobytes("ppm")))
        
        # Compress the image
        img_bytes = io.BytesIO()
        img.save(img_bytes, format="JPEG", quality=quality)
        img_bytes.seek(0)
        
        # Create a new PDF page with compressed image
        new_page = writer.new_page(width=page.rect.width, height=page.rect.height)
        new_page.insert_image(new_page.rect, stream=img_bytes)
    
    # Save the compressed PDF
    writer.save(output_path, garbage=4, deflate=True)
    writer.close()
    doc.close()

def compress_folder(input_folder, output_folder, quality=80, resolution=150):
    """
    Compress all PDF files in a folder.
    
    Args:
        input_folder (str): Folder containing PDFs to compress.
        output_folder (str): Folder to save compressed PDFs.
        quality (int): JPEG quality (1-100).
        resolution (int): DPI for images.
    """
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
    
    for filename in os.listdir(input_folder):
        if filename.lower().endswith('.pdf'):
            input_path = os.path.join(input_folder, filename)
            output_path = os.path.join(output_folder, filename)
            
            print(f"Compressing: {filename}")
            try:
                compress_pdf(input_path, output_path, quality, resolution)
                
                # Compare file sizes
                orig_size = os.path.getsize(input_path) / 1024
                new_size = os.path.getsize(output_path) / 1024
                reduction = (1 - (new_size / orig_size)) * 100
                
                print(f"  Original: {orig_size:.2f} KB")
                print(f"  Compressed: {new_size:.2f} KB")
                print(f"  Reduction: {reduction:.2f}%\n")
            except Exception as e:
                print(f"  Error compressing {filename}: {str(e)}")

if __name__ == "__main__":
    # Configuration
    INPUT_FOLDER = "f:\docs\past papers\primary\P.7\ENG"  # Folder with original PDFs
    OUTPUT_FOLDER = "f:\docs\past papers\primary\P.7\ENG\compressed_pdfs"  # Folder for compressed PDFs
    QUALITY = 85  # JPEG quality (1-100)
    RESOLUTION = 150  # DPI for images
    
    print(f"PDF Compression Tool (iLovePDF-style)")
    print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Settings: Quality={QUALITY}, Resolution={RESOLUTION} DPI\n")
    
    compress_folder(INPUT_FOLDER, OUTPUT_FOLDER, QUALITY, RESOLUTION)
    
    print("\nCompression complete!")
