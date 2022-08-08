export default class UserInfo {
    constructor({userName, userJob, userAvatar}) {
        this._userName = document.querySelector(userName);
        this._userJob = document.querySelector(userJob);
        this._userAvatar = document.querySelector(userAvatar);
    }

    getUserInfo() {
        const fullUserInfo = {
            name: this._userName.textContent,
            about: this._userJob.textContent,
            avatar: this._userAvatar.src
        };

        return fullUserInfo;
    }

    setUserAvatar(data) {
        if (data.avatar) {
            this._userAvatar.src = data.avatar;
        }
    }

    setUserInfo(data) {
        if (data.name) {
            this._userName.textContent = data.name;
        }
        if (data.about) {
            this._userJob.textContent = data.about;
        }
        if (data.avatar) {
            this._userAvatar.src = data.avatar;
        }
    }
}