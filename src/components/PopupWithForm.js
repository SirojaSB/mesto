import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmitHandler) {
        super(popupSelector);
        this._formSubmitHandler = formSubmitHandler;
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = this._popup.querySelectorAll('.popup__input');
        this._buttonSubmit = this._form.querySelector('.popup__submit');
    }

    _getInputValues(){
        this._inputValues = {};
        this._inputs.forEach(input => {
            this._inputValues[input.name] = input.value;
        });

        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) =>{
            evt.preventDefault();

            this._formSubmitHandler(this._getInputValues());
        });
    }

    close() {
        super.close();

        this._form.reset();
    }

    renderLoading(isLoading, text) {
        if (isLoading) {
            this._buttonSubmit.textContent = text;
        }   else {
            this._buttonSubmit.textContent = text;
        }
    }
}