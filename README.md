# 🍔 Tahas Bite — Fast Food Ordering Application

A modern, responsive fast-food ordering web application built with **React, Vite, Tailwind CSS, Node.js, Express, and MongoDB**. Tahas Bite provides customers with a convenient food-ordering experience and administrators with tools to manage products, orders, and customer messages.

## ✨ Features

### 🛒 Customer Features
- Browse the food menu and view product details.
- Add products to the shopping cart.
- Update item quantities and remove products.
- Complete the checkout process.
- **Free delivery** on orders.
- **Cash on Delivery (COD)** payment option.
- Submit orders and view order information.
- Responsive design for desktop, tablet, and mobile.
- Light and dark theme support.

### 🔐 Admin Dashboard
- Secure admin login.
- Dashboard with order, product, revenue, and contact statistics.
- Manage food products.
- View and manage customer orders.
- Update order statuses.
- View order and customer details.
- Manage customer messages and contact requests.
- Search, filter, and refresh admin data.

### ⚙️ Technical Features
- React with Vite for frontend development.
- Tailwind CSS for styling.
- React Router for navigation.
- Axios for API requests.
- Framer Motion for animations.
- Node.js and Express for the backend API.
- MongoDB and Mongoose for database management.
- Environment variables for configuration.
- Admin authentication and protected routes.

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend user interface |
| Vite | Development server and build tool |
| Tailwind CSS | Responsive styling |
| React Router | Client-side routing |
| Axios | HTTP requests |
| Framer Motion | Animations |
| Node.js | Backend runtime |
| Express.js | REST API |
| MongoDB | Database |
| Mongoose | MongoDB object modeling |
| Lucide React / React Icons | Icons |

## 📁 Project Structure

```text
tahas-bite/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── controllers/
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

*Note: Adjust the directory tree to match your actual project structure.*

## 🚀 Getting Started

Follow these steps to run Tahas Bite locally.

### 1. Prerequisites

Install the following:

- [Node.js](https://nodejs.org/) — preferably an active LTS version.
- npm, included with Node.js.
- [MongoDB Atlas](https://www.mongodb.com/atlas) or a local MongoDB installation.
- [Git](https://git-scm.com/).

### 2. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
cd YOUR-REPOSITORY
```

Replace the repository URL with your actual GitHub repository URL.

### 3. Configure the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
```

Use the environment variable names expected by your existing backend. If your project uses different names, update this example accordingly.

Start the backend:

```bash
npm run dev
```

If your `package.json` does not define a `dev` script, use the start command configured by your project, for example:

```bash
npm start
```

### 4. Configure the Frontend

Open a second terminal:

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Make sure this URL matches the API base URL used by your Axios configuration.

Start the frontend:

```bash
npm run dev
```

Open the local URL displayed by Vite, typically:

```text
http://localhost:5173
```

## 💳 Checkout and Payment

Tahas Bite is configured for the following checkout options:

| Feature | Configuration |
|---|---|
| Delivery fee | Free |
| Payment method | Cash on Delivery |
| Online payment gateway | Not required for COD |
| Order submission | Through the backend API |

The backend should calculate and validate order totals independently instead of trusting prices or totals submitted by the browser.

## 🔑 Admin Access

Open the admin login page using the route configured in your frontend, for example:

```text
http://localhost:5173/admin/login
```

Sign in using administrator credentials configured for your backend.

**Security recommendations:**
- Do not commit administrator passwords, JWT secrets, or database credentials.
- Keep `.env` files out of Git.
- Protect admin API endpoints with backend authentication and authorization.
- Use password hashing for stored administrator passwords.
- Use HTTPS in production.

## 📜 Available Scripts

Run commands from the appropriate `frontend` or `backend` directory.

### Frontend

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the production frontend |
| `npm run preview` | Preview the production build |

### Backend

| Command | Description |
|---|---|
| `npm run dev` | Start the development server, if configured |
| `npm start` | Start the server, if configured |

The available scripts depend on the commands defined in each directory's `package.json`.

## 🌍 Deployment

Potential deployment options include:

- **Frontend:** Vercel, Netlify, or another static hosting provider.
- **Backend:** Render, Railway, or another Node.js hosting provider.
- **Database:** MongoDB Atlas.

Before deploying:

1. Configure the production API URL.
2. Add the required environment variables to your hosting provider.
3. Allow the deployed backend's network access to MongoDB.
4. Configure CORS for the production frontend domain.
5. Test checkout, order creation, admin login, and order management.
6. Never expose backend secrets in frontend environment variables.

## 🛠️ Troubleshooting

### MongoDB Connection Error

Check your `MONGODB_URI`, database credentials, network access rules, and MongoDB Atlas IP access list.

### Frontend Cannot Connect to Backend

Verify that the backend is running, the frontend API URL is correct, and the backend CORS configuration permits the frontend origin.

### Products or Cart Items Are Missing

Refresh the menu and verify that the backend product IDs match the products submitted during checkout.

### Admin Login Does Not Work

Check your admin credentials, authentication configuration, token handling, and backend authorization middleware.

## 🔒 Environment Variables

Never push real `.env` files to GitHub. Add the following to `.gitignore`:

```gitignore
node_modules/
.env
.env.*
!.env.example
dist/
build/
coverage/
```

Keep safe example configuration files named `.env.example` in the repository so other developers know which variables to configure.

## 🤝 Contributing

Contributions, bug reports, and feature suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test your changes locally.
5. Open a pull request with a clear description.

## 📄 License

Choose a license before publishing the project for reuse. For example, you may use the MIT License by adding a `LICENSE` file containing the appropriate license text.

## 👨‍💻 Author

**Tahas Bite — Fast Food Ordering Application**

GitHub: [Your GitHub Profile](https://github.com/YOUR-USERNAME)

---

⭐ If you find this project useful, consider giving the repository a star!
