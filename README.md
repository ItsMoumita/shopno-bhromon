# ✈️ ShopnoBhromon - A Modern Travel Booking Platform

A full-stack travel booking application built with the MERN stack (MongoDB, Express.js, React, Node.js) and integrated with Firebase for authentication and Stripe for secure payments. This platform allows users to browse and book tour packages and resorts, while providing a comprehensive admin dashboard for managing users, content, and bookings.

---

## ✨ Tech Badges

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=stripe&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

---

## 🔗 Live Link

**Live Site:** [Your Live Deployed URL Here](https://your-live-site-url.com)

---

## 👤 Admin Access

- **Email:** admin@gmail.com
- - **Password:** admin123

---

## 🚀 Detailed Features

### For All Users
*   **Browse Packages & Resorts**: A modern, responsive interface to explore tour packages and resorts with detailed information.
*   **Advanced Filtering & Sorting**: Users can filter by search, category, price range, and duration, and sort by price, rating, or date.
*   **Detailed Pages**: Each package and resort has a dedicated details page with a photo gallery, itinerary/amenities, pricing, and availability.
*   **Secure Authentication**: User registration and login using Firebase (Email/Password & Google Sign-In).
*   **Secure Payments**: Integrated with Stripe for secure and seamless booking payments.
*   **User Bookings Page**: A dedicated page for users to view their past and upcoming bookings.
*   **Responsive Design**: Fully responsive UI/UX for a great experience on any device.

### For Admins
*   **Admin Dashboard**: A comprehensive dashboard with KPI cards showing key metrics (bookings, users, etc.).
*   **User Management**: Admins can view all users, see their roles, and promote users to admin.
*   **Package Management**: Full CRUD functionality to add, view, update, and delete tour packages.
*   **Resort Management**: Full CRUD functionality to add, view, update, and delete resorts.
*   **Booking Management**: Admins can view all user bookings, check payment status, and manage booking details.
*   **Role-Based Access Control**: Dashboard and management features are restricted to admin users only.

---

## 🛠 Tech Stacks

| Category          | Technology                                                                                                |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| **Frontend**      | React, React Router, Tailwind CSS, Framer Motion (for animations), AOS (Animate On Scroll)                  |
| **Backend**       | Node.js, Express.js                                                                                       |
| **Database**      | MongoDB                                                                                                   |
| **Authentication**| Firebase Authentication                                                                                   |
| **Payments**      | Stripe                                                                                                    |
| **UI Components** | Recharts (for charts), SweetAlert2 (for modals), React Icons, Lucide React, Skeleton Loader, Lottie        |
| **HTTP Client**   | Axios                                                                                                     |

---



## 🔌 API Endpoints

### User & Authentication
-   `POST /users` - Create a new user in the database after registration.
-   `GET /users` - Get a list of all users (Admin only).
-   `GET /users/:email` - Get a single user by email.
-   `PUT /users/:email/role` - Update a user's role (Admin only).

### Packages
-   `POST /packages` - Add a new package (Admin only).
-   `GET /packages` - Get all packages (with optional `limit` for carousel).
-   `GET /packages/:id` - Get a single package by ID.
-   `PUT /packages/:id` - Update a package (Admin only).
-   `DELETE /packages/:id` - Delete a package (Admin only).

### Resorts
-   `POST /posts` - Add a new resort (Admin only).
-   `GET /resorts` - Get all resorts (with optional `limit` for carousel).
-   `GET /resorts/:id` - Get a single resort by ID.
-   `PUT /resorts/:id` - Update a resort (Admin only).
-   `DELETE /resorts/:id` - Delete a resort (Admin only).

### Bookings & Payments
-   `POST /create-payment-intent` - Create a Stripe payment intent.
-   `POST /bookings/confirm` - Confirm a booking after successful payment.
-   `GET /bookings/user` - Get all bookings for the logged-in user.
-   `GET /bookings` - Get all bookings (Admin only).
-   `PUT /bookings/:id/status` - Update booking status (Admin only).
-   `DELETE /bookings/:id` - Delete a booking (Admin or Owner).

### Admin Dashboard
-   `GET /admin/overview` - Get KPI data for the admin dashboard.
