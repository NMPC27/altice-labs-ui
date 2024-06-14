# altice-labs-ui

## Project Description

Altice Labs UI is a simple React-based user interface project designed to make requests to an API and present de result to the user.

## Prerequisites

- Node.js (version 14.x or above)
- npm (version 6.x or above)

## How to Run (Development)

To run the project in development mode:

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

This will start the development server, and you can view the project by navigating to http://localhost:5173 in your browser.

## How to Build

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run build
   ```

The production-ready files will be generated in the /dist directory.

## Testing

On commit, the code will be automatically tested by the following tools:

- ESLint: Ensures code quality and adherence to coding standards.
- Vitest: Runs unit tests to verify functionality.
- Prettier: Formats the code to maintain consistency.

## CI/CD Pipeline

CI/CD pipeline is configured to automatically run the above tests on every commit and deploy this interface to cloudflare pages. This ensures that only high-quality code is integrated into the main branch.

This UI is live on cloudflare pages: https://altice-labs-ui.pages.dev/
(The request to the API will not work, because the API is not deployed on the cloud)
