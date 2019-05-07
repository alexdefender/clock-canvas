import React from "react";

const rootElement = document.getElementById("root");

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
let canvas = document.createElement("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;

rootElement.append(canvas);

let ctx = canvas.getContext("2d");

let cx = WIDTH / 2;
let cy = HEIGHT / 2;

function drawCircle(cx, cy, r, color) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
  ctx.restore();
}

function drawHourArrow() {
  ctx.lineTo(-9, -60);
  ctx.lineTo(0, -120);
  ctx.lineTo(9, -60);
  ctx.lineTo(0, 0);
  ctx.fillStyle = "white";
}

function drawMinuteArrow() {
  ctx.lineTo(-7, -80);
  ctx.lineTo(0, -180);
  ctx.lineTo(7, -80);
  ctx.lineTo(0, 0);
  ctx.fillStyle = "white";
}

function drawSecondArrow() {
  ctx.lineTo(-2, -80);
  ctx.lineTo(0, -180);
  ctx.lineTo(2, -80);
  ctx.lineTo(0, 0);
  ctx.fillStyle = "#c8c8c8";
}

function drawArrow(h, type) {
  ctx.save();
  ctx.beginPath();
  ctx.translate(cx, cy);
  ctx.rotate(deg2rad(h));
  if (type === "hour") drawHourArrow();
  if (type === "minute") drawMinuteArrow();
  if (type === "second") drawSecondArrow();

  ctx.fill();
  ctx.closePath();
  ctx.restore();
}

function drawHoursMark() {
  let gph = 360 / 12;
  for (let i = 0; i < 12; i++) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(deg2rad(i * gph));
    ctx.fillStyle = "yellow";
    ctx.fillRect(-3, -190, 6, 30);
    ctx.restore();
  }
}

function drawMinuteMark() {
  let gph = 360 / 60;
  for (let i = 0; i < 60; i++) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(deg2rad(i * gph));
    ctx.fillStyle = "yellow";
    ctx.fillRect(-1, -190, 2, 16);
    ctx.restore();
  }
}

function drawText(x, y, text, style, color) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.font = style;
  ctx.fillStyle = color;
  let { width } = ctx.measureText(text);
  ctx.fillText(text, x - width / 2, y);
  ctx.restore();
}

function tick() {
  drawCircle(cx, cy, 200, "green");
  drawCircle(cx, cy, 10, "yellow");
  drawHoursMark();
  drawMinuteMark();

  let d = new Date();
  let h = d.getHours();
  let m = d.getMinutes();
  let s = d.getSeconds();

  let hs = h < 10 ? `0${h}` : h;
  let ms = m < 10 ? `0${m}` : m;
  let ss = s < 10 ? `0${s}` : s;

  drawText(0, 80, `${hs}:${ms}:${ss}`, "40px sans-serif", "yellow");

  drawArrow(hours2deg(h), "hour");
  drawArrow(minute2deg(m), "minute");
  drawArrow(minute2deg(s), "second");
}

setInterval(() => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  tick();
}, 1000);

function minute2deg(t) {
  return t * 6;
}

function hours2deg(t) {
  return t < 12 ? t * 30 : (t - 12) * 30;
}

function deg2rad(deg) {
  return (deg * Math.PI) / 180;
}
