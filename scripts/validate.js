const showInputError = (formElement, inputElement, errorMessage, validation) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(validation.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validation.errorClass);
};

const hideInputError = (formElement, inputElement, validation) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(validation.inputErrorClass);
    errorElement.classList.remove(validation.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, validation) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validation);
    } else {
        hideInputError(formElement, inputElement, validation);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const activeButtonState = (buttonElement, validation) => {
    buttonElement.classList.remove(validation.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', true);
};

const inactiveButtonState = (buttonElement, validation) => {
    buttonElement.classList.add(validation.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
};

const toggleButtonState = (inputList, buttonElement, validation) => {
    if (hasInvalidInput(inputList)) {
        inactiveButtonState(buttonElement, validation);
    } else {
        activeButtonState(buttonElement, validation);
    };
};

const setEventListeners = (formElement, validation) => {
    const inputList = Array.from(formElement.querySelectorAll(validation.inputSelector));
    const buttonElement = formElement.querySelector(validation.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, validation);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, validation);
            toggleButtonState(inputList, buttonElement, validation);
        });
    });
};

const enableValidation = (validation) => {
    const formList = Array.from(document.querySelectorAll(validation.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        setEventListeners(formElement, validation);
    });
};


enableValidation(validationEnable);

//функция для ресета ошибок

const resetInputError = (formElement, validation) => {
    const inputList = Array.from(formElement.querySelectorAll(validation.inputSelector));

    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, validation);
    });
}




