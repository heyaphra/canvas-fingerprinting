function create_fingerprint() {
    const imageData = canvas.toDataURL();
    return CryptoJS.SHA256(imageData).toString(CryptoJS.enc.Hex);
}
