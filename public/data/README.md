
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

Each JSON file should contain an array of resource documents:

```json
[
  {
    "title": "Mathematics Past Paper 2023",
    "pdfUrl": "https://example.com/path/to/math-paper-2023.pdf"
  },
  {
    "title": "Mathematics Revision Guide",
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
```

Create a sample JSON file to demonstrate the structure:

<lov-write file_path="public/data/p1/past-papers/mathematics.json">
[
  {
    "title": "Primary 1 Mathematics End of Term 1 Examination",
    "pdfUrl": "https://fresh-teacher.github.io/resources/p1-mathematics-term1-exam.pdf"
  },
  {
    "title": "Primary 1 Mathematics Mid Term Assessment",
    "pdfUrl": "https://fresh-teacher.github.io/resources/p1-mathematics-midterm.pdf"
  },
  {
    "title": "Primary 1 Mathematics Practice Paper Set A",
    "pdfUrl": "https://fresh-teacher.github.io/resources/p1-mathematics-practice-a.pdf"
  },
  {
    "title": "Primary 1 Mathematics Practice Paper Set B", 
    "pdfUrl": "https://fresh-teacher.github.io/resources/p1-mathematics-practice-b.pdf"
  },
  {
    "title": "Primary 1 Mathematics End of Year Examination",
    "pdfUrl": "https://fresh-teacher.github.io/resources/p1-mathematics-final-exam.pdf"
  }
]
