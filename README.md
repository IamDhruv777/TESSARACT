# 🚀 AI LaunchPilot — AI Marketing Automation Engine

> Built at Tessaract 2026 | Team CODEPULSE

## What is AI LaunchPilot?

AI LaunchPilot is an **AI-powered marketing automation pipeline** that generates full-scale launch campaigns the moment a product feature is shipped. One webhook trigger → the AI generates platform-specific copy, hashtags, AI-generated posters, and animated GIFs — all in under 60 seconds.

## 🏗️ Architecture

```
┌─────────────────────┐     Webhook      ┌─────────────────────┐
│  Product Backend    │ ──────────────►  │  System Backend     │
│  (Admin Console)    │   POST /webhook  │  (AI Pipeline)      │
│  localhost:8000     │                  │  localhost:8001     │
└─────────────────────┘                  └────────┬────────────┘
                                                  │
                                                  │ Polls /api/campaigns
                                                  ▼
                                         ┌─────────────────────┐
                                         │  React Frontend     │
                                         │  (Live Dashboard)   │
                                         │  localhost:5173     │
                                         └─────────────────────┘

```

## 🧠 AI Pipeline (8 Stages)

1. **Feature Extraction** — Parses incoming webhook data
2. **Target Audience Profiling** — Identifies ideal audience
3. **Platform Strategy** — Selects optimal channels
4. **Copy Generation** — Writes platform-specific posts (LinkedIn, X, Discord, Reddit, Instagram, Threads)
5. **Hashtag & Keyword SEO** — Generates trending hashtags
6. **Creative Generation** — AI image poster + animated GIF via Pollinations.ai & ImageIO
7. **Campaign Quality Audit** — Reviews content quality
8. **Asset Packaging** — Bundles everything for deployment

## 🛠️ Tech Stack

| Layer            | Tech                                 |
|------------------|--------------------------------------| 
| Frontend         | React + Tailwind CSS + Framer Motion |
| System Backend   | Python + FastAPI                     |
| Product Backend  | Python + FastAPI                     |
| Image Generation | Pollinations.ai (free AI) + Pillow   |
| GIF Generation   | ImageIO + FFmpeg + NumPy             |
| Communication    | HTTP Webhooks (event-driven)         |

## ⚡ Quick Start

```bash
# 1. Install frontend dependencies
cd launchgen-prototype && npm install && cd ..

# 2. Install backend dependencies
pip install -r system-backend/requirements.txt
pip install -r product-backend/requirements.txt

# 3. Launch all 3 services
.\start_demo.ps1
```

Open:
- **http://localhost:5173** → AI Dashboard
- **http://localhost:8000** → Admin Panel (submit features here)

## 👥 Team CODEPULSE

| Name     | Role                                  |
|----------|---------------------------------------|
| Dhruv    | System Architect & AI Pipeline        |
| Ishika   | Frontend Lead & UI Design             |
| Guddu    | Product Backend & Webhook Integration |
| Saee     | Dashboard & Navigation Components     |
| Krish    | Campaign UI & Pipeline Components     |
| Priyansh | DevOps, Documentation & Build Config  |

## 📄 License

Built for Tessaract 2026. All rights reserved.

