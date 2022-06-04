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
    closeImgButton.addEventListener('click', function () {
        popupClose(popupImg);
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
    let cardCreateFull = createCard (item.name, item.link)

    renderCard(cardCreateFull, snapshotContainer);
});

const popupOpen = popup => {
    popup.classList.add('popup_open');
};

const popupClose = popup => {
    popup.classList.remove('popup_open');
};

const formEditSubmitHandler = e => {
    e.preventDefault();

    profileName.textContent = popupName.value;
    profileJob.textContent = popupJob.value;

    popupClose(popupEdit);
};

const formAddSubmitHandler = e => {
    e.preventDefault();

    let cardCreateFull = createCard (popupImgName.value, popupImgLink.value);

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

formEditEl.addEventListener('submit', formEditSubmitHandler);

formAddEl.addEventListener('submit', formAddSubmitHandler);