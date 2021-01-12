import { Watch } from "./class/Watch";
import "./style.less";

const canvas = document.getElementById("canvas");
const width = window.innerWidth / 2;
const height = window.innerHeight / 1.5;
const radius = (height - 10) / 2;

new Watch(canvas, width, height, radius);
