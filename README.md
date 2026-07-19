<p align="center">
  <img src="public/logo.png" width="220" alt="Amazon Clone logo"/>
</p>

<h1 align="center">Amazon Clone</h1>

<p align="center">
  A full-stack e-commerce storefront built with <b>Next.js</b>, <b>TypeScript</b>, <b>Firebase</b>, <b>Redux Toolkit</b> and <b>Stripe</b>.
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=18&pause=1000&color=FF9900&center=true&vCenter=true&width=500&lines=Browse+products+%F0%9F%9B%92;Add+to+cart+%F0%9F%9B%92;Checkout+securely+with+Stripe+%F0%9F%92%B3" alt="Typing SVG"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/-Next.js-000000?style=flat-square&logo=next.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/-Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black"/>
  <img src="https://img.shields.io/badge/-Redux%20Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white"/>
  <img src="https://img.shields.io/badge/-Stripe-635BFF?style=flat-square&logo=stripe&logoColor=white"/>
  <img src="https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white"/>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-screenshots">Screenshots</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-project-structure">Structure</a>
</p>

---

## 📸 Screenshots

<p align="center">
  <img src="public/home.png" width="90%" alt="Home page"/>
  <br/><sub><b>Home</b> — hero banner and category-based product feed</sub>
</p>

<table align="center">
<tr>
<td align="center">
<img src="public/electronics.png" width="260" alt="Electronics category"/>
<br/><sub>Electronics</sub>
</td>
<td align="center">
<img src="public/beauty.png" width="260" alt="Beauty category"/>
<br/><sub>Beauty</sub>
</td>
<td align="center">
<img src="public/toys.png" width="260" alt="Toys category"/>
<br/><sub>Toys</sub>
</td>
</tr>
</table>

> Swap in real product/cart/checkout screenshots as the app evolves — these are pulled from the existing `public/` assets.

## ✅ Features

- [x] 🛍️ Product feed sourced from the Fake Store API
- [x] 🛒 Persistent shopping cart with Redux Toolkit
- [x] 🔐 Authentication via NextAuth
- [x] 💳 Secure checkout with Stripe Checkout Sessions
- [x] 🔔 Stripe webhook handling for order fulfillment
- [x] 🔥 Order history stored and retrieved from Firebase
- [x] 📱 Responsive UI styled with Tailwind CSS
- [x] ⚡ Server-side rendering with Next.js `getServerSideProps`

## 🛠️ Tech Stack

<div align="center">
<img src="https://skillicons.dev/icons?i=nextjs,typescript,react,redux,tailwind,firebase,stripe" />
</div>

## 📂 Project Structure

```
amazon-clone/
├── components/          # UI components (NavBar, ProductFeed, Cart, Footer, ...)
├── pages/
│   ├── api/
│   │   ├── auth/        # NextAuth configuration
│   │   ├── checkout/     # Stripe checkout session endpoint
│   │   └── webhook/       # Stripe webhook handler
│   ├── cart/              # Cart page
│   ├── orders/             # Order history page
│   └── index.tsx            # Home page
├── redux/                     # Redux store & cart slice
├── Firebase/                    # Firebase client config
├── lib/                           # Stripe client helper
├── utilities/                       # Formatting helpers
├── public/                            # Static assets & screenshots
└── styles/                              # Global Tailwind styles
```

## ⚡ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) 16+
- A [Firebase](https://firebase.google.com/) project
- A [Stripe](https://stripe.com/) account (test mode keys are fine)

### Installation

```bash
git clone https://github.com/Tumelo4/amazon-clone.git
cd amazon-clone
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=

STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=
STRIPE_SIGNING_SECRET=
```

### Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

See the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <img src="https://user-images.githubusercontent.com/74038190/212284158-e840e285-664b-44d7-b79b-e264b5e54825.gif" width="450">
</p>

<p align="center">
  <sub>Built with Next.js, TypeScript & Stripe</sub>
</p>