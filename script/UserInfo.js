class UserInfo {
    constructor(userName, userNameTitle, about, userProfessionTitle, api, popup) {

      this.userName = userName;
      /*
       Можно лучше:
       - Удалить неиспользуемые свойства
      */
      this.userNameTitle = userNameTitle;
      this.about = about;
      this.userProfessionTitle = userProfessionTitle;
      this.api = api;
      this.popup = popup;

    }

  changeUserInfo(name, about) {
        this.userNameTitle.textContent = name;
        this.userProfessionTitle.textContent = about;
  }


  getUserInfo() {
    this.api.getProfileData()
        .then((data) => {
          this.changeUserInfo(data.name, data.about);
        })
        .catch((err) => {
          console.log(err);
        });
  }



    updateUserInfo(userName, about) {
      this.api.sendProfileData(userName.value, about.value)

        .then((data) => {
          this.changeUserInfo(data.name, data.about);
          this.popup.close();
        })
        .catch((err) => {
        console.log('Ошибка. Запрос не выполнен! попробуйте позже.');
      });

    }
}
