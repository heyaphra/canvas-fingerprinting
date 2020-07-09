const canvas = create_canvas();

window.onload = async function () {
    init_firebase();
    const target_uid = create_fingerprint();
    const db = firebase.firestore();
    const profiles = await new Promise((resolve, reject) => {
        db.collection("fingerprints").onSnapshot((snapshot) => {
            const allFingerprints = snapshot.docs.map((doc) => doc.data());
            resolve(allFingerprints);
        })
    })
    const target_profile = await profiles.find(u => u.uid === target_uid);
    document.body.innerHTML = `Hi there, ${target_profile.name.split(" ")[0]}! You don't know us, but we know you! Expect some targeted ads to hit your inbox at ${target_profile.email}.`;
}

