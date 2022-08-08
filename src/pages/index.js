import './index.css';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithAgree from "../components/PopupWithAgree.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { Card } from "../components/Сard.js";
import { FormValidator } from "../components/FormValidator.js";
import Api from "../components/Api.js";
import {
    validationEnable,
    buttonEdit,
    buttonAdd,
    formEditEl,
    formAddEl,
    popupName,
    popupJob,
    snapshotContainer,
    buttonAvatar,
    formEditAvatar,
} from "../utils/constants.js";

function openCard(title, src) {
    popupImg.open(title, src);
}

function createCard(data) {
    const card = new Card({
        name: data.name,
        link: data.link,
        id: data._id,
        userId,
        ownerId: data.owner._id,
        likes: data.likes
    }, '.snapshots__template',
        openCard,
        () =>{popupAgree.open(card)},
        async () =>{
            try {
                const res = await api.likeCard(data._id);

                card.handleLike();

                card.setNumLikes(res);
            }
            catch (err) {
                console.log(err)
            }
        },
        async () =>{
            try {
                const res = await api.dislikeCard(data._id);

                card.handleDislike();

                card.setNumLikes(res);
            }
            catch (err) {
                console.log(err)
            }
        });

    return card.makeCard();
}

const cardList = new Section({
    renderer: (data) => {
        const card = createCard(data);
        cardList.setItem(card);
    }
}, snapshotContainer);

async function handleFormEditSubmit(values) {
    popupEdit.renderLoading(true, 'Сохранение...');
    try {
        const res = await api.changeUserInfo(values);

        userInfo.setUserInfo(res);

        popupEdit.close();
    }
    catch (err) {
        console.log(err)
    }
    finally {
        popupEdit.renderLoading(false, 'Сохранить');
    }
};

async function handleFormAddSubmit(values) {
    popupAdd.renderLoading(true, 'Создание...');
    try{
        const res = await api.postCard(values);

        const cardCreateFull = createCard(res);

        cardList.setItem(cardCreateFull);

        popupAdd.close();
    }
    catch (err) {
        console.log(err)
    }
    finally {
        popupAdd.renderLoading(false, 'Создать');
    }
};

async function handleFormEditAvatarSubmit(value) {
    popupAvatar.renderLoading(true, 'Сохранение...');
    try{
        const res = await api.changeUserAvatar(value);

        userInfo.setUserAvatar(res);

        popupAvatar.close();
    }
    catch (err) {
        console.log(err)
    }
    finally {
        popupAvatar.renderLoading(false, 'Сохранить');
    }
}

async function handleFormAgreeSubmit(item) {
    try {
        await api.deleteCard(item._cardId);

        item.handleDel();

        popupAgree.close();
    }
    catch (err) {
        console.log(err)
    }
}

buttonEdit.addEventListener('click', function () {
    const info = userInfo.getUserInfo();
    popupName.value = info.name;
    popupJob.value = info.about;
    buttonAvatar.src = info.avatar;

    formEditValidate.resetInputError();

    formEditValidate.activeButtonState();

    popupEdit.open();
});

buttonAdd.addEventListener('click', function () {
    formAddValidate.inactiveButtonState();

    popupAdd.open();
});

buttonAvatar.addEventListener('click', function (){
    formEditAvatarValidate.inactiveButtonState();

    popupAvatar.open();
})

const userInfo = new UserInfo({
    userName: '.profile__name',
    userJob: '.profile__job',
    userAvatar: '.profile__avatar',
});

const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-47",
    headers: {
        authorization: "a1ba6609-63d0-4b36-839d-98a53999afe1",
        "Content-Type": "application/json",
    }
})

let userId

Promise.all([
    api.getCards(),
    api.getUserInfo(),
])
    .then(([cards, userData]) =>{
        userId = userData._id;
        cardList.renderItems(cards.reverse());
        userInfo.setUserInfo(userData);
    })
    .catch((err) =>{
        console.log(err);
    })

const popupImg = new PopupWithImage('#popup-img');
popupImg.setEventListeners();

const popupAdd = new PopupWithForm('#popup-add', handleFormAddSubmit);
popupAdd.setEventListeners();

const popupEdit = new PopupWithForm('#popup-edit', handleFormEditSubmit);
popupEdit.setEventListeners();

const popupAvatar = new PopupWithForm('#popup-avatar', handleFormEditAvatarSubmit);
popupAvatar.setEventListeners();

const popupAgree = new PopupWithAgree('#popup-agree', handleFormAgreeSubmit);
popupAgree.setEventListeners();

const formAddValidate = new FormValidator(validationEnable, formAddEl);
formAddValidate.enableValidation();

const formEditValidate = new FormValidator(validationEnable, formEditEl);
formEditValidate.enableValidation();

const formEditAvatarValidate = new FormValidator(validationEnable, formEditAvatar);
formEditAvatarValidate.enableValidation();