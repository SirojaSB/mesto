import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._image = this._popupSelector.querySelector('.popup__image');
        this._title = this._popupSelector.querySelector('.popup__caption');
    }

    open(title, src) {
        this._image.src = src;
        this._image.alt = title;
        this._title.textContent = title;

        super.open();
    }
}