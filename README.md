# React Demo App

A comprehensive React application showcasing various features including routing, form handling, and component organization.

## Features

- React Router navigation
- Form handling and validation
- Price calculator with discount types
- Character attributes management
- Focusable input component
- Item list management
- Todo list functionality
- Comprehensive test suite

## Tech Stack

- React 19
- React Router v7
- Vite 6
- Vitest (Testing)
- React Testing Library
- ESLint
- pnpm (Package Manager)

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- pnpm package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm test` - Run tests in watch mode (auto-reruns on file changes)
- `pnpm test:run` - Run tests once and exit
- `pnpm test:ci` - Run tests in CI environment
- `pnpm test:ui` - Run tests with UI interface
- `pnpm coverage` - Generate test coverage report
- `pnpm lint` - Run ESLint

## Project Structure

```
src/
├── assets/         # Static assets
├── data/          # Data files
├── form/          # Form-related components
├── pages/         # Page components
├── test/          # Test files
├── testdome/      # TestDome specific components
├── __tests__/     # Additional test files
├── App.jsx        # Main application component
├── CharacterAttributes.jsx  # Character attributes component
├── Contact.jsx    # Contact page component
├── Contact2.jsx   # Alternative contact page
├── FocusableInput.jsx  # Focusable input component
├── ItemListManager.jsx # Item list management component
├── MegaStoreApp.jsx # Price calculation component
├── TodoList.jsx   # Todo list component
└── main.jsx       # Application entry point
```

## Testing

The project includes a comprehensive test suite using Vitest and React Testing Library. Tests are organized in the `test/`, `testdome/`, and `__tests__/` directories.

### Running Tests

- **Development Mode**: Use `pnpm test` to run tests in watch mode. This is ideal for development as it automatically reruns tests when files change.
- **Single Run**: Use `pnpm test:run` to run tests once and exit. Useful for quick checks.
- **CI Environment**: Use `pnpm test:ci` for continuous integration environments.
- **UI Mode**: Use `pnpm test:ui` to run tests with a graphical interface.
- **Coverage**: Use `pnpm coverage` to generate a test coverage report.

## Development

This project uses Vite for fast development and building. The development server includes:
- Hot Module Replacement (HMR)
- Fast refresh
- ESLint integration
- TypeScript support (if needed)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

