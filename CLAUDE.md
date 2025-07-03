# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a birthday celebration webpage for Jose, created by his DevOps team. It's a modular static website with interactive animations and effects, organized into separate files for maintainability.

## Architecture

- **Modular architecture**: Code is organized into separate CSS and JavaScript files
- **No build process**: This is a static site that can be served directly
- **Assets**: Avatar images stored in `avatars/` directory as WebP files
- **External dependencies**: 
  - Canvas Confetti (loaded from CDN)
  - Google Fonts (Poppins)
  - UI Avatars API (fallback for missing avatars)

## File Structure

```
/
├── index.html (main HTML structure)
├── styles/
│   ├── base.css (typography, resets, layout)
│   ├── components.css (intro, messages, UI elements)
│   └── animations.css (keyframes, transitions)
├── js/
│   ├── data/
│   │   └── team.js (team messages data)
│   ├── audio.js (birthday song functionality)
│   ├── messages.js (message carousel logic)
│   ├── effects.js (confetti, particles, shapes)
│   ├── easter-eggs.js (DevOps hidden elements)
│   └── main.js (initialization, event handlers)
└── avatars/ (team member photos)
```

## Key Components

1. **Intro Screen**: Welcome screen with animated start button
2. **Messages Carousel**: Horizontally scrolling birthday messages with alternating directions
3. **Visual Effects**: Confetti system, floating emojis, background particles
4. **Audio System**: Web Audio API birthday song with controls
5. **Easter Eggs**: Hidden DevOps-themed clickable elements with special effects

## Development Commands

Since this is a static website with no build tools:

- **Run locally**: Open `index.html` directly in a browser or use a simple HTTP server:
  ```bash
  # Python 3
  python3 -m http.server 8000
  
  # Node.js (if http-server is installed globally)
  http-server
  
  # VS Code Live Server extension
  # Right-click index.html → "Open with Live Server"
  ```

- **Deploy**: Copy files to any static hosting service (GitHub Pages, Netlify, Vercel, etc.)

## Important Notes

- All team member data is hardcoded in the `teammates` array (around line 700)
- Avatar images should be 200x200px WebP format in the `avatars/` directory
- The page uses DevOps humor and references throughout (uptime stats, deployment jokes, etc.)
- Messages are bilingual (English/Spanish) reflecting the team's culture
- Mobile responsive with specific adjustments for smaller screens