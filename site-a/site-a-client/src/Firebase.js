import * as firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfrrI8p0OP4mwl0syzg7Ub5hBRE3gg5GM",
  authDomain: "cybsersec-fingerprinting.firebaseapp.com",
  databaseURL: "https://cybsersec-fingerprinting.firebaseio.com",
  projectId: "cybsersec-fingerprinting",
  storageBucket: "cybsersec-fingerprinting.appspot.com",
  messagingSenderId: "692182605160",
  appId: "1:692182605160:web:b9c8e5d38e0ab433000add",
};

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.db = firebase.firestore();
  }

  addProfile = (profile) => {
    this.db.collection("fingerprints").add(profile);
  };

  getProfiles = () => {
    this.db.collection("fingerprints").onSnapshot((snapshot) => {
      const allFingerprints = snapshot.docs.map((doc) => doc.data);
      return allFingerprints;
    });
  };
}

export default new Firebase();
