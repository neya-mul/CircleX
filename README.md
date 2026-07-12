<div align="center">

# 🌀 CircleX

### Your circle is already here.

Post what you're making, see what your circle is up to, and jump into conversations as they happen — no noise, just the people you actually follow.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com)
[![Better Auth](https://img.shields.io/badge/Auth-Better--Auth-orange?style=flat-square)](https://www.better-auth.com)
[![License](https://img.shields.io/badge/License-MIT-lightgrey?style=flat-square)](#license)

[Live Demo](https://circle-x-rosy.vercel.app) · [Report Bug](https://github.com/neya-mul/CircleX/issues) · [Request Feature](https://github.com/neya-mul/CircleX/issues)

</div>

---

## ✨ About

**CircleX** is a modern social platform built for creators, developers, and tech enthusiasts to share what they're building, discover trending work, and connect with people who actually care about the same things. Think of it as a focused, noise-free feed for your dev/creator circle.

> The ultimate decentralized hub for creators, developers, and tech-enthusiasts to sync minds and push boundaries.

## 🚀 Features

| | |
|---|---|
| ⚡ **Blazing Fast** | Built on edge-ready architecture for sub-millisecond feed updates — nothing ever feels like it's loading. |
| 🛡️ **Strict Type-Safety** | End-to-end TypeScript schemas keep the client and server in sync, with zero runtime surprises. |
| 🌐 **Open Ecosystem** | Share, fork, and adapt content freely — built with the open-source spirit in mind. |
| 📊 **Advanced Analytics** | Track post reach, engagement, and conversion metrics from a built-in dashboard (powered by Recharts). |
| 🎨 **Deep Customization** | Tailor your profile and feed experience with a modular component architecture. |
| 🤖 **AI-Powered Insights** | Smart recommendations, auto-tagging, and content optimization tips. |
| 🔥 **Live Trending** | Discover trending creators and posts in real time. |
| 🔐 **Secure Auth** | Authentication handled via Better Auth with a MongoDB adapter. |

## 🛠️ Tech Stack

**Framework & UI**
- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev) + React Compiler
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/) — animations
- [Keen Slider](https://keen-slider.io/) — carousels
- [React Fast Marquee](https://www.npmjs.com/package/react-fast-marquee) — scrolling marquees
- [Lucide](https://lucide.dev) / [React Icons](https://react-icons.github.io/react-icons/) — iconography
- [Recharts](https://recharts.org) — analytics dashboard
- [React Toastify](https://fkhadra.github.io/react-toastify/) — notifications

**Backend & Data**
- [MongoDB](https://www.mongodb.com) — database
- [Better Auth](https://www.better-auth.com) + Mongo adapter — authentication

**Tooling**
- ESLint 9 (flat config) · PostCSS · Vercel deployment

## 📦 Getting Started

### Prerequisites
- Node.js 18.18+
- A MongoDB connection string
- `npm`, `yarn`, `pnpm`, or `bun`

### Installation

```bash
# Clone the repository
git clone https://github.com/neya-mul/CircleX.git
cd CircleX

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory and configure the values your setup needs, e.g.:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=http://localhost:3000
```

### Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📁 Project Structure

```
CircleX/
├── public/Images/     # Static image assets
├── src/                # Application source (app router, components, lib, etc.)
├── AGENTS.md
├── CLAUDE.md
├── eslint.config.mjs
├── next.config.ts
├── package.json
└── tsconfig.json
```

## 🧭 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint the codebase |

## 🌍 Deployment

CircleX is deployed on [Vercel](https://vercel.com) — the platform built by the creators of Next.js.

**Live:** [circle-x-rosy.vercel.app](https://circle-x-rosy.vercel.app)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is currently unlicensed / all rights reserved. Add a `LICENSE` file to formally open-source it.

## 📬 Contact

**Neaymul Islam**

- Portfolio: [neyamulfolio.vercel.app](https://neyamulfolio.vercel.app)
- Email: neyamulislam946@gmail.com
- Location: Munshiganj, Dhaka, Bangladesh

<div align="center">

⭐ If you like this project, consider giving it a star on GitHub!

</div>