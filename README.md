#React Native E-Commerce App (Assessment Project)

A mobile e-commerce application built with React Native + Expo, demonstrating clean architecture, scalable state management, and production-style patterns within an assessment time constraint.

#Overview

This project is a simplified e-commerce mobile application that allows users to:

Browse products

View product details with image carousel

Add products to cart

Checkout (mock payment or pay later)

View order history

View user profile

The focus of this project is architecture quality, state management, and real-world engineering decisions, rather than full backend implementation.

#Architecture & Design Decisions
1. Layered Architecture

The app follows a feature-oriented layered structure:

src/
├── components/        # Reusable UI components
├── screens/           # Screen-level components
├── services/          # API calls & external services
├── store/             # Redux store & slices
├── types/             # TypeScript domain models
├── constants/         # App constants

Why this approach?

Clear separation of concerns

Easier to scale features independently

Improves testability and maintainability


2. #State Management (Redux Toolkit)

I used Redux Toolkit for predictable state management.

Slices implemented:

products – product catalog

cart – cart operations

orders – order history & statuses

profile – user profile data

#Reasons:

Centralized state for cross-screen access

Avoids prop-drilling

Redux Toolkit reduces boilerplate and enforces best practices

3. #Navigation (Expo Router)

File-based routing via expo-router

Tab navigation for core sections

Stack navigation for product details and checkout

#Benefits:

Clean, declarative navigation

Scales well as screens increase

Minimal configuration overhead


4. #Type Safety (TypeScript)

All domain models are strongly typed:

Product

CartItem

Order

User

ShippingAddress

#Why this matters:

Prevents runtime bugs

Improves developer experience

Makes state transitions explicit and safe



Tech Stack
Technology	Usage
React Native	- Core mobile framework
Expo	- Tooling, routing, icons
TypeScript -	Static typing
Redux Toolkit -	Global state management
Expo Router	- Navigation
React Native Toast Message -	User feedback
JSONPlaceholder / DummyJSON -	Mock APIs


#Authentication (Not Implemented – By Design)
Why authentication was not implemented:

Time-boxed assessment

No real backend provided

Authentication flows would add significant overhead without improving assessment signal

#Mitigation Strategy:

Used JSONPlaceholder users as mock authenticated users

User profile is loaded on app start

Profile data is treated as the “logged-in user”

#This approach allows:

Full checkout flow

Order ownership

Profile rendering

Without fake or insecure auth logic


#Features Implemented
✅ Product Listing
✅ Product Detail
✅ Image carousel
✅ Cart
✅ Checkout
✅ Toast feedback
✅ Orders

#Setup Instructions:

The app uses React Native Expo, so Expo Go is required.

1. Clone the repository (git clone <repo-url>
cd project
)
2. Install dependencies (npm install
)
3. Start the app (npx expo start
)
4. Run on device or emulator (npx expo start
)
