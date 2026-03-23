# Changelog Strategy

To balance transparency for developers and clarity for the general public, this project follows a specific strategy for maintaining the `CHANGELOG.md`.

## 1. Audience Separation

We distinguish between **User-Facing** changes and **Technical/Developer-Facing** changes.

### User-Facing Sections (Primary)
These sections are for the general public and stakeholders. They should describe visible features, bug fixes, and policy updates in plain language.
- **Added**: New features, pages, or content visible to users.
- **Changed**: Updates to existing user-facing features or content.
- **Deprecated**: Features or pages being phased out.
- **Removed**: Features or pages already removed.
- **Fixed**: Bug fixes for issues that users would notice.
- **Security**: Security-related fixes or updates.

### Developer-Facing Sections (Secondary)
These sections are for contributors and maintainers. They use technical terminology and keep the primary sections clean.
- **Infrastructure**: "How the app runs." CI/CD pipelines, build tools, server configs, hosting, and deployment workflows.
- **Internal**: "Under the hood logic." Internal composables, helper functions, state management, and API integration logic.
- **Technical**: "Code quality and hygiene." Refactoring, linting, type fixes, unit tests, and **project documentation** (e.g., `CONTRIBUTING.md`, `DEPLOYMENT.md`, `CHANGELOG_STRATEGY.md`).

## 2. Infrastructure/Technical Prefixing

Inside developer-facing sections, items must be prefixed with bold action labels to maintain technical context.

**Format:**
`- **Action**: Description`

**Common Actions:**
- **Added**: New internal tool or configuration.
- **Fixed**: Internal bug or type issue.
- **Updated**: Dependency update.
- **Refactored**: Code cleanup or restructuring.
- **Removed**: Deletion of dead code.

## 3. Reference Links

All versions mentioned in headers must have corresponding reference links at the bottom of the file.

```markdown
[Unreleased]: https://github.com/betterlaspinas/betterlaspinas/compare/v1.0.0...main
[1.0.0]: https://github.com/betterlaspinas/betterlaspinas/releases/tag/v1.0.0
```

## 4. UI Rendering

The application automatically sorts sections according to the hierarchy above. Developer-facing sections are styled with a neutral "CPU" icon and gray badge to distinguish them from feature updates.
