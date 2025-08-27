# 🚀 RWA Web App - Next.js Web3 Authentication Template

[![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Thirdweb](https://img.shields.io/badge/Thirdweb-5.0-purple?style=for-the-badge&logo=ethereum)](https://thirdweb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

A production-ready, enterprise-grade Next.js application template featuring Web3 wallet authentication and a comprehensive UI component system. Built with modern web technologies and best practices for scalable Web3 applications.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Authentication Flow](#-authentication-flow)
- [Component System](#-component-system)

- [Development](#-development)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🔐 **Web3 Authentication**

- **Wallet-based authentication** using Thirdweb SDK v5
- **Middleware protection** for private routes (`/dashboard/**`)
- **Whitelist system** for authorized wallet addresses
- **JWT token management** with secure cookie handling
- **Auto-connect** and session persistence

### 🎨 **Modern UI/UX**

- **Responsive design** with Tailwind CSS
- **Dark/Light theme** support with system preference detection
- **Component library** built with Radix UI primitives

- **Smooth animations** and transitions

### 🏗️ **Enterprise Architecture**

- **TypeScript** for type safety and developer experience
- **App Router** (Next.js 15) for modern routing
- **Modular component system** with clear separation of concerns
- **State management** with Jotai atoms
- **API routes** with proper error handling

### 📱 **Interactive Elements**


- **Real-time charts** using Recharts
- **Responsive navigation** with sidebar and top navbar
- **Toast notifications** with Sonner

## 🛠️ Tech Stack

### **Frontend Framework**

- **Next.js 15.4.6** - React framework with App Router
- **React 19.1.1** - Latest React with concurrent features
- **TypeScript 5.0** - Type-safe JavaScript

### **Web3 & Blockchain**

- **Thirdweb SDK v5** - Web3 development toolkit
- **WalletConnect** - Multi-wallet connectivity
- **Ethereum** - Blockchain integration

### **Styling & UI**

- **Tailwind CSS 3.3** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Animation library

### **3D & Graphics**


- **@types/three** - TypeScript definitions

### **Development Tools**

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Turbopack** - Fast bundler (Next.js 15)

## 🏛️ Architecture

### **Project Structure**

```
src/
├── app/                    # Next.js App Router
│   ├── (public)/          # Public routes
│   ├── (private)/         # Protected routes
│   ├── api/               # API endpoints
│   └── globals.css        # Global styles
├── components/             # Reusable components
│   ├── ui/                # Base UI components
│   ├── auth/              # Authentication components
│   ├── layouts/           # Layout components

│   └── widgets/           # Feature components
├── contexts/               # React contexts
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
├── stores/                 # State management
├── types/                  # TypeScript definitions
└── providers/              # App providers
```

### **Authentication Architecture**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Public Route  │───▶│   Middleware    │───▶│  Route Guard    │
│   (e.g., /)     │    │   (Route Check) │    │ (Auth Check)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                       │
                                ▼                       ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │  Redirect to    │    │  ConnectButton  │
                       │     /auth       │    │   Overlay       │
                       └─────────────────┘    └─────────────────┘
```

## 🚀 Getting Started

### **Prerequisites**

- **Node.js** 18.17 or later
- **npm**, **yarn**, or **pnpm** package manager
- **Git** for version control

### **Installation**

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/rwa-web-app.git
   cd rwa-web-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**

   ```bash
   cp .env.example .env.local
   ```

   Configure your environment variables:

   ```env
   # Thirdweb Configuration
   THIRDWEB_CLIENT_ID=your_client_id_here
   THIRDWEB_SECRET_KEY=your_secret_key_here

   # App Configuration
   NEXT_PUBLIC_APP_NAME=RWA Web App
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

### **Core Directories**

#### **`src/app/` - Next.js App Router**

- **`(public)/`** - Public routes accessible to all users
- **`(private)/`** - Protected routes requiring authentication
- **`api/`** - Backend API endpoints
- **`layout.tsx`** - Root layout component
- **`globals.css`** - Global CSS styles

#### **`src/components/` - Component Library**

- **`ui/`** - Base UI components (Button, Card, Input, etc.)
- **`auth/`** - Authentication-related components
- **`layouts/`** - Layout components (Header, Sidebar, etc.)

- **`widgets/`** - Feature-specific components
- **`navigation/`** - Navigation components

#### **`src/lib/` - Utility Functions**

- **`whitelist.ts`** - Authorized wallet addresses
- **`utils.ts`** - General utility functions
- **`crypto-utils.ts`** - Cryptographic utilities

#### **`src/types/` - TypeScript Definitions**

- **`crypto.ts`** - Cryptocurrency-related types
- **`auth.ts`** - Authentication types

### **Key Files**

#### **`src/middleware.ts`**

```typescript
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    // Protect dashboard routes
    return NextResponse.redirect(new URL("/auth", request.url));
  }
  return NextResponse.next();
}
```

#### **`src/lib/whitelist.ts`**

```typescript
export const whitelist = [
  "0x04c7aa030ed71502c00a7a805ad84209d0ba9256",
  "0x1234567890123456789012345678901234567890", // Demo wallet
];
```

## 🔐 Authentication Flow

### **1. Route Protection**

- **Middleware** intercepts all requests to `/dashboard/**`
- **Unauthenticated users** are redirected to `/auth`
- **Authenticated users** proceed to the requested route

### **2. Wallet Connection**

- **ConnectButton** from Thirdweb SDK handles wallet connection
- **Multiple wallet support** (MetaMask, WalletConnect, etc.)
- **Auto-connect** for returning users

### **3. Authorization**

- **Whitelist verification** for connected wallets
- **JWT token generation** upon successful authentication
- **Session persistence** with secure cookies

### **4. Access Control**

- **RouteGuard component** protects private routes
- **Real-time wallet status** monitoring
- **Automatic logout** on wallet disconnection

## 🧩 Component System

### **UI Components (`src/components/ui/`)**

Built with Radix UI primitives for accessibility and customization:

```typescript
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Usage example
<Card>
  <CardHeader>
    <CardTitle>Component Title</CardTitle>
  </CardHeader>
  <CardContent>
    <Button variant="default">Click me</Button>
  </CardContent>
</Card>
```

### **Layout Components**

- **`PublicLayout`** - Layout for public pages
- **`PrivateLayout`** - Layout for authenticated pages
- **`Sidebar`** - Navigation sidebar component
- **`TopNavbar`** - Top navigation bar





## 🛠️ Development

### **Available Scripts**

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

### **Code Quality**

- **ESLint** configuration for code quality
- **Prettier** for consistent code formatting
- **TypeScript** strict mode enabled
- **Component documentation** with JSDoc comments

### **Development Workflow**

1. **Feature development** in feature branches
2. **Code review** process for all changes
3. **Automated testing** (to be implemented)
4. **Continuous integration** (to be implemented)

## 🚀 Deployment

### **Vercel (Recommended)**

1. **Connect repository** to Vercel
2. **Configure environment variables**
3. **Deploy automatically** on push to main branch

### **Other Platforms**

- **Netlify** - Static site hosting
- **Railway** - Full-stack deployment
- **Docker** - Containerized deployment

### **Environment Variables**

```env
# Production
NEXT_PUBLIC_APP_URL=https://your-domain.com
THIRDWEB_CLIENT_ID=your_production_client_id
THIRDWEB_SECRET_KEY=your_production_secret_key
```

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### **Development Setup**

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** following the coding standards
4. **Test thoroughly** before submitting
5. **Commit your changes** (`git commit -m 'Add amazing feature'`)
6. **Push to the branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

### **Coding Standards**

- **TypeScript** for all new code
- **ESLint** rules must pass
- **Prettier** formatting required
- **Component documentation** with JSDoc
- **Accessibility** best practices

### **Commit Convention**

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: code style changes
refactor: code refactoring
test: add tests
chore: maintenance tasks
```

## 📚 Additional Resources

### **Documentation**

- [Next.js Documentation](https://nextjs.org/docs)
- [Thirdweb Documentation](https://portal.thirdweb.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)


### **Community**

- [Next.js Discord](https://discord.gg/nextjs)
- [Thirdweb Discord](https://discord.gg/thirdweb)
- [GitHub Discussions](https://github.com/your-username/rwa-web-app/discussions)

### **Related Projects**

- [thirdweb-auth-next](https://github.com/thirdweb-example/thirdweb-auth-next) - Official Thirdweb auth example
- [shadcn/ui](https://ui.shadcn.com/) - UI component library

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Thirdweb team** for the excellent Web3 SDK
- **Vercel** for Next.js and deployment platform
- **Radix UI** for accessible component primitives
- **Tailwind CSS** for the utility-first CSS framework


## 📞 Support

If you need help or have questions:

- **Create an issue** on GitHub
- **Join our Discord** community
- **Check the documentation** in the `/docs` folder
- **Review examples** in the `/examples` folder

---

**Made with ❤️ by the RWA Web App team**

_Built for the future of Web3 applications_
