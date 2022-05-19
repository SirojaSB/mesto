let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let popupName = document.querySelector('.popup__input_name');
let popupJob = document.querySelector('.popup__input_job');
let formElement = document.querySelector('.popup__form');

function formEditOpen() {
    popup.classList.add('popup__open');
    popupName.value = profileName.textContent;
    popupJob.value = profileJob.textContent;
};

function formEditClose() {
    popup.classList.remove('popup__open');
};

editButton.addEventListener('click', formEditOpen);

closeButton.addEventListener('click', formEditClose);

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    profileName.textContent = popupName.value;
    profileJob.textContent = popupJob.value;
    popup.classList.remove('popup__open');
};

formElement.addEventListener('submit', formSubmitHandler);