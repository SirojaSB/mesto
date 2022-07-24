export const initialCards = [
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

export const validationEnable = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
};

export const buttonEdit = document.querySelector('.profile__edit-button');
export const popupEditSelector = document.querySelector('#popup-edit');
export const popupAddSelector = document.querySelector('#popup-add');
export const popupImgSelector = document.querySelector('#popup-img');
export const buttonAdd = document.querySelector('.profile__add-button');
export const formEditEl = document.querySelector('#edit-profile');
export const formAddEl = document.querySelector('#add-snapshot');
export const popupName = formEditEl.querySelector('#formname');
export const popupJob = formEditEl.querySelector('#formjob');
export const snapshotContainer = document.querySelector('.snapshots__elements');
export const buttonSubmitEdit = popupEditSelector.querySelector('.popup__submit')
export const buttonSubmitAdd = popupAddSelector.querySelector('.popup__submit')