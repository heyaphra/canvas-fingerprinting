import React, { Component } from "react";
import { Canvas } from "responsive-react-canvas-hoc";
import crypto from "crypto";
import Firebase from "./Firebase";
import "./App.css";

class Fingerprintr extends Component {
  state = {};

  profile = {};

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
    this.setState({
      name: e.target.value,
    });
  };

  componentDidMount() {
    this.timer.start();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.tagUser();
    // Redirect to exhibit B
  };

  tagUser = () => {
    const {
      timer,
      state: { name },
      canvas,
    } = this;
    const fingerprint = this.createFingerprint(canvas);
    const elapsedTime = timer.end();
    const profile = {
      elapsedTime,
      name,
      hash: fingerprint,
    };
    Firebase.addProfile(profile);
  };

  renderGraphics = ({ canvas, ctx, width, height }) => {
    this.canvas = canvas;
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

  createFingerprint = (canvas) => {
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
            visibility: hidden ? "hidden" : "visible",
          }}
          onMount={this.renderGraphics}
          onResize={() => false}
          refreshRate={10}
          dimensions={{ width: "250px", height: "100px" }}
        />
        <br />
        <form>
          <small>What's your name?</small>{" "}
          <input type="text" onChange={this.handleInput} />
          <button onClick={this.handleSubmit}>Let's go!</button>
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
        <header>
          <h1>Exhibit A</h1>
        </header>
        <small style={{ marginBottom: "2vh" }}>
          Psst!{" "}
          <span
            style={{ textDecoration: "underline" }}
            onClick={() => this.setState({ hidden: !hidden })}
          >
            Click here
          </span>{" "}
          to toggle canvas visibility.
        </small>
        <Fingerprintr hidden={hidden} />
      </div>
    );
  }
}

export default App;
