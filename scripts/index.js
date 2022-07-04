import { Card } from "./Сard.js";
import { FormValidator } from "./FormValidator.js";

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const validationEnable = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
};

const editButton = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('#popup-edit');
const popupAdd = document.querySelector('#popup-add');
const popupImg = document.querySelector('#popup-img');
const imgPopup = document.querySelector('.popup__image');
const closeImgButton = document.querySelector('#close-img');
const captionPopup = document.querySelector('.popup__caption');
const addButton = document.querySelector('.profile__add-button');
const closeEditButton = document.querySelector('#close-edit');
const closeAddButton = document.querySelector('#close-add');
const profileName = document.querySelector('.profile__name');
const formEditEl = document.querySelector('#edit-profile');
const formAddEl = document.querySelector('#add-snapshot');
const profileJob = document.querySelector('.profile__job');
const popupName = formEditEl.querySelector('#formname');
const popupJob = formEditEl.querySelector('#formjob');
const popupImgName = formAddEl.querySelector('#form-img-name');
const popupImgLink = formAddEl.querySelector('#form-img-link');
const snapshotContainer = document.querySelector('.snapshots__elements');
const submitEditButton = popupEdit.querySelector('.popup__submit')
const submitAddButton = popupAdd.querySelector('.popup__submit')
const popupOverlays = document.querySelectorAll('.popup');

function cardOpen(title, src) {
    popupOpen(popupImg);
    imgPopup.src = src;
    imgPopup.alt = title;
    captionPopup.textContent = title;
}

function createCard (data) {
    const card = new Card(data, '.snapshots__template', cardOpen);

    return card.makeCard();
}

function renderCard(card, container) {
    container.prepend(card);
}

initialCards.forEach((item) => {
    const cardCreateFull = createCard (item)

    renderCard(cardCreateFull, snapshotContainer);
});

const popupOpen = popup => {
    popup.classList.add('popup_open');
    document.addEventListener('keydown', keyHandler);
};

const popupClose = popup => {
    popup.classList.remove('popup_open');
    document.removeEventListener('keydown', keyHandler);
};

const keyHandler = evt => {
    if (evt.key === 'Escape') {
        popupClose(document.querySelector('.popup_open'));
    }
};

const formEditSubmitHandler = e => {
    e.preventDefault();

    profileName.textContent = popupName.value;
    profileJob.textContent = popupJob.value;

    popupClose(popupEdit);
};

const formAddSubmitHandler = e => {
    e.preventDefault();

    const data = {
        name: popupImgName.value,
        link: popupImgLink.value,
    };

    const cardCreateFull = createCard(data);

    renderCard(cardCreateFull, snapshotContainer);

    formAddEl.reset();

    addFormValidate.inactiveButtonState(submitAddButton, validationEnable);

    popupClose(popupAdd);
};

function popupEditText() {
    popupName.value = profileName.textContent;
    popupJob.value = profileJob.textContent;
}

editButton.addEventListener('click', function () {
    popupEditText();

    editFormValidate.resetInputError(formEditEl, validationEnable);

    editFormValidate.activeButtonState(submitEditButton, validationEnable);

    popupOpen(popupEdit);
});

addButton.addEventListener('click', function () {
    popupOpen(popupAdd);
});

closeEditButton.addEventListener('click', function () {
    popupClose(popupEdit);
});

closeAddButton.addEventListener('click', function () {
    popupClose(popupAdd);
});

closeImgButton.addEventListener('click', function () {
    popupClose(popupImg);
});

popupOverlays.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_open')) {
            popupClose(evt.target);
        }
    });
});

formEditEl.addEventListener('submit', formEditSubmitHandler);

formAddEl.addEventListener('submit', formAddSubmitHandler);

const addFormValidate = new FormValidator(validationEnable, formAddEl);
addFormValidate.enableValidation();

const editFormValidate = new FormValidator(validationEnable, formEditEl);
editFormValidate.enableValidation();