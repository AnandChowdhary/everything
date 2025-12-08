# ⏳ Everything

This repository contains timeline of all my activities as an API. It's built using TypeScript and periodically fetches data from various sources and compiles it as a single JSON file.

**API:** https://anandchowdhary.github.io/everything/api.json

[![API CI](https://github.com/AnandChowdhary/everything/actions/workflows/api.yml/badge.svg)](https://github.com/AnandChowdhary/everything/actions/workflows/api.yml)

## 🏗️ Project Structure

The project is organized into modular components:

- **`fetchers/`** - Data fetching functions for each data source
- **`transformers/`** - Functions that transform raw data into timeline items
- **`types/`** - TypeScript type definitions
- **`data/`** - Local JSON data files

## 💽 Data Sources

This repository generates an API from the data available in the [`./data`](./data) directory, and these repositories:

- 🗒️ [AnandChowdhary/blog](https://github.com/AnandChowdhary/blog) - Blog posts I've written
- 📚 [AnandChowdhary/books](https://github.com/AnandChowdhary/books) - Books I've read and want to read
- 🗓 [AnandChowdhary/events](https://github.com/AnandChowdhary/events) - Events I've spoken at
- ✨ [AnandChowdhary/featured](https://github.com/AnandChowdhary/featured) - Top open source projects I've built
- 📍 [AnandChowdhary/location](https://github.com/AnandChowdhary/location) - My real-time location
- 🧭 [AnandChowdhary/okrs](https://github.com/AnandChowdhary/okrs) - My quarterly Objectives and Key Results (OKRs)
- 📱 [AnandChowdhary/projects](https://github.com/AnandChowdhary/projects) - Projects I've worked on
- 🌈 [AnandChowdhary/themes](https://github.com/AnandChowdhary/themes) - My yearly themes
- 🔖 [AnandChowdhary/versions](https://github.com/AnandChowdhary/versions) - Redesigns of my personal website

## 📄 License

[CC BY 4.0](./LICENSE) © [Anand Chowdhary](https://anandchowdhary.com)
