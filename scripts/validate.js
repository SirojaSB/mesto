const showInputError = (formElement, inputElement, errorMessage, validationEn) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(validationEn.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationEn.errorClass);
};

const hideInputError = (formElement, inputElement, validationEn) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(validationEn.inputErrorClass);
    errorElement.classList.remove(validationEn.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, validationEn) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationEn);
    } else {
        hideInputError(formElement, inputElement, validationEn);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement, validationEn) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validationEn.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        activeButtonState(buttonElement, validationEn);
    };
};

const setEventListeners = (formElement, validationEn) => {
    const inputList = Array.from(formElement.querySelectorAll(validationEn.inputSelector));
    const buttonElement = formElement.querySelector(validationEn.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, validationEn);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, validationEn);
            toggleButtonState(inputList, buttonElement, validationEn);
        });
    });
};

const enableValidation = (validationEn) => {
    const formList = Array.from(document.querySelectorAll(validationEn.formSelector));

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        setEventListeners(formElement, validationEn);
    });
};


enableValidation(validationEn);

//функции для ресета ошибок

const resetInputError = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(validationEn.inputSelector));

    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, validationEn);
    });
}

const activeButtonState = (buttonElement, validationEn) => {
    buttonElement.classList.remove(validationEn.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', true);
};
