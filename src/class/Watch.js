import { digitsAngles } from "../const";
import { getRadians } from "../utils";

export class Watch {
  constructor(canvas, width, height, radius) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.radius = radius;

    this.init = this.init.bind(this);
    this.drawWatch = this.drawWatch.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.drawArrows = this.drawArrows.bind(this);

    this.init();
  }

  init() {
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.hoursArrowLength = this.radius * 0.4;
    this.minutesArrowLength = this.radius * 0.6;
    this.secondsArrowLength = this.radius * 0.75;
    this.drawWatch();
    requestAnimationFrame(this.drawArrows);
  }

  drawWatch() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 5;
    this.ctx.arc(
      this.width / 2,
      this.height / 2,
      this.radius,
      0,
      getRadians(360)
    );
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.arc(this.width / 2, this.height / 2, 10, 0, getRadians(360));
    this.ctx.fill();

    // Draw digits
    this.ctx.font = "48px serif";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    Object.entries(digitsAngles).forEach(([digit, angle]) => {
      this.ctx.fillText(
        digit,
        this.width / 2 + Math.cos(getRadians(angle)) * this.radius * 0.89,
        this.height / 2 + Math.sin(getRadians(angle)) * this.radius * 0.89
      );
    });

    // Draw segmentation
    for (let i = 0; i < 60; i++) {
      const rad = getRadians(i * 6);

      this.ctx.beginPath();
      if (i % 5) {
        this.ctx.moveTo(
          this.width / 2 + Math.cos(rad) * (this.radius - 10),
          this.height / 2 + Math.sin(rad) * (this.radius - 10)
        );
      } else {
        this.ctx.moveTo(
          this.width / 2 + Math.cos(rad) * (this.radius - 15),
          this.height / 2 + Math.sin(rad) * (this.radius - 15)
        );
      }
      this.ctx.lineTo(
        this.width / 2 + Math.cos(rad) * this.radius,
        this.height / 2 + Math.sin(rad) * this.radius
      );
      this.ctx.closePath();
      this.ctx.lineWidth = 3;
      this.ctx.stroke();
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawArrows() {
    this.clearCanvas();
    this.drawWatch();

    const now = new Date();
    const millisecondsFromTheStartOfTheDay =
      now - new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Find float time values for smooth movement of the arrows
    const hours = millisecondsFromTheStartOfTheDay / 3600000;
    const minutes =
      (millisecondsFromTheStartOfTheDay - Math.floor(hours) * 3600000) / 60000;
    const seconds =
      (millisecondsFromTheStartOfTheDay -
        Math.floor(hours) * 3600000 -
        Math.floor(minutes) * 60000) /
      1000;

    const hoursRad = getRadians(hours * 60 - 90),
      minutesRad = getRadians(minutes * 6 - 90),
      secondsRad = getRadians(seconds * 6 - 90);

    // Draw hours arrow
    this.ctx.beginPath();
    this.ctx.moveTo(this.width / 2, this.height / 2);
    this.ctx.lineTo(
      this.width / 2 + Math.cos(hoursRad) * this.hoursArrowLength,
      this.height / 2 + Math.sin(hoursRad) * this.hoursArrowLength
    );
    this.ctx.closePath();
    this.ctx.lineWidth = 6;
    this.ctx.stroke();

    // Draw minutes arrow
    this.ctx.beginPath();
    this.ctx.moveTo(this.width / 2, this.height / 2);
    this.ctx.lineTo(
      this.width / 2 + Math.cos(minutesRad) * this.minutesArrowLength,
      this.height / 2 + Math.sin(minutesRad) * this.minutesArrowLength
    );
    this.ctx.closePath();
    this.ctx.lineWidth = 4;
    this.ctx.stroke();

    // Draw second arrow
    this.ctx.beginPath();
    this.ctx.moveTo(this.width / 2, this.height / 2);
    this.ctx.lineTo(
      this.width / 2 + Math.cos(secondsRad) * this.secondsArrowLength,
      this.height / 2 + Math.sin(secondsRad) * this.secondsArrowLength
    );
    this.ctx.closePath();
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    requestAnimationFrame(this.drawArrows);
  }
}
