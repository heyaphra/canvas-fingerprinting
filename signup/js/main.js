const canvas = create_canvas();
const form = document.querySelector("#fingerprintr");

window.onload = function () {
    init_firebase();
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const [name, email] = [e.target[0].value, e.target[1].value];
    const uid = create_fingerprint(canvas);
    const profile = {
        name,
        email,
        uid
    }
    const db = firebase.firestore();
    db.collection("fingerprints").add(profile);
    form.innerHTML = "<center>Success! You are all set.</center>";
});

// console.log(create_fingerprint(canvas));