# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio website built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4.

## Commands

- `npm run dev` — Start dev server (port 3000)
- `npm run build` — Production build
- `npm start` — Serve production build
- `npm run lint` — Run ESLint (flat config, v9)

## Architecture

- **Next.js App Router** — All routes live under `app/`. No `src/` directory.
- **Tailwind CSS v4** — Uses `@tailwindcss/postcss` plugin (not the older `tailwindcss` CLI or v3 config). Theme colors are defined as CSS variables in `app/globals.css`, not in a `tailwind.config` file.
- **TypeScript strict mode** — Path alias `@/*` maps to the project root.
- **Fonts** — Geist Sans and Geist Mono loaded via `next/font` in `app/layout.tsx`.
- **No test framework** is currently configured.
