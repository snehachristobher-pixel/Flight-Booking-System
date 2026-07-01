# Flight Booking and Reservation System

## Project Overview

A full-stack MERN Flight Booking and Reservation System that allows users to search flights, book tickets, manage reservations, download tickets, and receive booking confirmation emails.
Email confirmation implemented using Nodemailer + Gmail SMTP.

Works successfully in local environment.
Render free-tier may restrict SMTP connections, which can prevent email delivery in deployed mode.

Flight search uses internal airline database (MongoDB).
Real-time status updates use AviationStack API.

## Tech Stack

- MongoDB Atlas
- Express.js
- React.js
- Node.js
- Tailwind CSS
- JWT Authentication
- Nodemailer
- Render
- Netlify

## Features

### User Authentication

- User Registration
- User Login
- Protected Routes
- JWT Authentication

### Flight Search

- Search flights by source and destination
- View flight details
- Seat availability tracking

### Booking System

- Passenger details form
- Seat preference selection
- Booking review page
- Payment simulation

### Booking Management

- View bookings
- Cancel bookings
- Booking history

### Ticket Generation

- Download PDF ticket
- Print ticket

### Notifications

- Email booking confirmation

## Demo Credentials

Email:
[test@example.com](mailto:test@example.com)

Password:
password123

(Or register a new account)

## 🔑 Evaluator Access

To test the Admin Dashboard and admin functionalities, use the following credentials:

### Admin Login

Email: admin@gmail.com

Password: Admin123

### User Login

Users can register a new account and access all booking features.

> Admin account can be used to test Dashboard Analytics, Booking Statistics, Revenue Tracking, and Admin Features.

## Frontend Deployment

https://flightbookingsystem-skyjourney.netlify.app

## Backend Deployment

https://flight-booking-system-rcgo.onrender.com

## GitHub Repository

https://github.com/snehachristobher-pixel/Flight-Booking-System

## Installation

### Frontend

cd client
npm install
npm run dev

### Backend

cd server
npm install
npm start

## Environment Variables

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=secretkey

## Author

Sneha Christobher
