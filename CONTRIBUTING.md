# Contributing to School Management System

Thank you for considering contributing to the School Management System! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

By participating in this project, you agree to:

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm or yarn
- Git
- Android Studio (for Android development)
- Basic knowledge of React Native and TypeScript

### Setup Development Environment

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/PrajolsApp.git
   cd PrajolsApp
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/PrajolsApp.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Create environment file**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

6. **Start development server**
   ```bash
   npm start
   ```

## Development Workflow

### 1. Create a Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests
- `chore/` - Maintenance tasks

### 2. Make Your Changes

- Write clean, readable code
- Follow the coding standards (see below)
- Add tests for new features
- Update documentation as needed

### 3. Test Your Changes

```bash
# Run unit tests
npm test

# Type check
npm run type-check

# Lint code
npm run lint

# Test on Android
npm run android
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: add student bulk import feature"
```

See [Commit Guidelines](#commit-guidelines) for commit message format.

### 5. Keep Your Fork Updated

```bash
git fetch upstream
git rebase upstream/main
```

### 6. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 7. Create Pull Request

- Go to your fork on GitHub
- Click "New Pull Request"
- Fill out the PR template
- Wait for review

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type unless absolutely necessary
- Use strict mode

```typescript
// Good
interface Student {
  id: string;
  name: string;
  grade: number;
}

function getStudent(id: string): Student {
  // implementation
}

// Bad
function getStudent(id: any): any {
  // implementation
}
```

### React Components

- Use functional components with hooks
- Use proper prop types
- Memoize components when appropriate
- Keep components small and focused

```typescript
// Good
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ title, onPress, variant = 'primary' }) => {
  // implementation
};

export default Button;
```

### File Organization

- One component per file
- Group related files in folders
- Use index files for exports
- Follow the existing folder structure

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   ├── Button.styles.ts
│   │   └── index.ts
```

### Naming Conventions

- Components: PascalCase (e.g., `StudentList.tsx`)
- Functions: camelCase (e.g., `calculateGPA`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- Interfaces: PascalCase with 'I' prefix optional (e.g., `Student`)
- Types: PascalCase (e.g., `UserRole`)

### Code Style

- Use 2 spaces for indentation
- Use semicolons
- Use single quotes for strings
- Max line length: 100 characters
- Add trailing commas in objects and arrays

```typescript
// Good
const student = {
  name: 'John Doe',
  grade: 10,
  section: 'A',
};

// Bad
const student = {
  name: "John Doe",
  grade: 10,
  section: 'A'
}
```

### Comments

- Write self-documenting code
- Add comments for complex logic
- Use JSDoc for functions and components
- Keep comments up to date

```typescript
/**
 * Calculates the GPA based on grades
 * @param grades - Array of grade objects
 * @returns Calculated GPA on 4.0 scale
 */
function calculateGPA(grades: Grade[]): number {
  // implementation
}
```

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

### Examples

```bash
feat(auth): add Google Sign-In support

Implemented Google authentication using Firebase
Added necessary configuration and error handling

Closes #123

---

fix(attendance): correct date filtering bug

Fixed issue where attendance records were not properly filtered by date range

Fixes #456

---

docs(readme): update installation instructions

Added steps for Firebase configuration
Clarified environment variable setup
```

### Scope

The scope should indicate what part of the codebase is affected:
- `auth` - Authentication
- `student` - Student management
- `teacher` - Teacher features
- `attendance` - Attendance system
- `grade` - Grade management
- `payment` - Payment integration
- `ui` - UI components
- `api` - API services

## Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] Type checking passes
- [ ] Linting passes
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Self-review completed

### PR Title

Follow commit message format:
```
feat(student): add bulk import functionality
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests passing
```

### Review Process

1. Automated checks must pass
2. At least one maintainer approval required
3. Address review comments
4. Keep PR focused and reasonably sized
5. Be patient and responsive to feedback

## Testing

### Unit Tests

Write tests for:
- Utility functions
- Redux actions and reducers
- Component behavior
- Service functions

```typescript
describe('calculateGPA', () => {
  it('calculates correct GPA', () => {
    const grades = [
      { score: 90, maxScore: 100 },
      { score: 85, maxScore: 100 },
    ];
    expect(calculateGPA(grades)).toBe(4.0);
  });
});
```

### Integration Tests

Test component integration:
```typescript
describe('LoginScreen', () => {
  it('logs in user successfully', async () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);
    
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText('Sign In'));
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalled();
    });
  });
});
```

### E2E Tests

For critical user flows:
```javascript
describe('Student Management', () => {
  it('should create a new student', async () => {
    await element(by.id('add-student-button')).tap();
    await element(by.id('name-input')).typeText('John Doe');
    await element(by.id('submit-button')).tap();
    await expect(element(by.text('John Doe'))).toBeVisible();
  });
});
```

## Documentation

### Code Documentation

- Add JSDoc comments for exported functions
- Document complex algorithms
- Explain non-obvious code
- Keep comments up to date

### README Updates

Update README.md when:
- Adding new features
- Changing setup process
- Modifying configuration
- Adding dependencies

### API Documentation

Document API changes:
- New endpoints
- Changed parameters
- Response format changes
- Error codes

## Questions?

- Open an issue for questions
- Join our community chat
- Check existing documentation
- Ask maintainers

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation

Thank you for contributing! 🎉
