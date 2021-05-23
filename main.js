const WIDTH = 600;
const HEIGHT = 600;
const ROWS = 16;
const COLUMNS = 16;
const SCREEN_COLOR = "rgb(216, 216, 216)";

function fillCell(cell) {
  cell.style.backgroundColor = "gray";
}

function createGrid(width, height, rows, cols) {
  const grid = document.querySelector("#grid");
  grid.style.width = `${width}px`;
  grid.style.height = `${height}px`;
  grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  let cellCount = rows * cols;
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    grid.appendChild(cell);
  }

  return grid;
}

function clearGrid(grid) {
  const cells = Array.from(grid.children);
  cells.forEach((cell) => {
    cell.style.backgroundColor = SCREEN_COLOR;
  });
}

let grid = createGrid(WIDTH, HEIGHT, ROWS, COLUMNS);

const cells = document.querySelectorAll(".cell");
cells.forEach((cell) =>
  cell.addEventListener("mouseenter", () => {
    fillCell(cell);
  })
);

const clearBtn = document.querySelector("#clear-btn");
clearBtn.addEventListener("click", () => {
  clearGrid(grid);
});
