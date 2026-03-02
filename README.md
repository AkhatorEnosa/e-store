# E-Store – Modern Online Shopping App

A clean, responsive **online store** (e-commerce frontend) built with **React**, **Vite**, **Tailwind CSS**, and **Context API** for state management.

Live Demo: [https://shaup.netlify.app](https://shaup.netlify.app)

## Screenshots

Hero![E-Store Hero](https://res.cloudinary.com/dgmpx8acb/image/upload/v1772435010/Screenshot_2026-03-02_at_08.00.44_biljfv.png)

Products![E-Store Products](https://res.cloudinary.com/dgmpx8acb/image/upload/v1772435014/Screenshot_2026-03-02_at_08.01.58_r3zahk.png)

Cart![E-Store Cart](https://res.cloudinary.com/dgmpx8acb/image/upload/v1772435007/Screenshot_2026-03-02_at_08.00.59_lsya4m.png)

Checkout Form![E-Store Checkout Form](https://res.cloudinary.com/dgmpx8acb/image/upload/v1772435004/Screenshot_2026-03-02_at_08.01.07_hikcpv.png)

Search ![E-Store search](https://res.cloudinary.com/dgmpx8acb/image/upload/v1772435014/Screenshot_2026-03-02_at_08.02.11_b0qknt.png)

Contact Us Page![E-Store Contact Us](https://res.cloudinary.com/dgmpx8acb/image/upload/v1772435015/Screenshot_2026-03-02_at_08.02.22_y8wqlz.png)

## ✨ Features

- Responsive product listing grid
- Product detail view
- Cart functionality (add/remove items, view cart)
- Context API for global state (cart, products)
- Smooth animations/transitions (likely using Framer Motion)
- REST API integration for fetching products
- Clean, modern UI with **Tailwind CSS**
- Fast development & build with **Vite**
- Ready for deployment on **Netlify**

## 🛠️ Tech Stack

| Layer            | Technology                     |
|------------------|--------------------------------|
| Frontend         | React 18                       |
| Build Tool       | Vite                           |
| Styling          | Tailwind CSS                   |
| State Management | React Context API              |
| Linting          | ESLint                         |
| Deployment       | Netlify                        |
| Animations       | Framer Motion (likely)         |

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm or pnpm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/AkhatorEnosa/e-store.git

# Go into the project directory
cd e-store

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
# Start development server with hot reload
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The output will be in the `dist/` folder.

### Preview production build locally

```bash
npm run preview
```

## 📦 Project Structure (overview)

```
e-store/
├── public/               → static assets (favicon, images, etc.)
├── src/
│   ├── components/       → reusable UI components
│   ├── context/          → Context API providers & hooks
│   ├── pages/            → page-level components
│   ├── assets/           → images, icons, etc.
│   ├── App.jsx
│   └── main.jsx
├── netlify.toml          → Netlify deployment config
├── tailwind.config.js
├── vite.config.js
├── eslint.config.js
└── package.json
```

## 🌐 Deployment

The project is already configured for **Netlify**:

1. Connect your GitHub repo to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

(Alternatively works great on Vercel, Render, Cloudflare Pages, etc.)

## 🛍️ API Integration

This project fetches products from a public fake store API (e.g. https://fakestoreapi.com).  
Check `src/context/` or data-fetching logic for the exact endpoint.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/amazing-feature`)
3. Commit your Changes (`git commit -m 'Add some amazing feature'`)
4. Push to the Branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License – feel free to use this project for personal or commercial purposes.

---

Made with ❤️ by [Akhator Enosa](https://github.com/AkhatorEnosa)
