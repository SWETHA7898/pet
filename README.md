Paws&Co-# 🐱 Pet Products E-Commerce (MERN Stack)
A full-stack e-commerce platform for pet products, featuring user authentication, product management, cart functionality, and order processing.

---

## 🚀 Features
✅ User Authentication (Firebase + JWT)  
✅ Product Management (CRUD operations)  
✅ Cart & Checkout (Persistent cart using JWT)  
✅ Product Filtering (Search-based filters)  
✅ Order Processing 


---

## 📂 Project Structure
```
/backend
  ├── config/          # Database & Firebase config    
  ├── models/         # Mongoose schemas
  ├── routes/         # API endpoints  # Business logic (Cart, Products, Orders)
  ├── middleware/     # Auth & error handling
  └── server.js       # Entry point
/frontend
  ├── src/
      ├── components/ # Reusable UI components
      ├── pages/      # Main views (Home, Cart, Product, Checkout)
      ├── context/    # Global state (Cart, Auth)
      ├── hooks/      # Custom hooks
      └── App.js      # Root component
```

---

## 🛠️ Tech Stack
- **Frontend:** React, Context API, Tailwind CSS  
- **Backend:** Node.js, Express, MongoDB, Firebase Auth  
- **Authentication:** Firebase + JWT  
- **Deployment:** Vercel (Frontend), Render (Backend)  

---

## 📈 Setup Instructions
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/SWETHA7898/pet

```

### 2️⃣ Backend Setup
```sh
cd backend
npm install
```

```
Start the backend:
```sh
npm run dev
```

### 3️⃣ Frontend Setup
```sh
cd frontend
npm install
```


Start the frontend:
```sh
npm start
```

---
