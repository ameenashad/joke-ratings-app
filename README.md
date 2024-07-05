# Joke Generator

This project is a Random Joke Generator built with ReactJS and Firebase. It fetches jokes from an API(https://v2.jokeapi.dev/joke/Programming), allows users to rate them, and stores the ratings in Firebase Firestore. Users can also view the most liked joke.

## Table of contents

- [Installation](#installation)
- [Setup Firebase](#setup-firebase)
- [Running the project](#running-the-project)
- [Features](#features)
- [Troubleshooting](#troubleshooting)

## Installation

1. **Clone the repository:**

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Setup firebase

1. **Create a Firebase project:**

   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Click on "Add project" and follow the setup steps.

2. **Add a web app to your project:**

   - In the Firebase Console, go to Project settings.
   - In the "Your apps" section, click on the web icon (</>).
   - Register your app and copy the Firebase config object.

3. **Enable Firestore and Authentication:**

   - Go to Firestore Database in the Firebase Console and click "Create database".
   - In the Authentication section, enable Email/Password sign-in method.

4. **Set up Firestore indexes:**

   - Go to the Firestore Database > Indexes tab.
   - Create a composite index with fields:
     - Field 1: `rating` (Descending)
     - Field 2: `timestamp` (Descending)

5. **Set Firestore security rules(Development):**

   - In the Firebase Console, navigate to Firestore Database > Rules.
   - Set rules to secure your database. Here is an example:
     ```plaintext
     rules_version = '2';
     service cloud.firestore {
       match /databases/{database}/documents {
         match /{document=**} {
           allow read, write: if true;
         }
       }
     }
     ```

6. **Set up environment variables:**

   - Create a `.env` file in the root of your project:
     ```env
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     REACT_APP_FIREBASE_APP_ID=your_app_id
     ```

7. **Update `.gitignore`:**
   - Add the `.env` file in `.gitignore` to keep it out of version control:
     ```plaintext
     # Environment variables
     .env
     ```

## Running the project

1. **Comment out React strict mode:**

   - In `src/index.js`, comment out or remove the `<React.StrictMode>` tags:
     ```javascript
     // ReactDOM.createRoot(document.getElementById('root')).render(
     //   <React.StrictMode>
     //     <App />
     //   </React.StrictMode>
     // );
     ReactDOM.createRoot(document.getElementById("root")).render(<App />);
     ```

2. **Start the development server:**
   ```bash
   npm start
   ```

## Features

- Fetch random jokes from the JokeAPI.
- Rate jokes and store ratings in Firebase.
- Display the most liked joke based on user ratings.

## Troubleshooting

- **Indexing errors**: If you encounter an error related to Firestore indexing, ensure that you have created the required composite indexes in the Firebase Console.
- **Firebase configuration**: Ensure that your Firebase configuration in `firebaseConfig.js` matches the config provided by Firebase Console.
- **React strict mode**: If you encounter issues related to React rendering components twice, comment out the Strict Mode as described above.
