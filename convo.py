import os

# New list of file names
file_names = [
    # Lesson Notes
    "Physics Lesson Notes",
    "TD Lesson Notes",
    "Technical Drawing Lesson Notes",
    "Agriculture Lesson Notes",
    "Art Lesson Notes",
    "Biology Lesson Notes",
    "Chemistry Lesson Notes",
    "Divinity Lesson Notes",
    "Economics Lesson Notes",
    "English Lesson Notes",
    "Entrepreneurship Lesson Notes",
    "Geography Lesson Notes",
    "GP Lesson Notes",
    "History Lesson Notes",
    "ICT Lesson Notes",
    "IPS Lesson Notes",
    "IRE Lesson Notes",
    "Kiswahili Lesson Notes",
    "Literature Lesson Notes",
    "Luganda Lesson Notes",
    "Mathematics Lesson Notes",
    "Mixed Lesson Notes",

    # Past Papers
    "ICT Past Papers",
    "IRE Past Papers",
    "Kiswahili Past Papers",
    "Literature Past Papers",
    "Luganda Past Papers",
    "Lumasaba Past Papers",
    "Lusoga Past Papers",
    "Mathematics Past Papers",
    "Music Past Papers",
    "Physics Past Papers",
    "TD Past Papers",
    "Agriculture Past Papers",
    "All Past Papers",
    "Arabic Past Papers",
    "Art Past Papers",
    "Biology Past Papers",
    "Chemistry Past Papers",
    "Commerce Past Papers",
    "Divity Past Papers",
    "English Past Papers",
    "Entrepreneurship Past Papers",
    "FN Past Papers",
    "French Past Papers",
    "Geography Past Papers",
    "German Past Papers",
    "GP Past Papers",
    "History Past Papers"
]

# Directory to save JSON files
output_dir = "public/data/s6"
os.makedirs(output_dir, exist_ok=True)

# Create empty JSON files
for name in file_names:
    # Replace spaces and slashes, lowercase, add .json
    file_name_formatted = name.lower().replace(" ", "-").replace("/", "-") + ".json"
    file_path = os.path.join(output_dir, file_name_formatted)

    # Create an empty JSON file
    with open(file_path, 'w') as json_file:
        pass  # No content written

    print(f"Created: {file_path}")
