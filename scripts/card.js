export class Card {
    constructor(data, cardSelector, cardOpen) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._cardOpen = cardOpen;
    }

    _addPopupListeners() {
        this._cardElement.querySelector('.snapshots__like').addEventListener('click', (e) => {
            e.target.classList.toggle('snapshots__like_active');
        });

        this._cardElement.querySelector('.snapshots__delete').addEventListener('click', (e) => {
            const card = e.target.closest('.snapshots__element');
            card.remove();
        });

        this._cardElement.querySelector('.snapshots__photo').addEventListener('click',  () => {
            this._cardOpen(this._name, this._link);
        });
    }

    makeCard() {
        this._cardElement = document.querySelector(this._cardSelector).content.cloneNode(true);

        this._cardElement.querySelector('.snapshots__photo').src = this._link;
        this._cardElement.querySelector('.snapshots__photo').alt= this._name;
        this._cardElement.querySelector('.snapshots__title').textContent= this._name;

        this._addPopupListeners();

        return this._cardElement;
    }
}