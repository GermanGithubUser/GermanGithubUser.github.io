/**
 * @returns Cell values as array 
 */
function getCellValues() {
    // selects all .sudoku-cell input elements
    let cells = document.querySelectorAll('.sudoku-cell input');
    let cellValues = [];

    for (let i = 0; i < cells.length; i++) {
        let cellValue = cells[i].value;
        // === fits better here
        if (cellValue === '') {
            cellValue = '0';
        }
        cellValues.push(cellValue);
    }

    return cellValues;
}

/**
 * Sets cell values in the grid
 */
function setCellValues(values) {
    // selects all .sudoku-cell input elements
    let cells = document.querySelectorAll('.sudoku-cell input');
    for (let i = 0; i < cells.length; i++) {
        let cell = cells[i];
        let value = values[i];
        // !== fits better here
        if (value !== '0') {
            cell.value = value;
        } else {
            cell.value = '';
        }
    }
}

/**
 * Converts string to text and displays it
 */
function convertGridToString() {
    let gridString = getCellValues().join(' ').trim();
    document.getElementById('result').textContent = gridString;
    // copyString()
}

/**
 * Converts string to text and displays it
 */
function convertGridToStringNoCheck() {
    let gridString = getCellValues().join(' ').trim();
    document.getElementById('result').textContent = gridString;
}

/**
 * Solves the sudoku (if there is a solution) and displays the result string
 */
function solveSudoku() {
    const gridString = getCellValues().join('');
    // need to replace because that's how sudoku.js implemented it
    const solution = sudoku.solve(gridString.replaceAll('0', '.'));
    checkSolvable();
    if(solution) {
        setCellValues(solution);
    }
    convertGridToString()
}

/**
 * Generates random sudoku according to wanted difficulty
 */
function generateSudoku(difficulty) {
    // need to replace because that's how sudoku.js implemented it
    let sudokuValues = sudoku.generate(difficulty).replaceAll('.', '0');
    setCellValues(sudokuValues);
    convertGridToStringNoCheck()
}

/**
 * Checks if the sudoku is solvable
 */
function checkSolvable() {
    let solution = sudoku.solve(getCellValues().join('').replaceAll('0', '.'));
    let button = document.getElementById('check-solvable-button');
    if (solution) {
        button.textContent = 'Solvable';
        button.style.backgroundColor = 'green';

        setTimeout(() => {
            button.style.backgroundColor = '';
            button.textContent = 'Check if Solvable';
        }, 3000);
    } else {
        button.textContent = 'Not Solvable';
        button.style.backgroundColor = 'red';

        setTimeout(() => {
            button.style.backgroundColor = '';
            button.textContent = 'Check if Solvable';
        }, 3000);
    }
}

/**
 * Copies string to cloiboard
 */
function copyString() {
    const text = document.getElementById('result').textContent;
    const copyText = document.getElementById('copy-text');
    if (text) {
        navigator.clipboard.writeText(text).then(() => {
            copyText.textContent = 'String was copied!';
            setTimeout(() => {
                copyText.textContent = 'Click to copy string';
            }, 3000);
        });
    }
}

// not necessary but maybe best practic
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('button[onclick="generateSudoku(\'easy\')"]').addEventListener('click', () => generateSudoku('easy'));
    document.querySelector('button[onclick="generateSudoku(\'medium\')"]').addEventListener('click', () => generateSudoku('medium'));
    document.querySelector('button[onclick="generateSudoku(\'hard\')"]').addEventListener('click', () => generateSudoku('hard'));
    document.querySelector('button[onclick="generateSudoku(\'very-hard\')"]').addEventListener('click', () => generateSudoku('very-hard'));
    document.querySelector('button[onclick="generateSudoku(\'insane\')"]').addEventListener('click', () => generateSudoku('insane'));
    document.querySelector('button[onclick="generateSudoku(\'inhuman\')"]').addEventListener('click', () => generateSudoku('inhuman'));
    document.querySelector('button[onclick="convertGridToString()"]').addEventListener('click', convertGridToString);
    document.querySelector('button[onclick="checkSolvable()"]').addEventListener('click', checkSolvable);
    document.getElementById('result').addEventListener('click', copyToClipboard);
});
