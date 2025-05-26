
# Resource Data Structure

This directory contains JSON files with educational resources organized by:
- Class level (baby, middle, top, p1-p7, s1-s6)
- Resource type (past-papers, lesson-notes, schemes-of-work, holiday-packages, textbooks)
- Subject (mathematics, english, science, etc.)

## Directory Structure

```
public/data/
├── baby/
│   ├── past-papers/
│   │   ├── english.json
│   │   ├── mathematics.json
│   │   └── science.json
│   ├── lesson-notes/
│   │   ├── english.json
│   │   └── mathematics.json
│   └── ...
├── p1/
│   ├── past-papers/
│   │   ├── english.json
│   │   ├── mathematics.json
│   │   └── science.json
│   └── ...
└── s1/
    ├── past-papers/
    │   ├── english.json
    │   ├── mathematics.json
    │   ├── physics.json
    │   └── chemistry.json
    └── ...
```

## JSON File Format

Each JSON file should contain an array of resource documents with only the PDF URL:

```json
[
  {
    "pdfUrl": "https://example.com/path/to/math-paper-2023.pdf"
  },
  {
    "pdfUrl": "https://example.com/path/to/math-revision.pdf"
  }
]
```

## Subject Name Conventions

Subject names in file names should be lowercase with hyphens:
- "English" → "english.json"
- "Mathematics" → "mathematics.json"
- "Social Studies" → "social-studies.json"
- "Religious Education" → "religious-education.json"

## Example File Path

For Primary 1 Past Papers in Mathematics:
`public/data/p1/past-papers/mathematics.json`
