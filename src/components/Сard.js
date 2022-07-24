export class Card {
    constructor(data, cardSelector, cardOpen) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._cardOpen = cardOpen;
    }

    _addPopupListeners() {
        this._buttonLike = this._cardElement.querySelector('.snapshots__like');
        this._buttonDelete = this._cardElement.querySelector('.snapshots__delete');

        this._buttonLike.addEventListener('click', () => {
            this._handleLikeClick()
        });

        this._buttonDelete.addEventListener('click', () => {
            this._handleDel()
        });

        this._cardImage.addEventListener('click',  () => {
            this._cardOpen(this._name, this._link);
        });
    }

    _handleDel() {
        this._cardElement.remove();
        this._cardElement = null;
    }

    _handleLikeClick() {
        this._buttonLike.classList.toggle('snapshots__like_active');
    }

    makeCard() {
        this._cardElement = document.querySelector(this._cardSelector)
            .content
            .querySelector('.snapshots__element')
            .cloneNode(true);

        this._cardImage = this._cardElement.querySelector('.snapshots__photo');
        this._cardImage.src = this._link;
        this._cardImage.alt= this._name;
        this._cardElement.querySelector('.snapshots__title').textContent= this._name;

        this._addPopupListeners();

        return this._cardElement;
    }
}