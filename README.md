# 🎨 Bazurto PWA

[![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Thirdweb](https://img.shields.io/badge/Thirdweb-5.0-purple?style=for-the-badge&logo=ethereum)](https://thirdweb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

A modern, professional Progressive Web Application for digital product management and NFT minting. Built with cutting-edge web technologies and blockchain integration.

## ✨ Features

### 🎯 **Product Management**

- **Dynamic Product Forms** with customizable fields
- **Real-time Validation** and error handling
- **File Upload Support** for images and documents
- **Product Preview** and editing capabilities
- **Status Management** (Draft, Published, Archived)

### 🚀 **NFT Integration**

- **Product Tokenization** as NFTs on Base Sepolia
- **IPFS Metadata Storage** for decentralized data
- **Smart Contract Integration** with Thirdweb SDK
- **Transaction Tracking** and blockchain verification
- **Wallet Connection** and authentication

### 🎨 **Modern UI/UX**

- **Responsive Design** optimized for all devices
- **Dark/Light Theme** with system preference detection
- **Component Library** built with Radix UI primitives
- **Smooth Animations** and micro-interactions
- **Professional Dashboard** with data visualization

### 🔐 **Authentication & Security**

- **Web3 Wallet Authentication** via Thirdweb
- **Route Protection** with middleware
- **JWT Token Management** with secure cookies
- **Whitelist System** for authorized addresses

## 🛠️ Tech Stack

### **Frontend Framework**

- **Next.js 15.4.6** - React framework with App Router
- **React 19.1.1** - Latest React with concurrent features
- **TypeScript 5.0** - Type-safe JavaScript

### **Web3 & Blockchain**

- **Thirdweb SDK v5** - Web3 development toolkit
- **Base Sepolia** - Ethereum L2 testnet
- **IPFS Storage** - Decentralized metadata storage
- **ERC-721** - NFT standard implementation

### **Styling & UI**

- **Tailwind CSS 3.3** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Animation library

### **State Management**

- **Jotai** - Atomic state management
- **React Hooks** - Custom hooks for business logic
- **Context API** - Theme and authentication context

### **Development Tools**

- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **Turbopack** - Fast bundler (Next.js 15)

## 🏗️ Architecture

### **Project Structure**

```
src/
├── app/                    # Next.js App Router
│   ├── (public)/          # Public routes
│   ├── (private)/         # Protected dashboard routes
│   └── api/               # API endpoints
├── components/             # Reusable components
│   ├── ui/                # Base UI components
│   ├── auth/              # Authentication components
│   ├── layouts/           # Layout components
│   ├── pages/             # Page-specific components
│   └── widgets/           # Feature components
├── services/               # Business logic services
│   ├── thirdweb/          # Blockchain integration
│   └── coinwatch/         # Crypto data services
├── hooks/                  # Custom React hooks
├── stores/                 # State management
├── types/                  # TypeScript definitions
└── lib/                    # Utility functions
```

### **Core Components**

- **DynamicProductForm** - Flexible product creation with custom fields
- **ProductDashboard** - Management interface for products
- **NFTMintingService** - Blockchain integration for tokenization
- **ThemeProvider** - Dark/light mode management
- **AuthenticationFlow** - Web3 wallet connection and protection

## 🚀 Getting Started

### **Prerequisites**

- **Node.js** 18.17 or later
- **npm**, **yarn**, or **pnpm** package manager
- **Git** for version control
- **Web3 Wallet** (MetaMask, WalletConnect, etc.)

### **Installation**

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/bazurto-pwa.git
   cd bazurto-pwa
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
   NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_client_id_here
   NEXT_PUBLIC_THIRDWEB_DEPLOYED_CONTRACT_ADDRESS=your_contract_address

   # Authentication
   NEXT_PUBLIC_ADMIN_WALLET_PRIVATE_KEY=your_admin_key
   NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN=your_domain
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

### **Creating Products**

1. Navigate to the dashboard
2. Click "Nuevo Producto" to open the dynamic form
3. Add custom fields as needed (text, number, image, document, select)
4. Fill in product information and custom fields
5. Submit to mint as NFT (currently in simulation mode)

### **Managing Products**

- **View** all products in the dashboard
- **Edit** existing products and their custom fields
- **Change Status** between draft, published, and archived
- **Preview** products before publishing
- **Delete** products when no longer needed

### **NFT Features**

- **Metadata Storage** on IPFS for decentralization
- **Smart Contract Integration** for blockchain verification
- **Transaction Tracking** with hash verification
- **Token ID Management** for unique identification

## 🔧 Development

### **Available Scripts**

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

### **Code Quality Standards**

- **TypeScript** strict mode enabled
- **ESLint** rules must pass
- **Prettier** formatting required
- **Component documentation** with JSDoc
- **Accessibility** best practices

### **Development Workflow**

1. **Feature development** in feature branches
2. **Code review** process for all changes
3. **Type safety** with TypeScript
4. **Component testing** and validation

## 🚀 Deployment

### **Vercel (Recommended)**

1. **Connect repository** to Vercel
2. **Configure environment variables**
3. **Deploy automatically** on push to main branch

### **Environment Variables for Production**

```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_production_client_id
NEXT_PUBLIC_THIRDWEB_DEPLOYED_CONTRACT_ADDRESS=your_production_contract
```

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### **Development Setup**

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** following the coding standards
4. **Test thoroughly** before submitting
5. **Commit your changes** with conventional commits
6. **Open a Pull Request**

### **Coding Standards**

- **TypeScript** for all new code
- **ESLint** rules must pass
- **Prettier** formatting required
- **Component documentation** with JSDoc
- **Accessibility** best practices

## 📚 Documentation

### **Component Documentation**

- **UI Components** - Base design system components
- **Business Components** - Product management and NFT features
- **Layout Components** - Page structure and navigation
- **Authentication Components** - Web3 wallet integration

### **API Reference**

- **Product Endpoints** - CRUD operations for products
- **NFT Endpoints** - Blockchain integration endpoints
- **Authentication Endpoints** - Wallet connection and verification

## 🔮 Roadmap

### **Phase 1: Core Features** ✅

- [x] Dynamic product forms
- [x] Product management dashboard
- [x] Basic NFT minting simulation
- [x] Web3 wallet authentication

### **Phase 2: Blockchain Integration** 🚧

- [ ] Real NFT minting on Base Sepolia
- [ ] IPFS metadata storage
- [ ] Smart contract interaction
- [ ] Transaction verification

### **Phase 3: Advanced Features** 📋

- [ ] Product marketplace
- [ ] Royalty distribution
- [ ] Multi-chain support
- [ ] Advanced analytics

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Thirdweb team** for the excellent Web3 SDK
- **Vercel** for Next.js and deployment platform
- **Radix UI** for accessible component primitives
- **Tailwind CSS** for the utility-first CSS framework
- **Base Network** for L2 scaling solution

## 📞 Support

If you need help or have questions:

- **Create an issue** on GitHub
- **Check the documentation** in the codebase
- **Review examples** in the components
- **Join our community** discussions

---

**Built with ❤️ by the Bazurto PWA team**

_Empowering digital product management with blockchain technology_
