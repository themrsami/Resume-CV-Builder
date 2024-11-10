# Resume CV Builder

## Description

Resume CV Builder is a powerful, user-friendly web application that allows users to create professional resumes quickly and easily. With a range of customization options and a live preview feature, users can craft the perfect resume tailored to their needs.

## Table of Contents

- [Resume CV Builder](#resume-cv-builder)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Components Overview](#components-overview)
  - [Customization](#customization)
  - [Export Options](#export-options)
  - [Technologies Used](#technologies-used)
  - [Contributing](#contributing)
  - [License](#license)
  - [Live Website](#live-website)

## Features

- User-friendly interface with tab-based navigation
- Real-time preview of the resume
- Multiple resume templates (Modern, Classic, Minimalist)
- Customizable font styles, sizes, and colors
- Adjustable background color
- Sections for Personal Information, Professional Summary, Work Experience, Education, and Skills
- Dynamic addition and removal of entries in various sections
- Form validation for critical fields
- Export options (Print, PNG, JPG)

## Installation

To set up the Resume CV Builder on your local machine, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/themrsami/Resume-CV-Builder.git
   ```

2. Navigate to the project directory:
   ```
   cd resume-cv-builder
   ```

3. Install the dependencies:
   ```
   pnpm install
   ```

4. Start the development server:
   ```
   pnpm dev --turbo
   ```

5. Open your browser and visit `http://localhost:3000` to view the application.

## Usage

1. **Personal Information**: Start by filling in your personal details such as name, email, phone, and location.

2. **Professional Summary**: Write a brief summary of your professional background and key strengths.

3. **Work Experience**: Add your work history, including company names, positions held, dates of employment, and job descriptions.

4. **Education**: Input your educational background, including institutions attended, degrees earned, and graduation dates.

5. **Skills**: List your key skills relevant to your target job or industry.

6. **Customization**: Adjust the template, font styles, sizes, and colors to match your preferences.

7. **Preview**: Use the Preview tab to see how your resume looks in real-time as you make changes.

8. **Export**: Once satisfied, use the export options to print your resume or save it as an image file.

## Components Overview

The Resume CV Builder is composed of several key components:

1. **PersonalInfoSection**: Handles input for personal details.
2. **SummarySection**: Manages the professional summary and key highlights.
3. **ExperienceSection**: Allows adding and editing work experience entries.
4. **EducationSection**: Handles educational background information.
5. **SkillsSection**: Manages the list of skills.
6. **ResumePreview**: Renders the live preview of the resume.

Each component is designed to handle its specific section of the resume, making the code modular and easier to maintain.

## Customization

The Resume CV Builder offers various customization options:

- **Templates**: Choose from Modern, Classic, or Minimalist designs.
- **Font Family**: Select from Arial, Helvetica, Times New Roman, or Courier.
- **Font Size**: Adjust the text size for better readability.
- **Font Color**: Pick any color for the text to match your style.
- **Background Color**: Set the background color of your resume.

These options can be found at the top of the builder interface.

## Export Options

Once you've completed your resume, you have several export options:

1. **Print**: Generates a print-friendly version of your resume.
2. **Export as PNG**: Saves your resume as a high-quality PNG image.
3. **Export as JPG**: Saves your resume as a JPG image.

These options are available at the bottom of the builder interface.

## Technologies Used

- React
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui components
- html2canvas (for image export)

## Contributing

Contributions to the Resume CV Builder are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Live Website

To test the live website, visit: [www.resumecvbuilder.vercel.app](https://www.resumecvbuilder.vercel.app)