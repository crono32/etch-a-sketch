const WIDTH = 600;
const HEIGHT = 600;
const ROWS = 16;
const COLUMNS = 16;
const SCREEN_COLOR = "rgb(216, 216, 216)";

function fillCell(cell, color = "#111111") {
  cell.style.backgroundColor = color;
}

function createCells(grid, rows, columns) {
  grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

  let cellCount = rows * columns;
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.onmouseenter = () => {
      fillCell(cell);
    };
    grid.appendChild(cell);
  }
}

function createGrid(width, height, rows, columns) {
  const grid = document.querySelector("#grid");
  grid.style.width = `${width}px`;
  grid.style.height = `${height}px`;
  createCells(grid, rows, columns);
}

function clearGrid() {
  const grid = document.querySelector("#grid");
  const cells = Array.from(grid.children);
  cells.forEach((cell) => {
    cell.style.backgroundColor = SCREEN_COLOR;
  });
}

function setSliderText(rows, columns) {
  let sliderText = document.querySelector("#size-slider-text");
  sliderText.textContent = `Grid size: ${rows}x${columns}`;
}

function resizeGrid(rows, columns) {
  const grid = document.querySelector("#grid");
  const children = Array.from(grid.children);
  children.forEach((child) => {
    child.remove();
  });

  createCells(grid, rows, columns);
}

window.addEventListener("DOMContentLoaded", () => {
  setSliderText(ROWS, COLUMNS);
});
createGrid(WIDTH, HEIGHT, ROWS, COLUMNS);

const clearBtn = document.querySelector("#clear-btn");
clearBtn.addEventListener("click", () => {
  clearGrid(grid);
});

const sizeSlider = document.querySelector("#size-slider");
sizeSlider.addEventListener("input", () => {
  let size = sizeSlider.value;
  setSliderText(size, size);
});
sizeSlider.addEventListener("mouseup", () => {
  clearGrid(grid);

  let newSize = sizeSlider.value;
  resizeGrid(newSize, newSize);
});

let colorPicker = document.querySelector("#color-picker");
colorPicker.addEventListener("change", () => {
  let color = colorPicker.value;
  console.log(color);
  let cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.onmouseenter = () => {
      fillCell(cell, color);
    };
  });
});
