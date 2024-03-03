// Constants
const DROP_CONTAINER_SELECTOR = '.drop-container';
const DRAGGABLE_OPTION_SELECTOR = '.draggable-option';

// Function to create a form with options
function createForm() {
    // Create form elements
    const form = createFormContainer();
    const questionInput = createQuestionInput();
    const optionContainer = createOptionContainer();
    const addOptionBtn = createAddOptionButton(optionContainer);

    // Append form elements
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
        console.log("Dropped choice: " + choice);
        // Create form based on dropped choice
        if (choice === "radio") {
            createForm();
            // Handle other choices if needed
        }
    });
});
