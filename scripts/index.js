let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let formElement = document.querySelector('.popup__form');
let profileJob = document.querySelector('.profile__job');
let popupName = formElement.querySelector('.popup__input_type_name');
let popupJob = formElement.querySelector('.popup__input_type_job');


function formEditOpen() {
    popupName.value = profileName.textContent;
    popupJob.value = profileJob.textContent;
    popup.classList.add('popup_open');
};

function formEditClose() {
    popup.classList.remove('popup_open');
};

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = popupName.value;
    profileJob.textContent = popupJob.value;
    formEditClose();
};

editButton.addEventListener('click', formEditOpen);

closeButton.addEventListener('click', formEditClose);

formElement.addEventListener('submit', formSubmitHandler);