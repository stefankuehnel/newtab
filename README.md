# New Tab

[![CI](../../../actions/workflows/ci.yaml/badge.svg?label=CI&logo=forgejo&logoColor=white&style=flat-square)](../../../actions?workflow=ci.yaml)

A modern, customizable browser new tab page built by [Stefan Kühnel](https://stefankuehnel.com).

## Features

- **Multi-Service Search**: Integrated search with support for multiple search engines (Google, DuckDuckGo, GitHub, and more)
- **Bang Syntax**: Quick search service switching using "bangs" (e.g., `!g` for Google, `!ddg` for DuckDuckGo)
- **Bookmark Management**: Create, edit, and organize bookmarks with custom icons (favicon, letters, or custom images)
- **Theme Support**: Dark, light, and system theme
- **Keyboard Shortcuts**: Navigate efficiently with keyboard shortcuts (`Ctrl+K` for search, `Shift+S` for settings, `Shift+B` for bookmarks, etc.)
- **Import/Export**: Backup and restore your configuration as JSON, or share it via URL

## Get Started

To get started with the project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://codeberg.org/stefankuehnel/newtab.git
   cd newtab
   ```

2. **Install dependencies:**

   ```bash
   task install
   ```

3. **Initialize project:**

   ```bash
   task init --interactive
   ```

4. **Run the development server:**

   ```bash
   task dev
   ```

5. **Open your browser:**

   Navigate to `http://localhost:5173` to see the new tab page in action.

## Development

This project uses [Task](https://taskfile.dev) as a task runner.

### Available Tasks

```bash
# Run default tasks (lint, build and test)
task

# Initialize project
task init

# Install dependencies
task install

# Run development server
task dev

# Build the project
task build

# Deploy the project
task deploy

# Format code
task format

# Lint project
task lint

# Lint and fix project
task lint:fix

# Clean project artifacts
task clean
```

## Documentation

Below you will find a list of documentation for tools used in this project.

- **Vite**: A Next Generation Frontend Tooling - [Docs](https://vitejs.dev/guide/)
- **React**: A JavaScript Library for Building User Interfaces - [Docs](https://react.dev)
- **Nix**: Nix Package Manager - [Docs](https://wiki.nixos.org/wiki/Nix)
- **Nix Flakes**: An Experimental Feature for Managing Dependencies of Nix Projects - [Docs](https://wiki.nixos.org/wiki/Flakes)
- **Task**: A Task Runner / Build Tool written in Go - [Docs](https://taskfile.dev/)
- **Forgejo Actions**: Automation and Execution of Software Development Workflows - [Docs](https://forgejo.org/docs/latest/user/actions/reference/)

## Found a Bug?

Thank you for your message! Please fill out a [bug report](../../../issues/new?assignees=&labels=&template=bug_report.md&title=).

## License

This project is licensed under the [GNU General Public License](https://www.gnu.org/licenses/gpl-3.0.txt).
