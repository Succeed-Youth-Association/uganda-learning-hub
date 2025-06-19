import tkinter as tk
from tkinter import ttk, colorchooser, filedialog, messagebox
from PIL import Image, ImageDraw, ImageTk

class BookCoverGenerator:
    def __init__(self, root):
        self.root = root
        self.root.title("Book Cover Generator")
        
        # Default values
        self.width = 800
        self.height = 600
        self.orientation = "Portrait"
        self.bleed_color = "#FF0000"
        self.spine_color = "#00FF00"
        self.page_count = 200
        self.output_file = "book_cover.png"
        
        # Create UI
        self.create_widgets()
        
        # Preview image
        self.preview_image = None
        self.preview_label = tk.Label(root)
        self.preview_label.pack(pady=10)
        
        # Generate initial preview
        self.update_preview()
    
    def create_widgets(self):
        # Frame for inputs
        input_frame = ttk.Frame(self.root, padding="10")
        input_frame.pack(fill=tk.X)
        
        # Orientation
        ttk.Label(input_frame, text="Orientation:").grid(row=0, column=0, sticky=tk.W)
        self.orientation_var = tk.StringVar(value=self.orientation)
        self.orientation_var.trace_add('write', lambda *args: self.update_preview())
        ttk.Radiobutton(input_frame, text="Portrait", variable=self.orientation_var, 
                        value="Portrait").grid(row=0, column=1, sticky=tk.W)
        ttk.Radiobutton(input_frame, text="Landscape", variable=self.orientation_var, 
                        value="Landscape").grid(row=0, column=2, sticky=tk.W)
        
        # Page count
        ttk.Label(input_frame, text="Page Count:").grid(row=1, column=0, sticky=tk.W)
        self.page_count_var = tk.StringVar(value=str(self.page_count))
        self.page_count_var.trace_add('write', lambda *args: self.update_preview())
        ttk.Entry(input_frame, textvariable=self.page_count_var, width=10).grid(row=1, column=1, sticky=tk.W)
        
        # Bleed color
        ttk.Label(input_frame, text="Bleed Color:").grid(row=2, column=0, sticky=tk.W)
        self.bleed_color_btn = ttk.Button(input_frame, text="Choose", command=self.choose_bleed_color)
        self.bleed_color_btn.grid(row=2, column=1, sticky=tk.W)
        
        # Spine color
        ttk.Label(input_frame, text="Spine Color:").grid(row=3, column=0, sticky=tk.W)
        self.spine_color_btn = ttk.Button(input_frame, text="Choose", command=self.choose_spine_color)
        self.spine_color_btn.grid(row=3, column=1, sticky=tk.W)
        
        # Generate button
        ttk.Button(input_frame, text="Generate Cover", command=self.generate_cover).grid(row=4, column=0, columnspan=3, pady=10)
    
    def choose_bleed_color(self):
        color = colorchooser.askcolor(title="Choose Bleed Color", initialcolor=self.bleed_color)
        if color[1]:
            self.bleed_color = color[1]
            self.update_preview()
    
    def choose_spine_color(self):
        color = colorchooser.askcolor(title="Choose Spine Color", initialcolor=self.spine_color)
        if color[1]:
            self.spine_color = color[1]
            self.update_preview()
    
    def calculate_dimensions(self):
        try:
            self.page_count = int(self.page_count_var.get())
        except ValueError:
            self.page_count = 200
        
        # Simple formula to calculate spine width (1mm per 10 pages)
        spine_width = max(10, self.page_count // 10)
        
        if self.orientation_var.get() == "Portrait":
            cover_width = 600 + spine_width  # Front + spine + back
            cover_height = 800
        else:
            cover_width = 800 + spine_width
            cover_height = 600
        
        return cover_width, cover_height, spine_width
    
    def draw_cover(self, width, height, spine_width):
        """Common method to draw the cover image"""
        # Create blank image
        image = Image.new("RGB", (width, height), "white")
        draw = ImageDraw.Draw(image)
        
        # Draw bleed area (3mm around edges)
        bleed_margin = 10
        draw.rectangle([bleed_margin, bleed_margin, width-bleed_margin, height-bleed_margin], 
                       outline=self.bleed_color, width=2)
        
        # Draw spine area
        spine_x1 = (width - spine_width) // 2
        spine_x2 = spine_x1 + spine_width
        draw.rectangle([spine_x1, 0, spine_x2, height], outline=self.spine_color, width=2)
        
        return image
    
    def update_preview(self, *args):
        width, height, spine_width = self.calculate_dimensions()
        
        # Create the cover image
        image = self.draw_cover(width, height, spine_width)
        
        # Convert to PhotoImage for Tkinter
        self.preview_image = ImageTk.PhotoImage(image)
        self.preview_label.config(image=self.preview_image)
    
    def generate_cover(self):
        width, height, spine_width = self.calculate_dimensions()
        
        # Create final image
        image = self.draw_cover(width, height, spine_width)
        
        # Save the image
        file_path = filedialog.asksaveasfilename(
            defaultextension=".png",
            filetypes=[("PNG files", "*.png"), ("JPEG files", "*.jpg"), ("All files", "*.*")],
            initialfile=self.output_file
        )
        
        if file_path:
            image.save(file_path)
            messagebox.showinfo("Success", f"Book cover saved to {file_path}")

if __name__ == "__main__":
    root = tk.Tk()
    app = BookCoverGenerator(root)
    root.mainloop()