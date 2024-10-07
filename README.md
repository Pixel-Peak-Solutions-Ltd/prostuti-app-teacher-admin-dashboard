# Prostuti Admin Teacher Dashboard

### 🛠️ Prerequisites

Make sure you have the following installed on your machine:

- Node.Js: [Download and install Node.js](https://nodejs.org/en)
- Git: [Download and install Git](https://git-scm.com/)

### 🍴 Clone the Repo

1. Open a terminal or command prompt on your machine.

2. Navigate to the directory where you want to clone the project.

3. Run the following command to clone the repository:

```
git clone https://github.com/Pixel-Peak-Solutions-Ltd/prostuti-app-teacher-admin-dashboard.git
```

### ⬇️ Install Dependencies

1. Navigate into the project directory:

```
cd prostuti-app-teacher-admin-dashboard
```

2. Install project dependencies using `npm`:

```
npm install
```

### 💎 Set Up Environment Variables

1. Create a `.env` file in the root of the project.
2. Check out the `.env.example` file and then copy everything into the `.env` file. Then set your own PORT, BCRYPT_SALT, JWT_ACCESS_SECRET, JWT_ACCESS_EXPIRES_IN , DATABASE_URL etc in `.env`

### 🦄 Start the Development Mode

Use the following command to start the app in the development mode:

```
npm run dev
```

It runs the server in development mode. Open [http://localhost:PORT](http://localhost:PORT) to view it in your browser.

### 🧱 Build the App for Production

Use the following command to build the app for production:

```
npm run build
```

It builds the app for production in the `dist` folder. It contains all javascript files that were converted from typescript files.

### 🎗️ Start the Production Mode

Use the following command to start the app in the production mode:

```
npm run preview
```

### ✨ Format and lint the code

Use the following command to format and lint the code:

- To lint the code:

```
npm run lint
```
