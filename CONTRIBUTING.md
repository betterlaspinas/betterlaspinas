# Contributing to Better Las Piñas

Thank you for your interest in contributing to Better Las Piñas! This document provides guidelines and instructions for contributing to this project.

## 📋 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [How Can I Contribute?](#-how-can-i-contribute)
- [Development Setup](#️-development-setup)
- [Coding Standards](#-coding-standards)
- [Commit Guidelines](#-commit-guidelines)
- [Branching & Versioning](#-branching--versioning)
- [Pull Request Process](#-pull-request-process)
- [Testing Requirements](#-testing-requirements)

## 📜 Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## 🤝 How Can I Contribute?

### Reporting Bugs

- **Check existing issues** - Search [GitHub Issues](https://github.com/betterlaspinas/betterlaspinas/issues) to avoid duplicates
- **Use the bug report template** - Provide clear steps to reproduce
- **Include environment details** - OS, Node version, browser, etc.

### Suggesting Enhancements

- **Check existing suggestions** - Look through issues and discussions
- **Use the feature request template** - Explain the use case clearly
- **Consider scope** - Keep suggestions relevant to LGU portals

### Code Contributions

#### For External Contributors (Forks)

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following our [Coding Standards](#-coding-standards)
4. Write tests for your changes
5. Ensure all tests pass
6. Commit with a descriptive message
7. Push to your fork
8. Open a Pull Request against the `main` branch

#### For Core Team Members (Direct)

1. Clone the repository directly
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. **Draft PRs**: Open a Draft PR early for visibility
4. **Review**: Request review from at least one other core member
5. **Merge**: Squash and merge into `main` once approved
6. **Cleanup**: Delete the feature branch after merging

## 🛠️ Development Setup

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Git

### Setup Instructions

```bash
# Clone your fork
git clone https://github.com/betterlaspinas/betterlaspinas.git
cd betterlaspinas

# Install dependencies
npm install

# Start development server
npm run dev
```

### Running Quality Checks

```bash
# Lint
npm run lint

# Type check
npm run typecheck

# Tests
npm test

# All checks (what pre-commit runs)
npm run lint && npm run typecheck && npm run test -- --run
```

## 📝 Coding Standards

### TypeScript

- **Strict mode enabled** - All type errors must be resolved
- **Explicit types** - Avoid `any`, use proper typing
- **No implicit any** - All parameters must be typed

### Vue 3 / Nuxt

- **Composition API** - Use `<script setup>` syntax
- **TypeScript** - All `.vue` files must use `lang="ts"`
- **Props** - Define with `defineProps<{ ... }>()`
- **Emits** - Define with `defineEmits<{ ... }>()`

### ESLint

- Follow [@antfu/eslint-config](https://github.com/antfu/eslint-config)
- Run `npm run lint:fix` to auto-fix issues
- Pre-commit hooks will enforce these rules

### File Organization

```text
app/
├── components/
│   ├── charts/        # Chart components
│   ├── home/          # Homepage-specific
│   ├── layout/        # Layout components
│   └── ui/            # Reusable UI components
├── composables/       # Composables (use prefix)
├── pages/             # Nuxt pages (file-based routing)
├── types/             # TypeScript definitions
└── utils/             # Helper functions
```

### Naming Conventions

- **Components**: PascalCase (`Header.vue`, `ServiceCard.vue`)
- **Composables**: camelCase with `use` prefix (`useLanguage.ts`)
- **Utils**: camelCase (`configHelper.ts`)
- **Types**: PascalCase (`LGUConfig`, `ServiceItem`)
- **CSS Classes**: kebab-case or Tailwind utilities

## 🌿 Branching & Versioning

This project adheres to professional standards for branching and versioning to ensure consistency and predictability.

### Branching Strategy

We use **GitHub Flow** for our development cycle:

1.  **Main Branch**: The `main` branch always contains production-ready code.
2.  **Feature Branches**: All new work (features, fixes, docs) must be done in a branch.
3.  **Pull Requests**: Merge into `main` only via Pull Requests followed by successful CI checks and human review.

### Versioning Strategy

This project adheres to **[Semantic Versioning (SemVer)](https://semver.org/)** (`MAJOR.MINOR.PATCH`):

- **MAJOR**: Breaking changes
- **MINOR**: New functionality in a backwards-compatible manner
- **PATCH**: Backwards-compatible bug fixes

All releases are tagged in git and documented in the [CHANGELOG.md](CHANGELOG.md).

## 🌿 Branch Naming

We follow a convention that mirrors our commit types: `type/short-description`.

- `feat/user-auth`
- `fix/nav-typo`
- `docs/update-readme`
- `refactor/header-component`
- `test/add-unit-tests`

## 💬 Commit Guidelines

### Format

```text
type(scope): subject

body (optional)

footer (optional)
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(services): add service category filtering

fix(search): resolve fuzzy search scoring issue

docs(readme): update installation instructions

test(composables): add tests for useLanguage
```

## 🔀 Pull Request Process

### Before Submitting

1. **Update from main** - Rebase on latest `main` branch
2. **Run all checks** - Lint, typecheck, and tests must pass
3. **Write tests** - Cover new functionality
4. **Update docs** - README, comments, etc.
5. **Test manually** - Verify changes work as expected

### PR Template

Use the provided PR template and fill out all sections:

- Description of changes
- Related issue(s)
- Type of change (bugfix, feature, etc.)
- Testing performed
- Screenshots (if UI changes)

### Review Process

- **Automated checks** - Must pass CI/CD pipeline
- **Code review** - At least one maintainer approval required
- **Testing** - Reviewers will test functionality
- **Feedback** - Address all review comments
- **Merge Strategy**:
  - **Squash and Merge** (Default): Keeps history clean by combining all PR commits into one.
  - **Merge Commit**: Use only for long-lived branches or significant features where preserving individual commit history is crucial.
  - **Rebase and Merge**: Avoid unless necessary to keep a linear history without squashing.

## 🧪 Testing Requirements

### Test Coverage

- **All new features** must have tests
- **Bug fixes** should include regression tests
- **Existing tests** must continue to pass

### Writing Tests

**Component Test Example:**

```typescript
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import Header from './Header.vue'

describe('Header', () => {
  it('should render navigation', () => {
    const wrapper = mount(Header)
    expect(wrapper.find('nav').exists()).toBe(true)
  })
})
```

**Composable Test Example:**

```typescript
import { describe, expect, it } from 'vitest'

import { useLanguage } from './useLanguage'

describe('useLanguage', () => {
  it('should translate keys correctly', () => {
    const { translate } = useLanguage()
    expect(translate('nav-home')).toBe('Home')
  })
})
```

### Running Tests

```bash
# Watch mode (development)
npm test

# Single run (CI)
npm run test -- --run

# With coverage
npm run test:coverage
```

## 🐛 Debugging Tips

### Common Issues

**Module not found**

```bash
# Clear Nuxt cache
rm -rf .nuxt
npm run dev
```

**Type errors**

```bash
# Regenerate types
npm run postinstall
npm run typecheck
```

**Test failures**

```bash
# Run specific test file
npm test path/to/test.spec.ts
```

## 📞 Getting Help

- **Documentation**: Check README.md and inline comments
- **Issues**: Search existing [GitHub Issues](https://github.com/betterlaspinas/betterlaspinas/issues)
- **Discussions**: Ask in [GitHub Discussions](https://github.com/betterlaspinas/betterlaspinas/discussions)
- **Community**: Join our community channels (if available)

## 🎉 Recognition

Contributors will be:

- Listed in CHANGELOG.md for their contributions
- Credited in release notes
- Recognized in project documentation

Thank you for helping improve local government digital services! 🙏
