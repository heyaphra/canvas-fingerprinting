function init_firebase() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyB8hvpMxn3kjoIwYpvPX_K8ephibW0X9qA",
        authDomain: "cybersec-fingerprinting.firebaseapp.com",
        databaseURL: "https://cybersec-fingerprinting.firebaseio.com",
        projectId: "cybersec-fingerprinting",
        storageBucket: "cybersec-fingerprinting.appspot.com",
        messagingSenderId: "13001810192",
        appId: "1:13001810192:web:02d1b6650a0d2235d98595",
    };
    try {
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        console.log("Successfully initialized Firebase.")
    } catch (e) {
        console.log(e)
    }

}