# ParkSmart - MERN Parking Management System Using GraphQL



## Features
- User registration with OTP verification and email-based login.
- Parking slot booking for car or bike with date and time selection.
- Real-time display of available and reserved slots.
- Automatic QR code generation for confirmed bookings.
- QR code scanning with a phone camera to verify booking details.
- Booking dashboard with analytics and slot usage tracking.
- Help page with step-by-step instructions for users.

## Technology Used
- Frontend: React 19, Vite, React Router DOM.
- Backend: Node.js, Express, Apollo Server, GraphQL.
- Database: MongoDB with Mongoose.
- Authentication: JWT and OTP-based user verification.
- UI and utilities: `qrcode.react`, `html5-qrcode`, `react-toastify`, `recharts`.

## Real World Problem Solved
ParkSmart solves everyday parking challenges by:
- Reducing manual ticketing, paper slips, and gate delays.
- Preventing double booking of the same parking space.
- Enabling contactless entry and exit using QR code verification.
- Allowing drivers to reserve parking before arrival.
- Providing a digital record of active and past parking bookings.

## Folder Structure
### Backend
- `backend/`
  - `package.json`
  - `src/`
    - `app.js` - Express application setup.
    - `server.js` - Apollo Server startup and GraphQL middleware.
    - `config/`
      - `db.js` - MongoDB connection helper.
      - `mail.js` - Email configuration for OTP delivery.
    - `graphql/`
      - `typeDefs.js` - GraphQL schema definitions.
      - `resolvers.js` - GraphQL query and mutation logic.
    - `middleware/`
      - `authMiddleware.js` - Authentication checks for requests.
    - `models/`
      - `Booking.js` - Booking data model.
      - `ParkingSlot.js` - Parking slot model.
      - `User.js` - User model.
    - `seed/`
      - `seedData.js` - Initial data seeding.
    - `utils/`
      - `generateOTP.js` - OTP code generator.
      - `sendOTP.js` - OTP email sender.

### Frontend
- `frontend/`
  - `package.json`
  - `vite.config.js`
  - `src/`
    - `App.jsx` - Main application component.
    - `main.jsx` - Frontend entry point.
    - `apolloClient.js` - Apollo Client configuration.
    - `App.css` / `index.css` - Global styles.
    - `assets/` - Static assets and icons.
    - `components/`
      - `QRCodeGenerator.jsx` - QR code generation component.
    - `graphql/`
      - `queries.js` - GraphQL queries for frontend.
    - `pages/`
      - `Booking.jsx`
      - `Dashboard.jsx`
      - `Help.jsx`
      - `Login.jsx`
      - `MyBookingId.jsx`
      - `Register.jsx`
      - `ScanBooking.jsx`
      - `VerifyOTP.jsx`
    - `styles/`
      - `auth.css`
      - `booking.css`
      - `dashboard.css`

## What This Project Does
ParkSmart provides a complete parking management workflow:
- Users register and verify their identity with an OTP.
- Drivers choose a vehicle type and select a parking slot.
- The backend saves booking details and prevents slot conflicts.
- A QR ticket is generated for each confirmed reservation.
- Users scan the QR code at the parking gate to confirm entry or exit.
- The dashboard shows the booking history, active reservations, and slot analytics.

## Analysis
This system is built for operators and users who need a fast, secure, and contactless parking solution.
- For operators: it simplifies slot assignment, reduces manual checks, and helps monitor occupancy.
- For users: it eliminates waiting in line, reduces booking errors, and makes parking predictable.
- For administrators: it collects booking data that can be used to improve parking efficiency.

## How to Run
1. Clone the repository.
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```
4. Create a `.env` file in `backend/` with the required environment variables.
5. Start the backend server:
   ```bash
   cd ../backend
   npm run dev
   ```
6. Start the frontend app:
   ```bash
   cd ../frontend
   npm run dev
   ```

> Note: Replace the image path or add a screenshot file if you want a real project preview in the GitHub README.
