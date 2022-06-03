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

const addPopupListeners = snapshot => {
    snapshot.querySelector('.snapshots__like').addEventListener('click', function (e) {
        e.target.classList.toggle('snapshots__like_active');
    })
    snapshot.querySelector('.snapshots__delete').addEventListener('click', function (e) {
        const snapshot = e.target.closest('.snapshots__element');
        snapshot.remove();
    })
    const snapshotTitle = snapshot.querySelector('.snapshots__title');
    snapshot.querySelector('.snapshots__photo').addEventListener('click', function (e) {
        formOpen(popupImg);
        imgPopup.src = e.target.src;
        captionPopup.textContent = snapshotTitle.textContent;

    });
    closeImgButton.addEventListener('click', function () {
        formClose(popupImg);
    });
}

initialCards.forEach((item) => {
    const snapshot = snapshotTemplate.content.cloneNode(true);

    snapshot.querySelector('.snapshots__photo').src = item.link;
    snapshot.querySelector('.snapshots__title').textContent= item.name;

    addPopupListeners(snapshot);

    snapshotContainer.prepend(snapshot);
});

const formOpen = popup => {
    popup.classList.add('popup_open');
};

const formClose = popup => {
    popup.classList.remove('popup_open');
};

const formEditSubmitHandler = e => {
    e.preventDefault();

    profileName.textContent = popupName.value;
    profileJob.textContent = popupJob.value;

    formClose(popupEdit);
};

const formAddSubmitHandler = e => {
    e.preventDefault();

    const snapshot = snapshotTemplate.content.cloneNode(true);

    snapshot.querySelector('.snapshots__photo').src = popupImgLink.value;
    snapshot.querySelector('.snapshots__title').textContent= popupImgName.value;

    addPopupListeners(snapshot);

    snapshotContainer.prepend(snapshot);

    formAddEl.reset();

    formClose(popupAdd);
};

function popupEditText() {
    popupName.value = profileName.textContent;
    popupJob.value = profileJob.textContent;
};

editButton.addEventListener('click', function () {
    popupEditText();

    formOpen(popupEdit);
});

addButton.addEventListener('click', function () {
    formOpen(popupAdd);
});

closeEditButton.addEventListener('click', function () {
    formClose(popupEdit);
});

closeAddButton.addEventListener('click', function () {
    formClose(popupAdd);
});

formEditEl.addEventListener('submit', formEditSubmitHandler);

formAddEl.addEventListener('submit', formAddSubmitHandler);