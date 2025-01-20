document.addEventListener('DOMContentLoaded', () => {
    const arrayContainer = document.getElementById('arrayContainer');
    const inputArrayBtn = document.getElementById('inputArray');
    const startSortingBtn = document.getElementById('startSorting');
    const algorithmSelect = document.getElementById('algorithm');
    const timeTakenElement = document.getElementById('timeTaken');

    let array = [];
    function renderArray() {
        arrayContainer.innerHTML = '';
        array.forEach(value => {
            const box = document.createElement('div');
            box.textContent = value;
            box.classList.add('box');
            arrayContainer.appendChild(box);
        });
    }

    // Perform Bubble Sort
    async function bubbleSort() {
        const boxes = document.querySelectorAll('.box');
        for (let i = 0; i < boxes.length - 1; i++) {
            for (let j = 0; j < boxes.length - i - 1; j++) {
                boxes[j].style.backgroundColor = 'red';
                boxes[j + 1].style.backgroundColor = 'red';

                if (parseInt(boxes[j].textContent) > parseInt(boxes[j + 1].textContent)) {
                    await swapBoxes(boxes[j], boxes[j + 1]);
                }

                boxes[j].style.backgroundColor = '#4caf50';
                boxes[j + 1].style.backgroundColor = '#4caf50';
            }
        }
    }

    // perform Selection Sort
    async function selectionSort() {
        const boxes = document.querySelectorAll('.box');
        for (let i = 0; i < boxes.length - 1; i++) {
            let min = i;
            boxes[min].style.backgroundColor = 'red';

            for (let j = i + 1; j < boxes.length; j++) {
                boxes[j].style.backgroundColor = 'red';

                if (parseInt(boxes[j].textContent) < parseInt(boxes[min].textContent)) {
                    
                    boxes[min].style.backgroundColor = ''; 
                    min = j;
                    boxes[min].style.backgroundColor = 'blue';
                }

                await delay(300);
                boxes[j].style.backgroundColor = '';
            }

            if (min !== i) {
                await swapBoxes(boxes[i], boxes[min]);
            }
            boxes[i].style.backgroundColor = '#4caf50';
        }
        boxes[boxes.length - 1].style.backgroundColor = '#4caf50';
    }

    // swap two boxes
    function swapBoxes(box1, box2) {
        return new Promise(resolve => {
            const tempText = box1.textContent;
            box1.textContent = box2.textContent;
            box2.textContent = tempText;
            setTimeout(() => resolve(), 300);
        });
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function handleInputArray() {
        const userInput = prompt('Enter the array elements separated by commas:');
        if (userInput) {
            array = userInput.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
            if (array.length > 0) {
                renderArray();
            } else {
                alert('Please enter a valid array of numbers.');
            }
        }
    }

    async function startSorting() {
        const algorithm = algorithmSelect.value;
        const startTime = performance.now();

        if (algorithm === 'bubble') {
            await bubbleSort();
        } else if (algorithm === 'selection') {
            await selectionSort();
        } else {
            alert(`${algorithm} sort is not implemented yet!`);
        }

        const endTime = performance.now();
        const timeTaken = (endTime - startTime).toFixed(2);
        timeTakenElement.textContent = `Time Taken: ${timeTaken} ms`;
    }

    inputArrayBtn.addEventListener('click', handleInputArray);
    startSortingBtn.addEventListener('click', startSorting);

    if (array.length > 0) {
        renderArray();
    }
});
