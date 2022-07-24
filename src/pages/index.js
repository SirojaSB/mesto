import './index.css';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { Card } from "../components/Сard.js";
import { FormValidator } from "../components/FormValidator.js";
import {
    initialCards,
    validationEnable,
    buttonEdit,
    buttonAdd,
    formEditEl,
    formAddEl,
    popupName,
    popupJob,
    snapshotContainer,
    buttonSubmitEdit,
    buttonSubmitAdd,
} from "../utils/constants.js";

function openCard(title, src) {
    popupImg.open(title, src);
}

function createCard(data) {
    const card = new Card(data, '.snapshots__template', openCard);

    return card.makeCard();
}

const cardList = new Section({
    items: initialCards,
    renderer: (data) => {
        const card = createCard(data);
        cardList.setItem(card);
    }
}, snapshotContainer);

cardList.renderItems();

const handleFormEditSubmit = (values) => {
    userInfo.setUserInfo(values)

    popupEdit.close();
};

const handleFormAddSubmit = (values) => {
    const cardCreateFull = createCard(values);

    cardList.setItem(cardCreateFull);

    popupAdd.close();
};

buttonEdit.addEventListener('click', function () {
    const info = userInfo.getUserInfo();
    popupName.value = info.name;
    popupJob.value = info.job;

    formEditValidate.resetInputError();

    formEditValidate.activeButtonState();

    popupEdit.open();
});

buttonAdd.addEventListener('click', function () {
    formAddValidate.inactiveButtonState();

    popupAdd.open();
});

const userInfo = new UserInfo({
    userName: '.profile__name',
    userJob: '.profile__job',
})

const popupImg = new PopupWithImage('#popup-img');
popupImg.setEventListeners();

const popupAdd = new PopupWithForm('#popup-add', handleFormAddSubmit);
popupAdd.setEventListeners();

const popupEdit = new PopupWithForm('#popup-edit', handleFormEditSubmit);
popupEdit.setEventListeners();

const formAddValidate = new FormValidator(validationEnable, formAddEl);
formAddValidate.enableValidation();

const formEditValidate = new FormValidator(validationEnable, formEditEl);
formEditValidate.enableValidation();
