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

    // Make the form container draggable
    makeFormContainerDraggable(form);

}

// Create form container
function createFormContainer() {
    const form = document.createElement('div');
    form.classList.add('relative', 'bg-white', 'p-10', 'my-5');
    return form;
}

// Function to make the form container draggable
function makeFormContainerDraggable(form) {
    form.draggable = true;

    form.addEventListener('dragstart', function (event) {
        event.dataTransfer.setData('text/plain', ''); // Set data to enable drag
        event.target.classList.add('dragging');
    });

    form.addEventListener('dragover', function (event) {
        event.preventDefault();
        const draggedElement = document.querySelector('.dragging');
        const dropContainer = event.target.closest('.drop-container');

        if (dropContainer && draggedElement !== event.target) {
            const nextElement = getNextElement(event.clientY, event.target);
            dropContainer.insertBefore(draggedElement, nextElement);
        }
    });

    form.addEventListener('dragend', function () {
        document.querySelectorAll('.dragging').forEach(dragged => {
            dragged.classList.remove('dragging');
            dragged.style.transition = ''; // Reset transition after dragging
        });
    });

    form.addEventListener('transitionend', function () {
        form.style.transition = ''; // Reset transition after swapping cards
    });
}

// Function to get the next element for rearrangement
function getNextElement(y, currentElement) {
    const elements = [...currentElement.parentElement.children];
    return elements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset, element: child };
        }
        return closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
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
    checkboxContainer.classList.add('flex', 'items-center', 'mb-2', 'justify-end', 'absolute', 'top-0', 'right-0', 'mr-10');

    const mustAnswerCheckbox = document.createElement('input');
    mustAnswerCheckbox.type = 'checkbox';
    mustAnswerCheckbox.classList.add('mr-2'); // Add margin for spacing

    const mustLabel = document.createElement('span');
    mustLabel.textContent = 'Required';

    checkboxContainer.appendChild(mustAnswerCheckbox);
    checkboxContainer.appendChild(mustLabel);

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
    const mustAnswerCheckbox = createMustAnswerCheckbox();
    const questionInput = createQuestionInput();
    const likertContainer = createLikertContainer();

    // Append form elements
    form.appendChild(questionInput);
    form.appendChild(likertContainer);
    form.appendChild(mustAnswerCheckbox);


    // Append form to drop container
    const dropContainer = document.querySelector(DROP_CONTAINER_SELECTOR);
    dropContainer.appendChild(form);

    // Add delete button to remove the form
    removeFormButton(form);

    // Make the form container draggable
    makeFormContainerDraggable(form);
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


// Function to create a Likert scale (5 points)
function createLikertForm5() {
    // Create form elements
    const form = createFormContainer();
    const mustAnswerCheckbox = createMustAnswerCheckbox();
    const questionInput = createQuestionInput();
    const likertContainer = createLikertContainer5();

    // Append form elements
    form.appendChild(questionInput);
    form.appendChild(mustAnswerCheckbox);
    form.appendChild(likertContainer);

    // Append form to drop container
    const dropContainer = document.querySelector(DROP_CONTAINER_SELECTOR);
    dropContainer.appendChild(form);

    // Add delete button to remove the form
    removeFormButton(form);

    // Make the form container draggable
    makeFormContainerDraggable(form);
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
        } else if (choice === "star-rating") {
            createStarRatingForm();
        } else if (choice === "text-field") {
            createTextFieldForm();
        } else if (choice === "image") {
            createImageForm();
        } else if (choice === "upload-question") {
            createUploadQuestionForm();
        }
        // Handle other choices if needed
    });
});

// Function to create a form with Star Rating
function createStarRatingForm() {
    // Create form elements
    const form = createFormContainer();
    const mustAnswerCheckbox = createMustAnswerCheckbox();
    const questionInput = createQuestionInput();
    const starRatingContainer = createStarRatingContainer();

    // Append form elements
    form.appendChild(questionInput);
    form.appendChild(mustAnswerCheckbox);
    form.appendChild(starRatingContainer);

    // Append form to drop container
    const dropContainer = document.querySelector(DROP_CONTAINER_SELECTOR);
    dropContainer.appendChild(form);

    // Add delete button to remove the form
    removeFormButton(form);

    // Make the form container draggable
    makeFormContainerDraggable(form);
}

// Create Star Rating container
function createStarRatingContainer() {
    const starRatingContainer = document.createElement('div');
    starRatingContainer.classList.add('star-rating-container', 'p-5', 'my-5', 'bg-white', 'border-2', 'border-gray-400', 'rounded-md');

    // Star Rating options
    const starRatingPoints = Array.from({ length: 5 });

    // Create Star Rating options with increasing numbers of stars
    starRatingPoints.forEach((_, index) => {
        const starRatingOption = document.createElement('div');
        starRatingOption.classList.add('star-rating-option', 'flex', 'items-center', 'mb-2');
        const stars = index + 1;
        starRatingOption.innerHTML = `
            <input type="radio" class="m-2" name="starRating" value="${stars}">
            <label class="m-2">${'<i class="fas fa-star"></i>'.repeat(stars)}</label>
        `;
        starRatingContainer.appendChild(starRatingOption);
    });

    // Add delete button to remove the Star Rating
    // removeStarRatingButton(starRatingContainer);

    return starRatingContainer;
}


// Function to create a form with Text Field
function createTextFieldForm() {
    // Create form elements
    const form = createFormContainer();
    const mustAnswerCheckbox = createMustAnswerCheckbox();
    const questionInput = createQuestionInput();
    const textFieldContainer = createTextFieldContainer();

    // Append form elements
    form.appendChild(questionInput);
    form.appendChild(mustAnswerCheckbox);
    form.appendChild(textFieldContainer);

    // Append form to drop container
    const dropContainer = document.querySelector(DROP_CONTAINER_SELECTOR);
    dropContainer.appendChild(form);

    // Add delete button to remove the form
    removeFormButton(form);

    // Make the form container draggable
    makeFormContainerDraggable(form);
}

// Create Text Field container
function createTextFieldContainer() {
    const textFieldContainer = document.createElement('div');
    textFieldContainer.classList.add('text-field-container', 'p-5', 'my-5', 'bg-white', 'border-2', 'border-gray-400', 'rounded-md');

    // Create a single Text Field option
    const textFieldOption = document.createElement('div');
    textFieldOption.classList.add('text-field-option', 'flex', 'items-center', 'mb-2');
    textFieldOption.innerHTML = `
        <input type="text" class="m-2 w-full border-b-2 border-gray-400 focus:border-indigo-600 focus:outline-none" placeholder="Answer here">
    `;
    textFieldContainer.appendChild(textFieldOption);

    // Add delete button to remove the Text Field
    // removeTextFieldButton(textFieldContainer);

    return textFieldContainer;
}

// Function to create a form with Image options
function createImageForm() {
    // Create form elements
    const form = createFormContainer();
    const questionInput = createQuestionInput();
    const imageOptionContainer = createImageOptionContainer();
    const addImageOptionBtn = createAddImageOptionButton(imageOptionContainer);

    // Append form elements
    form.appendChild(questionInput);
    form.appendChild(imageOptionContainer);
    form.appendChild(addImageOptionBtn);

    // Append form to drop container
    const dropContainer = document.querySelector(DROP_CONTAINER_SELECTOR);
    dropContainer.appendChild(form);

    // Show one image option initially
    createImageOption(imageOptionContainer);

    // Add delete button to remove the form
    removeFormButton(form);

    // Make the form container draggable
    makeFormContainerDraggable(form);
}

// Create Image option container
function createImageOptionContainer() {
    const imageOptionContainer = document.createElement('div');
    imageOptionContainer.id = 'image-option-container';
    return imageOptionContainer;
}

// Create add Image option button
function createAddImageOptionButton(imageOptionContainer) {
    const addImageOptionBtn = document.createElement('button');
    addImageOptionBtn.id = 'add-image-option';
    addImageOptionBtn.textContent = 'Add Option';
    addImageOptionBtn.classList.add('mt-4', 'px-4', 'py-2', 'bg-green-500', 'text-white', 'rounded-md', 'shadow-md', 'hover:bg-green-600', 'focus:outline-none', 'focus:ring-2', 'focus:ring-green-500', 'focus:ring-opacity-50');
    addImageOptionBtn.addEventListener('click', () => createImageOption(imageOptionContainer));
    return addImageOptionBtn;
}


// Function to create a new Image option
function createImageOption(imageOptionContainer) {
    const newImageOption = document.createElement('div');
    newImageOption.classList.add('flex', 'pb-2', 'mb-3');
    newImageOption.innerHTML = `
        <input type="checkbox" class="m-2" />
        <input type="file" accept="image/*" class="m-2" />
        <button class="text-black rounded-full focus:outline-none delete-image-option"><i class="fas fa-trash"></i></button>
    `;
    imageOptionContainer.appendChild(newImageOption);

    // Add event listener for delete button
    const deleteBtn = newImageOption.querySelector('.delete-image-option');
    deleteBtn.addEventListener('click', () => {
        newImageOption.remove();
    });
}

// Function to create a form with Upload Question
function createUploadQuestionForm() {
    // Create form elements
    const form = createFormContainer();
    const mustAnswerCheckbox = createMustAnswerCheckbox();
    const uploadQuestionContainer = createUploadQuestionContainer();

    // Append form elements
    form.appendChild(mustAnswerCheckbox);
    form.appendChild(uploadQuestionContainer);

    // Append form to drop container
    const dropContainer = document.querySelector(DROP_CONTAINER_SELECTOR);
    dropContainer.appendChild(form);

    // Add delete button to remove the form
    removeFormButton(form);

    // Make the form container draggable
    makeFormContainerDraggable(form);
}

// Create Upload Question container
function createUploadQuestionContainer() {
    const uploadQuestionContainer = document.createElement('div');
    uploadQuestionContainer.classList.add('upload-question-container', 'p-5', 'my-5', 'bg-white', 'border-2', 'border-gray-400', 'rounded-md', 'flex', 'items-center', 'justify-center', 'cursor-pointer');

    const uploadLabel = document.createElement('label');
    uploadLabel.classList.add('text-center', 'text-gray-600', 'border', 'border-dashed', 'border-gray-400', 'rounded-md', 'p-10', 'w-full', 'h-full', 'flex', 'items-center', 'justify-center', 'gap-2');
    uploadLabel.setAttribute('for', 'uploadInput');

    // Create the icon
    const uploadIcon = document.createElement('i');
    uploadIcon.classList.add('fas', 'fa-upload', 'text-2xl', 'text-gray-600');

    // Create the text
    const uploadText = document.createElement('span');
    uploadText.textContent = 'Upload your file';

    // Append the icon and text to the label
    uploadLabel.appendChild(uploadIcon);
    uploadLabel.appendChild(uploadText);

    const uploadInput = document.createElement('input');
    uploadInput.setAttribute('type', 'file');
    uploadInput.setAttribute('id', 'uploadInput');
    uploadInput.classList.add('hidden');
    uploadInput.setAttribute('accept', '.pdf,.doc,.docx');

    uploadQuestionContainer.appendChild(uploadLabel);
    uploadQuestionContainer.appendChild(uploadInput);

    // Add event listener for file input
    uploadInput.addEventListener('change', (event) => {
        const fileName = event.target.files[0].name;
        uploadText.textContent = fileName;
    });

    return uploadQuestionContainer;
}


