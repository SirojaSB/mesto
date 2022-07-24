import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popup, formSubmitHandler) {
        super(popup);
        this._formSubmitHandler = formSubmitHandler;
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = this._popup.querySelectorAll('.popup__input');
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

            this.close();
        });
    }

    close() {
        super.close();

        this._form.reset();
    }
}