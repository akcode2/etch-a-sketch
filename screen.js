mode = 'default';
let ctr = 0;


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

// Add behavior to size-changing buttons
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
            cell.style.backgroundColor = 'rgb(189, 195, 199)';
            grid.appendChild(cell);
        }
    }
    addEventListeners();
    // Prevent the screen's own event listener from triggering
    document.querySelector('.screen').classList.remove('inactive');
    return 0;
}

function addEventListeners() {
    cellList = document.querySelectorAll('.grid-container > div');
    cellList.forEach(cell => {
        cell.addEventListener('mouseover', (e) => {
            if (mode === 'default') {
                cell.style.backgroundColor = 'hsl(0, 0%, 34%)';
            }
            else if (mode === 'shading') {
                const originalColorRGB = cell.style.getPropertyValue('background-color');
                // Parse the RGB values from the color string
                // This regex result would resemble [ "rgb(100, 150, 200)", "100", "150", "200" ]
                const rgbRegex = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i;

                // Use destructuring syntax to unpack the resulting array into variables
                const [, red, green, blue] = originalColorRGB.match(rgbRegex);

                // Darken the color by multiplying the RGB values by a factor
                const darkenAmount = 0.2; 
                const newRed = Math.round(red * (1 - darkenAmount));
                const newGreen = Math.round(green * (1 - darkenAmount));
                const newBlue = Math.round(blue * (1 - darkenAmount));

                // Construct a new RGB string using the modified RGB values
                const newColorRGB = `rgb(${newRed}, ${newGreen}, ${newBlue})`;
                cell.style.backgroundColor = newColorRGB;
            }
            else if (mode === 'rainbow') {
                const newRainbowColor = rainbowColor();
                cell.style.backgroundColor = newRainbowColor;
            }
        })
    })
}

function rainbowColor() {
    const colors = ['#F70C00', '#F54900', '#F26900', '#F28100', '#E89300', '#DE9F00', '#D1B500',
    '#D4DB00', '#C3E600', '#AAF200', '#00F75F', '#00F59B', '#00F2BA', '#00F2D2',
    '#00E8E0', '#00D3DE', '#00A7D1', '#00D3DE', '#0077E6', '#0059F2', '#2D00F7',
    '#6A00F4', '#8900F2', '#A100F2', '#B100E8', '#BC00DD', '#D100D1', '#DBOOB6',
    '#E500A4', '#F20089']

    let newColor;
    if (ctr < 30) {
        newColor = colors[ctr]
        ctr++;
    }
    else {
        ctr = 0;
        newColor = colors[ctr];
    }

    return newColor;
}

document.querySelectorAll('.mode > button').forEach(button => {
    button.addEventListener('click', () => {
        mode = button.value;
    });
})