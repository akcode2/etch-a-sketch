let width = 22;
let height = 16;
let scale = 'small';

function calcCellSize(scale) {
    const baseWidth = 22;
    const baseHeight = 16;

    if (scale === 'large') {
        width = baseWidth * 5;
        height = baseHeight * 5;
    }
    else if (scale === 'medium') {
        width = baseWidth * 3;
        height = baseHeight * 3;
    }
    else if (scale === 'small') {
        width = baseWidth * 1;
        height = baseHeight * 1;
    }
}

const screen = document.querySelector('.screen')

// Check if screen has been "activated" and make cells if it's inactive
screen.addEventListener('click', () => {
    if (screen.classList.contains('inactive')) {
        createGridDivs();
        screen.classList.remove('inactive');
        return 0
    }
});



function createGridDivs() {
    const grid = document.querySelector('.grid-container');
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.addEventListener('mouseover', () => {
                cell.style.backgroundColor = '#575757';
            })
            grid.appendChild(cell);
        }
    }
    return 0;
}