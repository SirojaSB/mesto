export default class UserInfo {
    constructor({userName, userJob}) {
        this._userName = userName;
        this._userJob = userJob;
    }

    getUserInfo() {
        const fullUserInfo = {
            name: this._userName.textContent,
            job: this._userJob.textContent,
        };

        return fullUserInfo;
    }

    setUserInfo(fullUserInfo) {
        this._userName.textContent = fullUserInfo.name;
        this._userJob.textContent = fullUserInfo.job;
    }
}