import os
import json

def create_file_list_in_each_folder(root_folder):
    for current_folder, subfolders, files in os.walk(root_folder):
        # Get only files (not folders)
        file_list = [f for f in files if os.path.isfile(os.path.join(current_folder, f))]

        # Skip folders with no files
        if not file_list:
            continue

        # Create JSON data in the desired format
        file_data = [{"pdfUrl": filename} for filename in file_list]

        # Define the output path for the JSON file
        output_json_path = os.path.join(current_folder, "file_list.json")

        # Save the JSON data
        with open(output_json_path, "w") as json_file:
            json.dump(file_data, json_file, indent=4)

        print(f"✅ Created JSON in: {output_json_path}")

# 🔄 Replace this with your root folder path
root_folder_path = r"e:\p7-science-past-papers"
create_file_list_in_each_folder(root_folder_path)
