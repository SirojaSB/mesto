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

const validationEn = {
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
const snapshotTemplate = document.querySelector('.snapshots__template');
const submitEditButton = popupEdit.querySelector('.popup__submit')
const popupOverlays = document.querySelectorAll('.popup');


const addPopupListeners = card => {
    card.querySelector('.snapshots__like').addEventListener('click', function (e) {
        e.target.classList.toggle('snapshots__like_active');
    })
    card.querySelector('.snapshots__delete').addEventListener('click', function (e) {
        const card = e.target.closest('.snapshots__element');
        card.remove();
    })
    const snapshotTitle = card.querySelector('.snapshots__title');
    card.querySelector('.snapshots__photo').addEventListener('click', function (e) {
        popupOpen(popupImg);
        imgPopup.src = e.target.src;
        imgPopup.alt = snapshotTitle.textContent;
        captionPopup.textContent = snapshotTitle.textContent;

    });
}

function createCard (name, link) {
    const card = snapshotTemplate.content.cloneNode(true);
    card.querySelector('.snapshots__photo').src = link;
    card.querySelector('.snapshots__photo').alt= name;
    card.querySelector('.snapshots__title').textContent= name;
    addPopupListeners(card);
    return card;
};

function renderCard(card, container) {
    container.prepend(card);
}

initialCards.forEach((item) => {
    const cardCreateFull = createCard (item.name, item.link)

    renderCard(cardCreateFull, snapshotContainer);
});

const popupOpen = popup => {
    popup.classList.add('popup_open');
    document.addEventListener('keydown', keyHandler);
};

const popupClose = popup => {
    popup.classList.remove('popup_open');
};

const keyHandler = evt => {
    if (evt.key === 'Escape') {
        popupClose(document.querySelector('.popup_open'));
    };
};

const formEditSubmitHandler = e => {
    e.preventDefault();

    profileName.textContent = popupName.value;
    profileJob.textContent = popupJob.value;

    popupClose(popupEdit);
};

const formAddSubmitHandler = e => {
    e.preventDefault();

    const cardCreateFull = createCard (popupImgName.value, popupImgLink.value);

    renderCard(cardCreateFull, snapshotContainer);

    formAddEl.reset();

    popupClose(popupAdd);
};

function popupEditText() {
    popupName.value = profileName.textContent;
    popupJob.value = profileJob.textContent;
};

editButton.addEventListener('click', function () {
    popupEditText();

    resetInputError(formEditEl);

    activeButtonState(submitEditButton, validationEn);

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
        };
    });
});

formEditEl.addEventListener('submit', formEditSubmitHandler);

formAddEl.addEventListener('submit', formAddSubmitHandler);