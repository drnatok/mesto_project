class UserPopup extends Popup{
    constructor(element, userName, userNameTitle, about, userProfessionTitle, userInfo, api) {
        super(element);
        this.userName = userName;
        this.userNameTitle = userNameTitle;
        this.about = about;
        this.userProfessionTitle = userProfessionTitle;
        this.userInfo = userInfo;
        this.api = api;
}

    setUserInfo() {
        this.userName.value = this.userNameTitle.textContent;
        this.about.value = this.userProfessionTitle.textContent;
        super.open();
        this.element.addEventListener('click', (event) => {
            if(event.target.classList.contains('popup__button') || event.type === 'submit'){
            event.preventDefault();
            this.userInfo.updateUserInfo(this.userName, this.about)
            /*
             Надо исправить:
             - Модальное окно закроется даже если запрос не выполнится +
            */
        }
            else if (event.target.classList.contains('popup')) {
            super.close();
        };
    });
  }

}
