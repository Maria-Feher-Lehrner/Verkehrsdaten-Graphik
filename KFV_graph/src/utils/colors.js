export function lightenColor(color, percent) {
  const rgba = color.match(/\d+/g);
  const r = Math.min(255, parseInt(rgba[0]) + (percent / 100) * 255);
  const g = Math.min(255, parseInt(rgba[1]) + (percent / 100) * 255);
  const b = Math.min(255, parseInt(rgba[2]) + (percent / 100) * 255);
  return `rgba(${r}, ${g}, ${b}, ${rgba[3] || 1})`;
}

export const colorPalette = [
  "rgba(185, 16, 21, 1)", "rgba(31, 62, 157, 1)", "rgba(153, 192, 2, 1)", "rgba(108, 103, 188, 1)", "rgba(112, 179, 244, 1)", "rgba(215, 138, 51, 1)",
  "rgba(233, 70, 176, 1)", "rgba(31, 127, 38, 1)", "rgba(248, 221, 43, 1)", "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
  "rgba(199, 199, 199, 1)",
  "rgba(83, 102, 255, 1)",
  "rgba(40, 167, 69, 1)",
  "rgba(220, 53, 69, 1)",
  "rgba(255, 140, 0, 1)",
  "rgba(106, 90, 205, 1)",
  "rgba(0, 128, 128, 1)",
  "rgba(255, 20, 147, 1)",
  "rgba(128, 0, 0, 1)"
]