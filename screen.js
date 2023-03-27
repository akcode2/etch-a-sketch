// let width = getComputedStyle(document.documentElement).getPropertyValue('--columns');
// let height = getComputedStyle(document.documentElement).getPropertyValue('--rows');
// let scale = 'small';



function changeCellSize(scale) {

    // The HTML document
    let doc = document.documentElement;

    if (scale === 'large') {
        doc.style.setProperty('--rows', '64')
        doc.style.setProperty('--columns', '88')
    }
    else if (scale === 'medium') {
        doc.style.setProperty('--rows', '48')
        doc.style.setProperty('--columns', '66')
    }
    else if (scale === 'small') {
        doc.style.setProperty('--rows', '16')
        doc.style.setProperty('--columns', '22')
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

document.querySelectorAll('.size > button').forEach(button => {
    let scale = button.value;
    button.addEventListener('click', () => {
        changeCellSize(scale);
        createGridDivs();
    })
})

function createGridDivs() {
    const grid = document.querySelector('.grid-container');
    // Clear any existing divs
    grid.innerHTML = '';

    let width = getComputedStyle(document.documentElement).getPropertyValue('--columns');
    let height = getComputedStyle(document.documentElement).getPropertyValue('--rows');

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
    // Remove the "inactive" flag from the screen
    document.querySelector('.screen').classList.remove('inactive');
    return 0;
}