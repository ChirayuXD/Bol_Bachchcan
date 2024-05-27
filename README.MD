```type:Generated,lang:Markdown,path:,lines:0-0
# SuperChat Application

This project is a React-based chat application named SuperChat, which integrates Firebase for authentication, real-time database, and storage services. 

## Features

- User Authentication using Firebase Auth.
- Real-time chat messages using Firebase Firestore.
- Image upload functionality with Firebase Storage.
- Responsive design for various screen sizes.

## Getting Started

### Prerequisites

Before running this project, you need to have Node.js and npm installed on your system. 

### Installation

1. Clone the repository to your local machine:
```
git clone https://your-repository-link
```

2. Navigate to the project directory:
```
cd superchat
```

3. Install the necessary dependencies:
```
npm install
```

4. Setup Firebase:
   - Create a new Firebase project in the Firebase Console.
   - Enable Authentication, Firestore Database, and Storage in your Firebase project.
   - Add your Firebase project configuration to the .env.local file in the root of your project directory. 

Example `.env.local`:
```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

5. Start the development server:
```
npm start
```

The application will open in your default browser at `http://localhost:3000`.


## Technologies Used

- React
- Firebase
  - Auth
  - Firestore
  - Storage
- react-firebase-hooks
- CSS
