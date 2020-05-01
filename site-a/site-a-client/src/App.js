import React, { Component } from "react";
import { Canvas } from "responsive-react-canvas-hoc";
import crypto from "crypto";
import "./App.css";

class FingerprintCanvas extends Component {
  userBehavior = {};

  timer = {
    start: () => {
      this.startTime = performance.now();
    },
    end: () => {
      const endTime = performance.now();
      const timeDiff = (endTime - this.startTime) / 1000;
      const seconds = Math.round(timeDiff);
      this.elapsedTime = `${seconds} seconds`;
      return this.elapsedTime;
    },
  };

  handleInput = (e) => {
    console.log(e.target.value);
  };

  componentDidMount() {
    const { timer } = this;
    // window.addEventListener("beforeunload", (event) => {
    //   this.userBehavior.elapsedTime = timer.end();
    //   localStorage.setItem(
    //     "canvasFingerprint",
    //     JSON.stringify(this.userBehavior)
    //   );
    // });
  }

  tagUser = (stage) => {
    const fingerprint = this.createFingerprint(stage);
    if (localStorage.getItem("canvasFingerprint")) {
      console.log(localStorage.getItem("canvasFingerprint"));
      console.log(fingerprint);
      console.log(fingerprint === localStorage.getItem("canvasFingerprint"));
    } else {
      localStorage.setItem("canvasFingerprint", fingerprint);
    }
  };

  renderGraphics = ({ canvas, ctx, width, height }) => {
    // White background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);

    // Create a gradient fill
    const gradient = ctx.createLinearGradient(
      width / 2,
      height / 2,
      canvas.width,
      0
    );
    gradient.addColorStop("0", " magenta");
    gradient.addColorStop("0.5", "blue");
    gradient.addColorStop("1.0", "red");
    ctx.fillStyle = gradient;

    // Render text to the canvas
    ctx.font = "72px Verdana";
    ctx.textAlign = "center";
    ctx.fillText("Big smile!", width / 2, height / 1.5);
  };

  createFingerprint = ({ canvas }) => {
    const imageData = canvas.toDataURL();
    return crypto.createHash("sha256").update(imageData).digest("hex");
  };

  render() {
    const { hidden } = this.props;
    return (
      <>
        <Canvas
          style={{
            border: "1px solid #ccc",
            display: hidden ? "none" : "inline-block",
          }}
          onMount={this.renderGraphics}
          onResize={() => false}
          refreshRate={10}
          dimensions={{ width: "250px", height: "100px" }}
        />
        <br />
        <form>
          <small>What's your name?</small>{" "}
          <input
            type="text"
            onFocus={this.timer.start}
            onChange={this.handleInput}
          />
          <button onClick={() => console.log("Going to Site B!")}>
            Let's go!
          </button>
        </form>
      </>
    );
  }
}

class App extends Component {
  state = {
    hidden: true,
  };
  render() {
    const { name, hidden } = this.state;
    return (
      <div className="App">
        <header><h1>Exhibit A</h1></header>
        <small style={{ marginBottom: "2vh" }}>
          Psst!{" "}
          <span
            style={{ textDecoration: "underline" }}
            onClick={() =>
              this.setState({ hidden: !hidden }, () => console.log(this.state))
            }
          >
            Click here
          </span>{" "}
          to toggle canvas visibility.
        </small>
        <FingerprintCanvas hidden={hidden} />
      </div>
    );
  }
}

export default App;
