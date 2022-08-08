export class Card {
    constructor(data, cardSelector, cardOpen, agreeOpen, likeCard, dislikeCard) {
        this._name = data.name;
        this._link = data.link;
        this._userId = data.userId;
        this._ownerId = data.ownerId;
        this._cardSelector = cardSelector;
        this._cardOpen = cardOpen;
        this._agreeOpen = agreeOpen;
        this._cardId = data.id;
        this._likeCard = likeCard;
        this._dislikeCard = dislikeCard;
        this._likes = data.likes;
    }

    _addPopupListeners() {
        this._buttonLike = this._cardElement.querySelector('.snapshots__like');

        this._buttonLike.addEventListener('click', () => {
            if (this._buttonLike.classList.contains('snapshots__like_active')) {
                this._dislikeCard(this._cardId);
            } else {
                this._likeCard(this._cardId);
            }
        });

        this._cardImage.addEventListener('click',  () => {
            this._cardOpen(this._name, this._link);
        });

        this._buttonDelete.addEventListener('click', () => {
            this._agreeOpen(this._cardId)
        });
    }

    _deleteButton() {

        if (this._userId !== this._ownerId) {
            this._buttonDelete.remove();
            this._buttonDelete = null;
        }
    }

    handleDel() {
        this._cardElement.remove();
        this._cardElement = null;
    }

    _isLiked() {
        this._likes.forEach((user) => {
            if (user._id === this._userId) {
                this.handleLike();
            } else {
                this.handleDislike();
            }
        });
    }

    handleLike() {
        this._buttonLike.classList.add('snapshots__like_active');
    }

    handleDislike() {
        this._buttonLike.classList.remove('snapshots__like_active');
    }

    setNumLikes(res) {
        this._numLikes.textContent = `${res.likes.length}`;
    }

    makeCard() {
        this._cardElement = document.querySelector(this._cardSelector)
            .content
            .querySelector('.snapshots__element')
            .cloneNode(true);

        this._buttonDelete = this._cardElement.querySelector('.snapshots__delete');
        this._numLikes = this._cardElement.querySelector('.snapshots__num-like');
        this._cardImage = this._cardElement.querySelector('.snapshots__photo');
        this._cardImage.src = this._link;
        this._cardImage.alt= this._name;
        this._cardElement.querySelector('.snapshots__title').textContent= this._name;

        this._addPopupListeners();

        this._numLikes.textContent = `${this._likes.length}`;
        this._isLiked();

        this._deleteButton()

        return this._cardElement;
    }
}