// Variables to store execution steps and the current step
let executionSteps = [];
let currentStep = -1;

// String containing the code to be displayed
let linesOfCode = `
def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left_half = arr[:mid]
    right_half = arr[mid:]

    left_half = merge_sort(left_half)
    right_half = merge_sort(right_half)

    return merge(left_half, right_half)

def merge(left, right):
    merged = []
    left_index, right_index = 0, 0

    while left_index < len(left) and right_index < len(right):
        if left[left_index] < right[right_index]:
            merged.append(left[left_index])
            left_index += 1
        else:
            merged.append(right[right_index])
            right_index += 1

    merged += left[left_index:]
    merged += right[right_index:]

    return merged
`;

// Dictionary to store explanations for lines of code
const codeExplanation = {
    0: "The 'merge_sort' function is divides the input list into two halves and recursively calls 'merge_sort' on each half.",
    1: "Checks to see if the length of the array is less than or equal to 1",
    2: "If the length of the input array is 1 or less, it is already sorted, so the function returns the array.",
    3: "The 'merge' function is called to merge the two sorted halves of the list back into a single sorted list.",
    8: "Calculate the midpoint of the array to divide it into left and right halves.",
    9: "Slice the array to get the left half from the beginning to the midpoint.",
    10: "Slice the array to get the right half from the midpoint to the end.",
    12: "Recursively call 'merge_sort' on the left half of the array.",
    13: "Recursively call 'merge_sort' on the right half of the array.",
    15: "Return the result of merging the sorted left and right halves using the 'merge' function.",
    18: "The 'merge' function is responsible for merging two sorted lists into one sorted list.",
    21: "Initialize an empty list to store the merged elements.",
    22: "Initialize two pointers, 'left_index' and 'right_index', for the left and right lists, respectively.",
    24: "While both 'left_index' and 'right_index' are within the bounds of their lists, compare elements at these indices.",
    25: "If the element in the 'left' list is smaller, append it to the merged list, and move the 'left_index' pointer.",
    28: "If the element in the 'right' list is smaller or equal, append it to the merged list, and move the 'right_index' pointer.",
    31: "If one of the lists is exhausted, add the remaining elements from the other list to the merged list.",
    34: "Return the final merged list.",
};

// Function to execute the algorithm and retrieve execution steps from the server
function executeAlgorithm() {
    
    // Split the multi-line code string into an array of individual lines by removing leading and trailing whitespace from each line.
    linesOfCode = linesOfCode.trim().split('\n');

    fetch('/execute_algorithm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        executionSteps = data;
        currentStep = -1;
        displayStep();
    })
    .catch(error => console.error('Error:', error));
}

// Function to display the current step
function displayStep() {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; // Clear previous content

    // Ensure the current step is within the valid range
    if (currentStep < 0) {
        currentStep = 0;
    } else if (currentStep >= executionSteps.length) {
        currentStep = executionSteps.length - 1;
    }

    const step = executionSteps[currentStep];
    const div = document.createElement('div');
    div.innerHTML = `<p>Merging: [${step.left_half}] and [${step.right_half}]</p>
                        <p>Merged list: [${step.merged_list}]</p>
                        <p>Merge at indices: (${step.merge_at[0]}, ${step.merge_at[1]}, ${step.merge_at[2]})</p>`;
    outputDiv.appendChild(div);

    // Highlight current line of code
    const codeDisplay = document.getElementById('code-display');
    codeDisplay.innerHTML = ''; // Clear previous content
    for (let i = 0; i < linesOfCode.length; i++) {
        const line = document.createElement('code');
        line.textContent = linesOfCode[i];
        if (i === currentStep) {
            line.classList.add('highlight');
            document.getElementById('code-explanation').textContent = codeExplanation[i] || '';
        }
        codeDisplay.appendChild(line);
        codeDisplay.appendChild(document.createElement('br'));
    }
}

// Function to navigate to the previous step
function goToPreviousStep() {
    currentStep--;
    displayStep();
}

// Function to navigate to the next step
function goToNextStep() {
    currentStep++;
    displayStep();
}