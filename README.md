# 🍽️ Point of Sale - Frontend

Frontend application for **Self Order System** built using React, TypeScript, Tailwind CSS, and Vite.  
This system helps restaurants manage customer self-ordering, kitchen workflows, cashier payments, and analytics dashboards.

---

## ✨ Features

### 👨‍🍳 Customer Side
- Browse food & beverage menu
- Add to cart
- Self ordering system
- Customer order tracking
- cash/cashless payment

### 🧾 Cashier Side
- Verify payments
- Manage transaction status

### 🍳 Kitchen Side
- Kitchen order management
- Cooking status update
- Real-time order flow

### 🛠️ Admin Side
- Dashboard analytics
- Revenue analytics chart
- Most ordered products chart
- Transaction reports
- Product management
- Category management
- Staff management
- User & role management

---

## 🧑‍💻 Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- Recharts
- React Router DOM
- React Icons
- jsPDF
- jspdf-autotable

### Backend
- Laravel REST API
- Laravel Sanctum Authentication

---

## 📊 Dashboard Analytics

The admin dashboard includes:
- Total revenue
- Total paid transactions
- Most ordered products
- Revenue analytics chart

Analytics only calculate transactions with:

```txt
status = paid
```

---

## 📁 Project Structure

```bash
src/
├── assets/
├── components/
├── layouts/
├── pages/
│   ├── Admin/
│   ├── Customer/
│   ├── Cashier/
│   └── Kitchen/
├── routes/
├── services/
└── utils/
```

---

## 🚀 Installation

### 1. Clone Repository

```bash
git clone https://github.com/glriadomenica-debug/Frontend_iconic-resto.git
```

### 2. Go To Project Folder

```bash
cd Frontend_iconic-resto
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

---

## 🔐 Environment Setup

Create `.env` file:

```env
VITE_API_URL=http://localhost:8000/api
```

---

## 🔗 Backend Repository
https://github.com/glriadomenica-debug/Backend_iconic-resto

Make sure backend Laravel API is running.

Example API:

```txt
http://localhost:8000/api
```

---

## 📌 Main Modules

| Module | Description |
|---|---|
| Authentication | Login & Role Access |
| Product Management | CRUD menu products |
| Category Management | CRUD categories |
| Transaction System | Customer ordering |
| Kitchen Management | Kitchen workflow |
| Payment Verification | Cashier payment verification |
| Analytics Dashboard | Revenue & sales analytics |
| Reporting System | Monthly transaction reports |

---

## 📈 Analytics Features

### Most Ordered Products
Displays top-selling menu items based on paid transactions.

### Revenue Analytics
Displays daily revenue charts from paid transactions.

### Transaction Report
Generate downloadable PDF reports:
- Total revenue
- Best seller products
- Most used payment method

---

## 👥 User Roles

| Role | Access |
|---|---|
| Admin | Full system access |
| Cashier | Payment verification |
| Kitchen | Kitchen order management |
| Customer | Self ordering |

---

## 🗄️ Database Relationships

```txt
Transactions 1 : N TransactionDetails
Products 1 : N TransactionDetails
Transactions 1 : 1 PaymentVerification
Roles 1 : N Users
Categories 1 : N Products
```

---

## 📸 System Overview

### Customer Self Order
Customers can order directly from the menu without waiting for staff.

### Kitchen Workflow
Kitchen staff receive real-time order updates.

### Analytics Dashboard
Admin can monitor:
- Revenue
- Product performance
- Transaction analytics

---

## 📄 License

This project is for educational and portfolio purposes.

---

## 👩‍💻 Developer

Developed by Gloria Domenica Ferreira Da Costa E Silva

GitHub:
https://github.com/glriadomenica-debug
