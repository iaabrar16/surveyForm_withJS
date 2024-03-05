// Constants
const DROP_CONTAINER_SELECTOR = '.drop-container';
const DRAGGABLE_OPTION_SELECTOR = '.draggable-option';

// Function to create a form with options
function createForm() {
    // Create form elements
    const form = createFormContainer();
    const questionInput = createQuestionInput();
    const mustAnswerCheckbox = createMustAnswerCheckbox();
    const optionContainer = createOptionContainer();
    const addOptionBtn = createAddOptionButton(optionContainer);

    // Append form elements
    form.appendChild(mustAnswerCheckbox);
    form.appendChild(questionInput);
    form.appendChild(optionContainer);
    form.appendChild(addOptionBtn);

    // Append form to drop container
    const dropContainer = document.querySelector(DROP_CONTAINER_SELECTOR);
    dropContainer.appendChild(form);

    // Show one option initially
    createOption(optionContainer);

    // Add delete button to remove the form
    removeFormButton(form);


}
//  // Make the form container draggable
//  makeElementDraggable(form);
// // Function to make an element draggable with snapping (up and down)
// function makeElementDraggable(element) {
//     let startY, initialY, isDragging = false;
//     const snapHeight = 150; // Adjust this value for the desired spacing

//     element.addEventListener('mousedown', function (event) {
//         isDragging = true;

//         // Store the initial values
//         startY = event.clientY;
//         initialY = element.offsetTop;

//         // Add event listeners for mousemove and mouseup
//         document.addEventListener('mousemove', handleMouseMove);
//         document.addEventListener('mouseup', handleMouseUp);
//     });

//     function handleMouseMove(event) {
//         if (isDragging) {
//             // Calculate the new position based on mouse movement
//             const deltaY = event.clientY - startY;
//             const newOffset = initialY + deltaY;

//             // Snap the element to a multiple of snapHeight
//             const snappedOffset = Math.round(newOffset / snapHeight) * snapHeight;

//             // Update the element's position within the parent container
//             const parentHeight = element.parentElement.offsetHeight;
//             const elementHeight = element.offsetHeight;

//             if (snappedOffset >= 0 && snappedOffset + elementHeight <= parentHeight) {
//                 element.style.top = snappedOffset + 'px';
//             }
//         }
//     }

//     function handleMouseUp() {
//         isDragging = false;

//         // Remove event listeners when dragging is finished
//         document.removeEventListener('mousemove', handleMouseMove);
//         document.removeEventListener('mouseup', handleMouseUp);
//     }
// }


// Create form container
function createFormContainer() {
    const form = document.createElement('div');
    form.classList.add('relative', 'bg-white', 'p-10', 'my-5');
    return form;
}



// Create question input field
function createQuestionInput() {
    const questionInput = document.createElement('input');
    questionInput.classList.add('text-3xl', 'w-full', 'pb-2', 'mb-3', 'border-b-2', 'border-gray-400', 'focus:border-indigo-600', 'focus:outline-none');
    questionInput.setAttribute('type', 'text');
    questionInput.setAttribute('placeholder', 'Untitled Question');
    return questionInput;
}

// Function to create a checkbox for must-answer question
function createMustAnswerCheckbox() {
    const checkboxContainer = document.createElement('div');
    checkboxContainer.classList.add('flex', 'items-center');

    const mustAnswerCheckbox = document.createElement('input');
    mustAnswerCheckbox.type = 'checkbox';
    mustAnswerCheckbox.classList.add('mr-2'); // Add margin for spacing

    const mustLabel = document.createElement('span');
    mustLabel.textContent = 'Required';

    checkboxContainer.appendChild(mustAnswerCheckbox);
    checkboxContainer.appendChild(mustLabel);

    // Style the container if needed
    checkboxContainer.classList.add('absolute', 'top-2', 'right-10'); // Position the container

    return checkboxContainer;
}


// Create options container
function createOptionContainer() {
    const optionContainer = document.createElement('ol');
    optionContainer.id = 'option-container';
    return optionContainer;
}

// Create add option button
function createAddOptionButton(optionContainer) {
    const addOptionBtn = document.createElement('button');
    addOptionBtn.id = 'add-option';
    addOptionBtn.textContent = 'Add Option';
    addOptionBtn.classList.add('mt-4', 'px-4', 'py-2', 'bg-green-500', 'text-white', 'rounded-md', 'shadow-md', 'hover:bg-green-600', 'focus:outline-none', 'focus:ring-2', 'focus:ring-green-500', 'focus:ring-opacity-50');
    addOptionBtn.addEventListener('click', () => createOption(optionContainer));
    return addOptionBtn;
}

// Function to create a new option
function createOption(optionContainer) {
    const newOption = document.createElement('li');
    newOption.classList.add('flex', 'pb-2', 'mb-3');
    newOption.innerHTML = `
        <p class='m-2'>${optionContainer.children.length + 1}.</p> 
        <input type='radio'class='m-2'></input>
        <input class='text-xl w-full border-b-2 border-gray-400 focus:border-indigo-600 focus:outline-none' placeholder='Option'></input>
        <button class="text-black rounded-full focus:outline-none delete-option"><i class="fas fa-trash"></i></button>
    `;
    optionContainer.appendChild(newOption);

    // Add event listener for delete button
    const deleteBtn = newOption.querySelector('.delete-option');
    deleteBtn.addEventListener('click', () => {
        newOption.remove();
        updateOptionNumbering(optionContainer);
    });

    // Update the option numbering
    updateOptionNumbering(optionContainer);
}

// Function to update the option numbering
function updateOptionNumbering(optionContainer) {
    const options = optionContainer.querySelectorAll('li');
    options.forEach((option, index) => {
        option.querySelector('p').textContent = `${index + 1}.`;
    });
}

// Function to add delete button to remove the form
function removeFormButton(form) {
    const removeFormBtn = document.createElement('button');
    removeFormBtn.innerHTML = 'Remove Form</i>';
    removeFormBtn.classList.add('absolute', 'bottom-10', 'right-10', 'mt-1', 'mr-1', 'bg-gray-200', 'hover:text-red-800', 'focus:outline-none', 'px-5', 'py-2');
    removeFormBtn.addEventListener('click', () => {
        form.remove();
    });
    form.appendChild(removeFormBtn);
}


// Function to create a form with Likert scale
function createLikertForm() {
    // Create form elements
    const form = createFormContainer();
    const questionInput = createQuestionInput();
    const likertContainer = createLikertContainer();

    // Append form elements
    form.appendChild(questionInput);
    form.appendChild(likertContainer);

    // Append form to drop container
    const dropContainer = document.querySelector(DROP_CONTAINER_SELECTOR);
    dropContainer.appendChild(form);

    // Add delete button to remove the form
    removeFormButton(form);
}

// Create Likert scale container
function createLikertContainer() {
    const likertContainer = document.createElement('div');
    likertContainer.classList.add('likert-container', 'p-5', 'my-5', 'bg-white', 'border-2', 'border-gray-400', 'rounded-md');

    // Likert scale points
    const likertPoints = ['Agree', 'Neutral', 'Disagree'];

    // Create Likert scale options
    likertPoints.forEach((point, index) => {
        const likertOption = document.createElement('div');
        likertOption.classList.add('likert-option', 'flex', 'items-center', 'mb-2');
        likertOption.innerHTML = `
            <input type="radio" class="m-2" name="likertScale" value="${point.toLowerCase()}">
            <label class="m-2">${point}</label>
        `;
        likertContainer.appendChild(likertOption);
    });

    // Add delete button to remove the Likert scale
    // removeLikertScaleButton(likertContainer);

    return likertContainer;
}

// Function to add delete button to remove the Likert scale
function removeLikertScaleButton(likertContainer) {
    const removeLikertBtn = document.createElement('button');
    removeLikertBtn.innerHTML = 'Remove Likert Scale</i>';
    removeLikertBtn.classList.add('absolute', 'bottom-5', 'right-5', 'mt-1', 'mr-1', 'bg-gray-200', 'hover:text-red-800', 'focus:outline-none', 'px-5', 'py-2');
    removeLikertBtn.addEventListener('click', () => {
        // likertContainer.remove();
    });
    likertContainer.appendChild(removeLikertBtn);
}

// Event listener when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
    // Get draggable options and drop container
    const draggableOptions = document.querySelectorAll(DRAGGABLE_OPTION_SELECTOR);
    const dropContainer = document.querySelector(DROP_CONTAINER_SELECTOR);

    // Add dragstart event listener to draggable options
    draggableOptions.forEach(option => {
        option.addEventListener("dragstart", function (event) {
            event.dataTransfer.setData("choice", option.getAttribute("data-choice"));
        });
    });

    // Add dragover event listener to drop container
    dropContainer.addEventListener("dragover", function (event) {
        event.preventDefault();
    });

    // Add drop event listener to drop container
    dropContainer.addEventListener("drop", function (event) {
        event.preventDefault();
        const choice = event.dataTransfer.getData("choice");


    });
});

// Function to create a Likert scale (5 points)
function createLikertForm5() {
    // Create form elements
    const form = createFormContainer();
    const questionInput = createQuestionInput();
    const likertContainer = createLikertContainer5();

    // Append form elements
    form.appendChild(questionInput);
    form.appendChild(likertContainer);

    // Append form to drop container
    const dropContainer = document.querySelector(DROP_CONTAINER_SELECTOR);
    dropContainer.appendChild(form);

    // Add delete button to remove the form
    removeFormButton(form);
}

// Create Likert scale container (5 points)
function createLikertContainer5() {
    const likertContainer = document.createElement('div');
    likertContainer.classList.add('likert-container', 'p-5', 'my-5', 'bg-white', 'border-2', 'border-gray-400', 'rounded-md');



    // Likert scale points (5 points)
    const likertPoints = ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'];

    // Create Likert scale options
    likertPoints.forEach((point, index) => {
        const likertOption = document.createElement('div');
        likertOption.classList.add('likert-option', 'flex', 'items-center', 'mb-2');
        likertOption.innerHTML = `
            <input type="radio" class="m-2" name="likertScale5" value="${point.toLowerCase().replace(' ', '-')}">
            <label class="m-2">${point}</label>
        `;
        likertContainer.appendChild(likertOption);
    });

    // Add delete button to remove the Likert scale
    // removeLikertScaleButton(likertContainer);

    return likertContainer;
}

// Event listener when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
    // Get draggable options and drop container
    const draggableOptions = document.querySelectorAll(DRAGGABLE_OPTION_SELECTOR);
    const dropContainer = document.querySelector(DROP_CONTAINER_SELECTOR);

    // Add dragstart event listener to draggable options
    draggableOptions.forEach(option => {
        option.addEventListener("dragstart", function (event) {
            event.dataTransfer.setData("choice", option.getAttribute("data-choice"));
        });
    });

    // Add dragover event listener to drop container
    dropContainer.addEventListener("dragover", function (event) {
        event.preventDefault();
    });

    // Add drop event listener to drop container
    dropContainer.addEventListener("drop", function (event) {
        event.preventDefault();
        const choice = event.dataTransfer.getData("choice");

        // Create form based on dropped choice
        if (choice === "radio") {
            createForm();
        } else if (choice === "likert") {
            createLikertForm();
        } else if (choice === "likert5") {
            createLikertForm5();
        }
        // Handle other choices if needed
    });
});