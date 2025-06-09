import os

# Replace this with the path to your folder
folder_path = 'f:\docs\past papers\primary\P.7\SST\compessed'

# Loop through all files in the folder
for filename in os.listdir(folder_path):
    if '_compressed' in filename:
        # Create new filename by removing '_compressed'
        new_filename = filename.replace('_compressed', '')
        
        # Get full path of old and new file
        old_file = os.path.join(folder_path, filename)
        new_file = os.path.join(folder_path, new_filename)
        
        # Rename the file
        os.rename(old_file, new_file)
        print(f'Renamed: {filename} -> {new_filename}')
