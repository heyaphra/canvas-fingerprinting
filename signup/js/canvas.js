function create_canvas() {
    const canvas = document.getElementById("spy-canvas");
    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;

    // Paint a solid white background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);

    // Create a gradient fill
    const gradient = ctx.createLinearGradient(
        width / 2,
        height / 2,
        width,
        0
    );
    gradient.addColorStop("0", " magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    ctx.fillStyle = gradient;

    // Paint some text
    ctx.font = "24px Verdana";
    ctx.textAlign = "center";
    ctx.fillText("Subscribe Now!", width / 2, height / 1.5);

    return canvas;
}
