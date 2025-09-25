# Code Server Setup Guide

This guide explains how to set up and use Code Server as a replacement for Monaco Editor in your project.

## What is Code Server?

Code Server is a self-hosted VS Code that runs in the browser. It provides the full VS Code experience including:
- Extensions support
- Integrated terminal
- Debugging capabilities
- Git integration
- IntelliSense and autocomplete

## Installation Options

### Option 1: Local Installation (Recommended for Development)

1. **Install Code Server:**
   ```bash
   # Download and install
   wget https://github.com/coder/code-server/releases/download/v4.104.1/code-server-4.104.1-linux-amd64.tar.gz
   tar -xzf code-server-4.104.1-linux-amd64.tar.gz
   # Install fully (bin + lib + out + src), or use your distro package
   sudo mkdir -p /usr/local/lib/code-server
   sudo cp -r code-server-4.104.1-linux-amd64/* /usr/local/lib/code-server/
   sudo ln -sf /usr/local/lib/code-server/bin/code-server /usr/local/bin/code-server
   ```

2. **Configure Code Server:**
   ```bash
   mkdir -p ~/.config/code-server
   # Configuration is already created in ~/.config/code-server/config.yaml
   ```

3. **Start Code Server:**
   ```bash
   ./start-codeserver.sh
   # Choose option 1 for local installation
   ```

### Option 2: Docker Installation

1. **Start with Docker:**
   ```bash
   ./start-codeserver.sh
   # Choose option 2 for Docker
   ```

### Option 3: Docker Compose (Recommended for Production)

1. **Start with Docker Compose:**
   ```bash
   ./start-codeserver.sh
   # Choose option 3 for Docker Compose
   ```

## Configuration

### Security Settings

The Code Server is configured with:
- **Password authentication:** `mypassword123`
- **CORS enabled:** For iframe embedding
- **Telemetry disabled:** For privacy
- **Update checks disabled:** For stability

### Project Structure

Projects are stored in `/home/zallu/Documents/projects/` and each project gets its own workspace.

## Usage

### Accessing Code Server

1. **Direct Access:** http://localhost:8080
2. **Embedded in App:** The CodeTab component automatically loads Code Server in an iframe

### Default Extensions

The following extensions are pre-installed:
- Python
- TypeScript
- Prettier
- ESLint
- Tailwind CSS
- JSON

### Adding More Extensions

1. Open Code Server in your browser
2. Go to Extensions (Ctrl+Shift+X)
3. Search and install any VS Code extension

## Integration with Your App

The CodeTab component now uses Code Server instead of Monaco Editor:

```tsx
// The component automatically:
// 1. Fetches the Code Server URL from the API
// 2. Embeds it in an iframe
// 3. Handles loading states and errors
// 4. Provides refresh functionality
```

## API Endpoints

- `GET /api/codeserver?project=<project-name>` - Get Code Server URL for a project
- `POST /api/codeserver` - Start/stop Code Server for a project

## Troubleshooting

### Code Server Won't Start

1. Check if port 8080 is available:
   ```bash
   lsof -i :8080
   ```

2. Check Code Server logs:
   ```bash
   code-server --log debug
   ```

### Iframe Not Loading

1. Check CORS settings in `~/.config/code-server/config.yaml`
2. Ensure `cors-origin: "*"` is set
3. Check browser console for errors

### Extensions Not Working

1. Ensure Code Server has internet access
2. Check if extensions are properly installed
3. Restart Code Server after installing extensions

## Security Considerations

### Production Deployment

For production, consider:

1. **Change default password:**
   ```yaml
   # In ~/.config/code-server/config.yaml
   password: your-secure-password
   ```

2. **Use HTTPS:**
   ```yaml
   cert: /path/to/cert.pem
   cert-key: /path/to/key.pem
   ```

3. **Restrict CORS:**
   ```yaml
   cors-origin: "https://yourdomain.com"
   ```

4. **Use authentication tokens:**
   ```yaml
   auth: none
   # Then use --link for secure access
   ```

## Performance

- Code Server uses more resources than Monaco Editor
- Consider using Docker for better resource management
- Monitor memory usage with multiple projects

## Migration from Monaco Editor

The migration is complete! All Monaco Editor code has been removed and replaced with Code Server integration.

### What Changed

1. **Removed dependencies:** `@monaco-editor/react`, `monaco-editor`
2. **Replaced CodeTab component:** Now uses iframe with Code Server
3. **Added API endpoints:** For Code Server management
4. **Added configuration files:** For Code Server setup

### Benefits

- Full VS Code experience
- Extension support
- Better debugging
- Integrated terminal
- Git integration
- More features than Monaco Editor
