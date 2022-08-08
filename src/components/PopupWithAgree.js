import Popup from "./Popup.js";

export default class PopupWithAgree extends Popup {
    constructor(popup, formSubmitHandler) {
        super(popup);
        this._formSubmitHandler = formSubmitHandler;
        this._form = this._popup.querySelector('.popup__form');
    }

    open(item) {
        this._card = item;

        super.open();
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            this._formSubmitHandler(this._card);
        });
    }
}