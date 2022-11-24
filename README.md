# Todo App v4  - With Firebase Integration
This s simple todo app written in NextJs React with TypeScript, with Zustand as the state manager.

# How to use
## Configuring Firebase
Before you can run this project, you will need to:
* Create your own firebase project by following the link here: https://console.firebase.google.com/
    * You can turn off analytics as you wont really need them for this project

### Enabling Authentication
* Once the project is created, click on "Authnetication" card -> then the "Get Started" button
* Choose Email and Password as your authentication provider as below
* Choose enable Email and Password (The first option on the list)

### Adding an APP to the project
* Now add an App to you project by going to project settings
* Choose Web as your app type, give it a name and register it
    * You do not need to setup fire base hosting for this demo app
* On registering you will be provided with firebase config which loos like the below:

```
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_VALUE_HERE",
  authDomain: "YOUR_VALUE_HERE",
  projectId: "YOUR_VALUE_HERE",
  storageBucket: "YOUR_VALUE_HERE",
  messagingSenderId: "YOUR_VALUE_HERE",
  appId: "YOUR_VALUE_HERE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
```

### Configuring Firestore
This app makes use of firestore - firebase's document based database. To activate firestore in your project,
follow the below steps:

* From the project overview page, click on the "Cloud Firestore" card
* Click on the "Create Database" card
* Choose "Start in production mode"
* Choose a location for your database
* A cloud firestore instance will be provisioned. On the firestore console, navigate to the rules page
* Replace the existing rule with the following:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read,update,delete: if request.auth != null && resource.data.uid == request.auth.uid;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.uid;
    }
  }
}
```
* Publish the rules
## Adding Firebase config to the Source Code
* Open the project in your IDE of choice and navigate to: /services/firebase.ts
* Replace the firebase config object with the config object you obtained in the previous step
* In your teminal, navigate to the project directory and run `npm install`

## Running the App
* After the dependencies are installed, you can now run the following commands in the terminal:
 ```
 npm run build
 npm run start
 ```
* This will start the server on a port typically port 3000. The specific port used will be displayed in the terminal
* You can now open a web browser of your choice and navigate to: `localhost:{PORT}/`

NB: You will need to sign up users before they can sign in.