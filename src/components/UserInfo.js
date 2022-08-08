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
        this._userAvatar.src = data.avatar;
    }

    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userJob.textContent = data.about;
        this._userAvatar.src = data.avatar;
    }
}