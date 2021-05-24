const WIDTH = 600;
const HEIGHT = 600;
const ROWS = 16;
const COLUMNS = 16;
const SCREEN_COLOR = "rgb(216, 216, 216)";

function fillCell(cell, color = "#111111") {
  cell.style.backgroundColor = color;
}

function fillCellRandom(cell) {
  cell.style.backgroundColor = getRandomColorString();
}

function getRandomNumber(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

function getRandomColorString() {
  let r = getRandomNumber(0, 256);
  let g = getRandomNumber(0, 256);
  let b = getRandomNumber(0, 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// callback must always take cell as first parameter
function changeCellCallback(callback, arg) {
  let cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.onmouseenter = () => {
      callback(cell, arg);
    };
  });
}

function createCells(grid, rows, columns) {
  grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

  let cellCount = rows * columns;
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    let callback;
    if (isPsychedelicActive()) {
      callback = () => {
        fillCellRandom(cell);
      };
    } else {
      callback = () => {
        let color = getCurrentColor();
        fillCell(cell, color);
      };
    }
    cell.onmouseenter = callback;
    grid.appendChild(cell);
  }
}

function createGrid(width, height, rows, columns) {
  const grid = document.querySelector("#grid");
  grid.style.width = `${width}px`;
  grid.style.height = `${height}px`;
  createCells(grid, rows, columns);
  return grid;
}

function clearGrid() {
  const grid = document.querySelector("#grid");
  const cells = Array.from(grid.children);
  cells.forEach((cell) => {
    cell.addEventListener("animationend", () => {
      cell.classList.remove("clear-anim");
      cell.style.backgroundColor = SCREEN_COLOR;
    });
    cell.classList.add("clear-anim");
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

// Returns current color as a hex string
function getCurrentColor() {
  let colorPicker = document.querySelector("#color-picker");
  return colorPicker.value;
}

function isPsychedelicActive() {
  const psychedelic = document.querySelector("#psychedelic");
  return psychedelic.checked;
}

function disablePsychedelic() {
  const psychedelic = document.querySelector("#psychedelic");
  psychedelic.checked = false;
}

window.addEventListener("DOMContentLoaded", () => {
  setSliderText(ROWS, COLUMNS);
});
const grid = createGrid(WIDTH, HEIGHT, ROWS, COLUMNS);

window.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "backspace") {
    clearGrid(grid);
  }
});

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

const colorPicker = document.querySelector("#color-picker");
colorPicker.addEventListener("change", () => {
  let color = colorPicker.value;
  changeCellCallback(fillCell, color);
  disablePsychedelic();
});

const psychedelic = document.querySelector("#psychedelic");
psychedelic.addEventListener("change", () => {
  if (psychedelic.checked) {
    changeCellCallback(fillCellRandom);
  } else {
    let color = getCurrentColor();
    changeCellCallback(fillCell, color);
  }
});
