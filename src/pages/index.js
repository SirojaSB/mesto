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
    editButton,
    popupEditSelector,
    popupAddSelector,
    popupImgSelector,
    addButton,
    profileName,
    formEditEl,
    formAddEl,
    profileJob,
    popupName,
    popupJob,
    snapshotContainer,
    submitEditButton,
    submitAddButton,
} from "../utils/constants.js";

function cardOpen(title, src) {
    popupImg.open(title, src);
}

function createCard(data) {
    const card = new Card(data, '.snapshots__template', cardOpen);

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

const formEditSubmitHandler = (values) => {
    userInfo.setUserInfo(values)

    popupEdit.close();
};

const formAddSubmitHandler = (values) => {
    const cardCreateFull = createCard(values);

    cardList.setItem(cardCreateFull);

    addFormValidate.inactiveButtonState(submitAddButton, validationEnable);

    popupAdd.close();
};

editButton.addEventListener('click', function () {
    const info = userInfo.getUserInfo();
    popupName.value = info.name;
    popupJob.value = info.job;

    editFormValidate.resetInputError(formEditEl, validationEnable);

    editFormValidate.activeButtonState(submitEditButton, validationEnable);

    popupEdit.open();
});

addButton.addEventListener('click', function () {
    popupAdd.open();
});

const userInfo = new UserInfo({
    userName: profileName,
    userJob: profileJob,
})

const popupImg = new PopupWithImage(popupImgSelector);
popupImg.setEventListeners();

const popupAdd = new PopupWithForm(popupAddSelector, formAddSubmitHandler);
popupAdd.setEventListeners();

const popupEdit = new PopupWithForm(popupEditSelector, formEditSubmitHandler);
popupEdit.setEventListeners();

const addFormValidate = new FormValidator(validationEnable, formAddEl);
addFormValidate.enableValidation();

const editFormValidate = new FormValidator(validationEnable, formEditEl);
editFormValidate.enableValidation();
