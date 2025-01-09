document.addEventListener('DOMContentLoaded', () => {
    const arrayContainer = document.getElementById('arrayContainer');
    const inputArrayBtn = document.getElementById('inputArray');
    const startSortingBtn = document.getElementById('startSorting');
    const algorithmSelect = document.getElementById('algorithm');
    const timeTakenElement = document.getElementById('timeTaken');

    let array = [];

    // Render the array as square boxes with numbers
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

    // Swap two boxes
    function swapBoxes(box1, box2) {
        return new Promise(resolve => {
            const tempText = box1.textContent;
            box1.textContent = box2.textContent;
            box2.textContent = tempText;
            setTimeout(() => resolve(), 300);
        });
    }

    // Handle input array from user
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

    // Start Sorting and track time
    async function startSorting() {
        const algorithm = algorithmSelect.value;
        const startTime = performance.now(); // Track start time

        if (algorithm === 'bubble') {
            await bubbleSort();
        } else {
            alert(`${algorithm} sort is not implemented yet!`);
        }

        const endTime = performance.now(); // Track end time
        const timeTaken = (endTime - startTime).toFixed(2); // Calculate time taken
        timeTakenElement.textContent = `Time Taken: ${timeTaken} ms`; // Display time taken
    }

    // Event Listeners
    inputArrayBtn.addEventListener('click', handleInputArray);
    startSortingBtn.addEventListener('click', startSorting);

    // Initialize
    renderArray();
});
