# Content Platform: Dynamic Photo Gallery with Virtualized Masonry Grid and Detailed View

### Design Decisions

#### 1. **Virtualized Masonry Grid**

-   **Virtualization:** Only visible images are rendered, enhancing performance by minimizing unnecessary DOM updates.

-   **Infinite Scroll:** Dynamically loads more photos as the user scrolls, providing a seamless browsing experience
    with efficient API calls.

-   **Responsive Design:** The grid adjusts based on screen size for an optimal experience across devices.

-   **Layout with Styled Components:** The masonry grid is built with React and Styled Components, avoiding external
    layout libraries.

#### 2. **API Integration with Pexels**

-   Integrated Pexels to provide a diverse selection of high-quality images.

#### 3. **Detailed View**

-   Added a detailed view with image metadata (e.g., photographer name) loaded lazily to improve performance.

#### 4. **State Management with React Query**

-   Used React Query to handle API calls, caching, and automatic re-fetching for optimal data management.

#### 5. **Performance Optimization**

-   Used image placeholders and optimized image fetching to enhance loading speed and overall performance.
-   Error boundaries are used for better error handling and increased application stability.

#### 6. **Scalability**

-   Built with React components and TypeScript for scalability, maintainability, and type safety.

## Get Started

### Installation

We use `pnpm` as a package manager: [pnpm](https://pnpm.io/)

```sh
# Install all dependencies
pnpm install
```

#### Commands

```sh
// Run development
pnpm dev
```

#### Building

```sh
// Build
pnpm build
```

#### Lint and Prettier

```sh
pnpm lint
pnpm lint:fix
pmpm prettier
```

## Conventions and Best Practices

-   [Introduction](#introduction)
-   [Commits and commit messages](#commits-and-commit-messages)
-   [Code Quality](#code-quality)
-   [Code Formatting](#code-formatting)
-   [Linting](#linting)
-   [Code Reviews](#code-reviews)
-   [Never push directly to master](#never-push-directly-to-master)

### Introduction

This document contains various conventions and best practices that we strive to adhere.

### Commits and commit messages

#### Conventional Commits

-   Commit messages should be stylistically consistent and follow
    [Conventional Commits](https://www.conventionalcommits.org) specification. We have enabled pre-hook which check
    commit, if it suits conventional commit styles.

### Code Quality

#### Code formatting

-   We use [prettier](https://prettier.io).
-   To make it really convenient and seamless we recommended installing `prettier` as your code editor plugin and set up
    in your IDE settings.
-   We are running `eslint | prettier` with scripts mentioned above

### Linting

We use `eslint` to keep our source code clean.

-   We have enabled pre-hook which check commit, if it suits eslint styles.

### Code Reviews

We are working with Trunk Based Development, which means that we are merging to master frequently. This means that we
need to be extra careful with the code that we are merging. We are using GitHub PRs for code reviews.

#### Never push directly to master

All feature work must happen on it's own fork or a branch. No direct commits on the version (eg. `0.1`) or master
branches are allowed.
