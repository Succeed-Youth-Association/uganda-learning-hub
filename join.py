import os
import shutil

def move_all_files(source_folder, destination_folder):
    # Make sure the destination folder exists
    os.makedirs(destination_folder, exist_ok=True)

    # Walk through all files and subfolders
    for root, dirs, files in os.walk(source_folder):
        for file in files:
            source_path = os.path.join(root, file)
            destination_path = os.path.join(destination_folder, file)

            # Move the file (overwrite if exists)
            shutil.move(source_path, destination_path)
            print(f"Moved: {source_path} -> {destination_path}")

# 📝 Example usage:
source = r"f:\docs\past papers\NUSERY\TOP EXAMS\top"       # Change this to your source folder
destination = r"f:\docs\past papers\NUSERY\TOP EXAMS\top\COMBINED"    # Change this to your destination folder

move_all_files(source, destination)
