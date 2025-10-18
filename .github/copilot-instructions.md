# Copilot Instructions for `vu-project`

This document provides guidance for AI coding agents working on the `vu-project` codebase. Follow these instructions to ensure productivity and alignment with the project's architecture and conventions.

## Project Overview

The `vu-project` is a Next.js-based web application with the following key components:

- **Frontend**: Located in `src/app/`, this directory contains the main pages and layouts for the application. Each subdirectory represents a route (e.g., `quiz/`, `blogs/`, `contact/`).
- **Components**: Reusable UI components are stored in `src/components/`. Examples include `Navbar.js`, `Footer.js`, and `QuizClient.jsx`.
- **API Routes**: Backend logic is implemented in `src/app/api/`. Each subdirectory corresponds to an API endpoint (e.g., `blogs/route.js`, `comments/route.js`).
- **Data Models**: MongoDB models are defined in `src/models/` (e.g., `Author.js`, `Blog.js`).
- **Utilities**: Helper functions and utilities are in `src/lib/` and `src/utils/`.

## Key Conventions

1. **File Naming**:
   - Use PascalCase for React components (e.g., `BlogCard.js`).
   - Use camelCase for utility functions and hooks (e.g., `useWindowSize.js`).

2. **Styling**:
   - Tailwind CSS is used for styling. Configuration is in `tailwind.config.js`.
   - Global styles are defined in `src/app/globals.css`.

3. **Routing**:
   - Follow Next.js conventions for file-based routing.
   - Dynamic routes are indicated with square brackets (e.g., `[slug]/page.js`).

4. **Data Management**:
   - MongoDB is used as the database. Connection logic is in `src/lib/mongodb.js`.
   - JSON files in `data/` are used for static data (e.g., quizzes).

## Developer Workflows

### Running the Project

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production

1. Build the project:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```

### Testing

- No specific testing framework is configured. Add tests as needed.

## Integration Points

- **MongoDB**: Ensure the database is running and the connection string is configured in environment variables.
- **Tailwind CSS**: Modify `tailwind.config.js` for custom styles.

## Examples

- **Reusable Component**: `src/components/BlogCard.js` demonstrates how to create a card component for blogs.
- **API Route**: `src/app/api/blogs/route.js` shows how to define a backend API endpoint.

## Notes for AI Agents

- Always follow the file and directory structure conventions.
- Use existing components and utilities whenever possible.
- Document any new patterns or conventions introduced.

---

For further clarification, consult the project maintainers or refer to the source code.