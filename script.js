document.addEventListener('DOMContentLoaded', () => {
    const arrayContainer = document.getElementById('arrayContainer');
    const inputArrayBtn = document.getElementById('inputArray');
    const startSortingBtn = document.getElementById('startSorting');
    const algorithmSelect = document.getElementById('algorithm');
    const timeTakenElement = document.getElementById('timeTaken');
    const chartCanvas = document.getElementById('comparisonChart');
    document.getElementById('compareAll').addEventListener('click', compareAllSortingAlgorithms);


    let array = [];
    let timeData = {};

    // Render the array
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

    // Perform Selection Sort

    async function selectionSort() {
        const boxes = document.querySelectorAll('.box'); 

        for (let i = 0; i < boxes.length - 1; i++) {
            let min = i;
            boxes[i].style.backgroundColor = 'blue'; 

            for (let j = i + 1; j < boxes.length; j++) {
                boxes[i].style.backgroundColor = 'blue';
                boxes[j].style.backgroundColor = 'red';
                await delay(500); 

                if (parseInt(boxes[j].textContent) < parseInt(boxes[min].textContent)) {
                
                    boxes[min].style.backgroundColor = '';
                    minIndex = j;
                    boxes[min].style.backgroundColor = 'blue';
                }
                boxes[j].style.backgroundColor = '';
            }

       
            if (minIndex !== i) {
                await swapBoxes(boxes[i], boxes[min]);
            }
            boxes[i].style.backgroundColor = '#4caf50'; 
        }
        boxes[boxes.length - 1].style.backgroundColor = '#4caf50'; 
    }


    // Perform Quick Sort
    async function quickSort(low, high) {
        if (low < high) {
            const pivotIndex = await partition(low, high);
            await quickSort(low, pivotIndex - 1);
            await quickSort(pivotIndex + 1, high);
        }
    }

    async function partition(low, high) {
        const boxes = document.querySelectorAll('.box');
        const pivot = parseInt(boxes[high].textContent);
        boxes[high].style.backgroundColor = 'blue'; 
        let i = low - 1;

        for (let j = low; j < high; j++) {
            boxes[j].style.backgroundColor = 'red';

            if (parseInt(boxes[j].textContent) < pivot) {
                i++;
                await swapBoxes(boxes[i], boxes[j]);
            }

            await delay(300);
            boxes[j].style.backgroundColor = '';
        }

        await swapBoxes(boxes[i + 1], boxes[high]);
        boxes[high].style.backgroundColor = '';
        boxes[i + 1].style.backgroundColor = '#4caf50';

        return i + 1;
    }

    // perform Insertion Sort

    async function insertionSort() {
        const boxes = document.querySelectorAll('.box');
    
        for (let i = 1; i < boxes.length; i++) {
            const curBox = boxes[i];
            const curValue = parseInt(curBox.textContent);
            let j = i - 1;
            curBox.style.backgroundColor = 'red';
    
            while (j >= 0 && parseInt(boxes[j].textContent) > curValue) {
                boxes[j].style.backgroundColor = 'red';  
                boxes[j + 1].style.backgroundColor = ''; 
            
                await swapBoxes(boxes[j + 1], boxes[j]);

                boxes[j].style.backgroundColor = '#4caf50';
                j--;
            }
            boxes[j + 1].style.backgroundColor = '#4caf50'; 
        }
    }


    // Swap two boxes
    function swapBoxes(box1, box2) {
        return new Promise(resolve => {
            const tempText = box1.textContent;
            box1.textContent = box2.textContent;
            box2.textContent = tempText;
            setTimeout(() => resolve(), 400);
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

    // comparision chart

    let comparisonChart = new Chart(chartCanvas, {
        type: 'bar',
        data: {
            labels: [], 
            datasets: [
                {
                    label: 'Time Taken (ms)',
                    data: [], 
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });

    // compare all

    async function compareAllSortingAlgorithms() {
        if (array.length === 0) {
            alert('Please input an array first!');
            return;
        }
    
        const algorithms = ['bubble', 'selection', 'quick', 'insertion'];
        const originalArray = [...array]; 
        const statusMessage = document.getElementById('statusMessage');
    
        for (const algorithm of algorithms) {
            array = [...originalArray]; 
            renderArray();
    
            // Update the status message
            statusMessage.textContent = `Currently sorting with ${algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort...`;
    
            const startTime = performance.now();
    
            if (algorithm === 'bubble') {
                await bubbleSort();
            } else if (algorithm === 'selection') {
                await selectionSort();
            } else if (algorithm === 'quick') {
                await quickSort(0, array.length - 1);
            } else if (algorithm === 'insertion') {
                await insertionSort();
            }
    
            const endTime = performance.now();
            const timeTaken = (endTime - startTime).toFixed(2);
    
            timeData[algorithm] = timeTaken; 
        }
    
        statusMessage.textContent = 'Comparison complete.';
        updateChart(); 
        alert('Comparison complete.');
    }
    
    


    async function startSorting() {
        const algorithm = algorithmSelect.value;
        const startTime = performance.now();

        if (algorithm === 'bubble') {
            await bubbleSort();
        } else if (algorithm === 'selection') {
            await selectionSort();
        } else if (algorithm === 'quick') {
            await quickSort(0, array.length - 1);
        } else if (algorithm === 'insertion') {
            await insertionSort();
        } else {
            alert(`${algorithm} sort is not implemented yet!`);
        }

        const endTime = performance.now();
        const timeTaken = (endTime - startTime).toFixed(2);
        timeTakenElement.textContent = `Time Taken: ${timeTaken} ms`;

        timeData[algorithm] = timeTaken; 
        updateChart();

    }

    function updateChart() {
        comparisonChart.data.labels = Object.keys(timeData);
        comparisonChart.data.datasets[0].data = Object.values(timeData);
        comparisonChart.update();
    }

    inputArrayBtn.addEventListener('click', handleInputArray);
    startSortingBtn.addEventListener('click', startSorting);

    if (array.length > 0) {
        renderArray();
    }
});
