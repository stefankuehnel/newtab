# NewTab

[![GitHub Pages](../../actions/workflows/github-pages.yaml/badge.svg)](../../actions/workflows/github-pages.yaml)

A modern, customizable browser new tab page built by [Stefan Kühnel](https://stefankuehnel.com).

## Features

- **Multi-Service Search**: Integrated search with support for multiple search engines (Google, DuckDuckGo, GitHub, and more)
- **Bang Syntax**: Quick search service switching using "bangs" (e.g., `!g` for Google, `!ddg` for DuckDuckGo)
- **Bookmark Management**: Create, edit, and organize bookmarks with custom icons (favicon, letters, or custom images)
- **Theme Support**: Dark, light, and system theme
- **Keyboard Shortcuts**: Navigate efficiently with keyboard shortcuts (`Ctrl+K` for search, `Shift+S` for settings, `Shift+B` for bookmarks, etc.)
- **Import/Export**: Backup and restore your configuration as JSON

## Get Started

To get started with the project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/stefankuehnel/newtab.git
   cd newtab
   ```

2. **Install dependencies:**

   ```bash
   task install
   ```

3. **Run the development server:**

   ```bash
   task dev
   ```

4. **Open your browser:**

   Navigate to `http://localhost:5173` to see the new tab page in action.

## Development

This project uses [Task](https://taskfile.dev) as a task runner.

### Available Tasks

```bash
# Run default tasks (lint, build and test)
task

# Install dependencies
task install

# Build the project
task build

# Format code
task format

# Run linter
task lint

# Run linter and fix issues
task lint:fix

# Clean build artifacts
task clean
```

### Project Structure

```
tab/
├── src/
│   ├── components/     # React components
│   │   ├── ui/         # shadcn/ui components
│   │   └── ...         # Custom components
│   ├── contexts/       # React Context providers
│   ├── defaults/       # Default data (bookmarks, services)
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── types.ts        # TypeScript types and Zod schemas
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── public/             # Static assets
└── index.html          # HTML template
```

## Documentation

Below you will find a list of documentation for tools used in this project.

- **Vite**: A Next Generation Frontend Tooling - [Docs](https://vitejs.dev/guide/)
- **Nix**: Nix Package Manager - [Docs](https://wiki.nixos.org/wiki/Nix)
- **Nix Flakes**: An Experimental Feature for Managing Dependencies of Nix Projects - [Docs](https://wiki.nixos.org/wiki/Flakes)
- **GitHub Actions**: Automation and Execution of Software Development Workflows - [Docs](https://docs.github.com/en/actions)

## Found a Bug?

Thank you for your message! Please fill out a [bug report](../../issues/new?assignees=&labels=&template=bug_report.md&title=).

## License

This project is licensed under the [GNU General Public License](https://www.gnu.org/licenses/gpl-3.0.txt).
