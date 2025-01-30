document.addEventListener('DOMContentLoaded', () => {
    const arrayContainer = document.getElementById('arrayContainer');
    const inputArrayBtn = document.getElementById('inputArray');
    const startSortingBtn = document.getElementById('startSorting');
    const algorithmSelect = document.getElementById('algorithm');
    const timeTakenElement = document.getElementById('timeTaken');
    const chartCanvas = document.getElementById('comparisonChart');
    const swapCountElement = document.getElementById('swapCount');
    document.getElementById('compareAll').addEventListener('click', compareAllSortingAlgorithms);

    let swapCounter = 0;

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
                await delay(600); 

                if (parseInt(boxes[j].textContent) < parseInt(boxes[min].textContent)) {
                
                    boxes[min].style.backgroundColor = '';
                    min = j;
                    boxes[min].style.backgroundColor = 'blue';
                }
                boxes[j].style.backgroundColor = '';
            }

       
            if (min !== i) {
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

            await delay(600);
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


    // perform Heap Sort

    async function heapSort() {
        const boxes = document.querySelectorAll('.box');
        const n = boxes.length;
    
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await heapify(boxes, n, i);
        }
    
        for (let i = n - 1; i > 0; i--) {
            await swapBoxes(boxes[0], boxes[i]);  
            boxes[i].style.backgroundColor = '#4caf50';  
            await delay(1000); // Additional delay to slow down swaps
            await heapify(boxes, i, 0);
        }
        boxes[0].style.backgroundColor = '#4caf50';
    }
    
    // Heapify function with a delay
    async function heapify(boxes, n, i) {
        let largest = i; 
        let left = 2 * i + 1;
        let right = 2 * i + 2;
    
        if (left < n && parseInt(boxes[left].textContent) > parseInt(boxes[largest].textContent)) {
            largest = left;
        }
    
        if (right < n && parseInt(boxes[right].textContent) > parseInt(boxes[largest].textContent)) {
            largest = right;
        }
    
        if (largest !== i) {
            await swapBoxes(boxes[i], boxes[largest]); 
            await delay(1000); // Delay to make swaps slower
            await heapify(boxes, n, largest);
        }
    }
    
    

    // merge Sort
    async function mergeSort(left, right) {
        if (left >= right) return;
    
        const mid = Math.floor((left + right) / 2);
    
        // Recursively sort the left and right halves
        await mergeSort(left, mid);
        await mergeSort(mid + 1, right);
    
        // Merge the sorted halves
        await merge(left, mid, right);
    }
    
    async function merge(left, mid, right) {
        const tempArray = [];
        let i = left, j = mid + 1;
        const boxes = document.querySelectorAll('.box');
    
        while (i <= mid && j <= right) {
            boxes[i].style.backgroundColor = 'red'; 
            boxes[j].style.backgroundColor = 'red'; 
            await delay(600);
    
            if (array[i] <= array[j]) {
                tempArray.push(array[i]);
                i++;
            } else {
                tempArray.push(array[j]);
                j++;
            }
        }

        while (i <= mid) {
            tempArray.push(array[i]);
            i++;
        }

        while (j <= right) {
            tempArray.push(array[j]);
            j++;
        }

        for (let k = left, t = 0; k <= right; k++, t++) {
            
            await swapBoxes(boxes[k], boxes[t + left]);
            array[k] = tempArray[t]; 
        }
    
        renderArray();
        await delay(600); 
    
        for (let k = left; k <= right; k++) {
            boxes[k].style.backgroundColor = '#4caf50';
        }
    }
    

    // Swap two boxes
    function swapBoxes(box1, box2) {
        return new Promise(resolve => {
            
            swapCounter++; // Increment swap count
            swapCountElement.textContent = `Swaps: ${swapCounter}`;

            const box1Position = box1.getBoundingClientRect();
            const box2Position = box2.getBoundingClientRect();

            box1.style.transition = 'transform 1s ease';
            box2.style.transition = 'transform 1s ease';

            const deltaX = box2Position.left - box1Position.left;
            const deltaY = box2Position.top - box1Position.top;
    
            box1.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            box2.style.transform = `translate(${-deltaX}px, ${-deltaY}px)`;
    
      
            setTimeout(() => {
                box1.style.transition = '';
                box2.style.transition = '';
                box1.style.transform = '';
                box2.style.transform = '';

                const tempText = box1.textContent;
                box1.textContent = box2.textContent;
                box2.textContent = tempText;
                resolve();
            }, 1000); 
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

    // swap count chart

    function drawBarChart(swapCounts) {
        const barChartCanvas = document.getElementById('barChartCanvas');
        const barChartData = {
            labels: Object.keys(swapCounts),  // Sorting algorithm names
            datasets: [{
                label: 'Number of Swaps',
                data: Object.values(swapCounts),  // Swap counts for each algorithm
                backgroundColor: [
                    'rgba(75, 192, 192, 0.5)', 
                    'rgba(255, 99, 132, 0.5)', 
                    'rgba(54, 162, 235, 0.5)', 
                    'rgba(255, 159, 64, 0.5)', 
                    'rgba(153, 102, 255, 0.5)', 
                    'rgba(255, 205, 86, 0.5)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)', 
                    'rgba(255, 99, 132, 1)', 
                    'rgba(54, 162, 235, 1)', 
                    'rgba(255, 159, 64, 1)', 
                    'rgba(153, 102, 255, 1)', 
                    'rgba(255, 205, 86, 1)'
                ],
                borderWidth: 1
            }]
        };
    
        // Create or update the bar chart
        new Chart(barChartCanvas, {
            type: 'bar',
            data: barChartData,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Swaps'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(tooltipItem) {
                                return `${tooltipItem.label}: ${tooltipItem.raw} swaps`;
                            }
                        }
                    }
                }
            }
        });
    }

    // compare all
    
    async function compareAllSortingAlgorithms() {
        if (array.length === 0) {
            alert('Please input an array first!');
            return;
        }
    
        swapCounter = 0; 
        swapCountElement.textContent = `Swaps: ${swapCounter}`; 
    
        const algorithms = ['bubble', 'selection', 'quick', 'insertion', 'heap', 'merge'];
        const originalArray = [...array]; 
        const statusMessage = document.getElementById('statusMessage');
    
        
        let swapCounts = {};
    
        for (const algorithm of algorithms) {
            array = [...originalArray]; 
            renderArray();
    
            statusMessage.textContent = `Currently sorting with ${algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort...`;
    
            swapCounter = 0; 
            swapCountElement.textContent = `Swaps: ${swapCounter}`; 
    
            const startTime = performance.now();
    
            if (algorithm === 'bubble') {
                await bubbleSort();
            } else if (algorithm === 'selection') {
                await selectionSort();
            } else if (algorithm === 'quick') {
                await quickSort(0, array.length - 1);
            } else if (algorithm === 'insertion') {
                await insertionSort();
            } else if (algorithm === 'heap') {  
                await heapSort();
            } else if (algorithm === 'merge') {  
                await mergeSort(0, array.length - 1);
            }
    
            const endTime = performance.now();
            const timeTaken = (endTime - startTime).toFixed(2);
            timeData[algorithm] = timeTaken;
    
            
            swapCounts[algorithm] = swapCounter;
        }
    
        statusMessage.textContent = 'Comparison complete.';
        updateChart();
        drawBarChart(swapCounts);
    
        alert('Comparison complete.');
    }
    
    
    


    async function startSorting() {

        swapCounter = 0; 
        swapCountElement.textContent = `Swaps: ${swapCounter}`;
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
        } else if (algorithm === 'heap') {  
            await heapSort();
        } else if (algorithm === 'merge') {  
            await mergeSort(0, array.length - 1);
        }else {
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
