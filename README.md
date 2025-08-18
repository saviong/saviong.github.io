# Savio Ng's Personal Portfolio

Welcome! This repository holds the code for my personal website, which started its life as a fork of the fantastic [dillionverma/portfolio](https://github.com/dillionverma/portfolio) and has grown into something uniquely my own.

[**View the live site here**](https://savionggithubio.vercel.app/)

## <a name="toc"></a>Table of Contents
- [About This Project](#about)
- [Key Features](#features)
- [Project Structure](#structure)
- [How to Make This Your Own](#how-to)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## <a name="about"></a>About This Project

The primary goal of this portfolio is to do more than just list my experiences; it aims to tell a story. It visually represents my career transition, highlights my technical competencies in a dynamic way, and demonstrates my passion for building clean, efficient, and automated solutions. Every interactive element is designed to provide a deeper insight into my skills and professional philosophy.
<div align="right"><a href="#toc">Back to Top</a></div>

## <a name="features"></a>Key Features

This portfolio is built with a modern, performant, and type-safe technology stack, chosen to provide an excellent developer experience and a fast, responsive user experience.

* **Framework:** [**Next.js**](https://nextjs.org/) - Chosen for its powerful features like Server-Side Rendering (SSR), Static Site Generation (SSG), and optimized performance out of the box.
* **Language:** [**TypeScript**](https://www.typescriptlang.org/) - Used throughout the project to ensure type safety, which helps prevent common errors and makes the codebase easier to maintain and refactor.
* **UI Library:** [**React**](https://reactjs.org/) - The foundation of the UI, allowing for the creation of reusable, stateful components.
* **Styling:** [**Tailwind CSS**](https://tailwindcss.com/) - A utility-first CSS framework that enables rapid and consistent styling directly within the JSX, without the need for separate CSS files.
* **Animation:** [**Framer Motion**](https://www.framer.com/motion/) - A powerful animation library for React that makes it easy to create complex, fluid, and declarative animations.
* **UI Components:** [**shadcn/ui**](https://ui.shadcn.com/) - Provides a set of beautifully designed, accessible, and unstyled component primitives that serve as the building blocks for the UI.
* **Icons:** [**Lucide React**](https://lucide.dev/) - A lightweight and highly customizable SVG icon library that keeps the bundle size small.
<div align="right"><a href="#toc">Back to Top</a></div>

## <a name="structure"></a>Project Structure

Understanding the file structure is key to customizing this portfolio. Here are the most important files and directories:
| File / Directory | Description |
| :--- | :--- |
| **`/public`** | Contains all static assets that are served directly, such as your profile picture (`me.png`), logos, and other images. |
| **`src/app/page.tsx`** | The **main entry point** and layout for the portfolio. This file structures the order and appearance of all the sections on the page. |
| **`src/components/`** | This directory holds all the **reusable React components** that make up the UI. Each component is self-contained. |
| `src/components/career-path.tsx` | The custom animated component that visually showcases the career journey. |
| `src/components/tech-stack.tsx` | The interactive component for displaying the scrolling and grid-based technology stack. |
| `src/components/resume-card.tsx` | The versatile card component used to display items for Work, Education, and Certifications. |
| **`src/data/resume.tsx`** | The **heart of the portfolio**. This is the single source of truth where all your personal data (work history, skills, projects, etc.) is stored. |
| `package.json` | Defines the project's dependencies, scripts, and metadata. |
| `tailwind.config.ts`| The configuration file for Tailwind CSS, where you can customize the design system (colors, fonts, etc.). |
<div align="right"><a href="#toc">Back to Top</a></div>

## <a name="how-to"></a>How to Make This Your Own

Feel free to fork this repository to build your own portfolio. Here’s how to get started:

### 1. Fork and Clone the Repository

First, fork this repository to your own GitHub account. Then, clone it to your local machine:
```bash
git clone https://github.com/YOUR_USERNAME/saviong.github.io.git
cd saviong.github.io
```

### 2. Install Dependencies
This project uses [PNPM](https://pnpm.io/) as its package manager for efficient dependency management.
```bash
# Install pnpm globally if you don't have it
npm install -g pnpm

# Install project dependencies from the root directory
pnpm install
```

### 3. Customize the Content

This is the most important step. All your personal information is managed in one place.

Primary Data: Open `src/data/resume.tsx` and edit the `DATA` object. This is where you'll update your name, summary, work history, education, projects, etc.

Tech Stack Data: Open `src/components/tech-stack.tsx` and modify the `techCategories` array to reflect your personal technology stack.

Profile Picture: Replace the `me.png` file in the `/public` directory with your own photo.

### 4. Run the Development Server

To see your changes live as you edit, run the local development server:

```Bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the result.

### 5. Deploy to Vercel 🚀

The easiest and recommended way to deploy your portfolio is with **[Vercel](https://vercel.com/)**, the creators of Next.js.

1.  **Push to GitHub:** Make sure all your customized code has been pushed to your GitHub repository.

2.  **Connect Your Account:** Sign up for a free account on Vercel and connect it to your GitHub account.

3.  **Import Your Repository:**
    * From your Vercel dashboard, choose to import a new project.
    * Select your forked portfolio repository from the list.
    * Vercel will automatically detect that it's a Next.js project and configure the optimal build settings for you.

> **That's it!** After importing, Vercel will build and deploy your site. Your portfolio will be live on a `vercel.app` URL in minutes.
<div align="right"><a href="#toc">Back to Top</a></div>

## <a name="acknowledgements"></a>Acknowledgements
A huge thank you to Dillion Verma for creating and open-sourcing the original version of this portfolio. It served as a fantastic foundation for this project.

## <a name="license"></a>License

Licensed under the [MIT license](https://github.com/dillionverma/portfolio/blob/main/LICENSE.md).
<div align="right"><a href="#toc">Back to Top</a></div>
