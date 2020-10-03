/* Переменные   */
(function() {

const formAdd = document.forms.new;
const name = formAdd.elements.name;
const link = formAdd.elements.link;
const cardsList = document.querySelector('.places-list');
const popupPhoto = document.querySelector('.popup_photo');
const popupAdd = document.querySelector('.popup_add');
const userNameTitle = document.querySelector('.user-info__name');
const userProfessionTitle = document.querySelector('.user-info__job');
const popupEdit = document.querySelector('.popup_edit');
const formUser = document.forms.user;
const userName = formUser.elements.username;
const about = formUser.elements.about;

const api = new Api({
  baseUrl: 'https://praktikum.tk/cohort12',
  headers: {
    authorization: 'c77bfe9f-dc79-46a2-a314-5ee92c97d573',
    'Content-Type': 'application/json'
  }
});
const photoPopup = new PhotoPopup(popupPhoto);
const createCard = (name, link) => new Card(name, link, photoPopup);
const cardList = new CardList(cardsList, createCard, api);

cardList.loadInitialCards();

const popup = new Popup(popupAdd);
const popupUserInfo = new Popup(popupEdit);
const userInfo = new UserInfo(userName, userNameTitle, about, userProfessionTitle, api, popupUserInfo);
const userPopup = new UserPopup(popupEdit, userName, userNameTitle, about, userProfessionTitle, userInfo, api)
const addCardPopup = new NewCard(popupAdd, formAdd);
/*
  Можно лучше:
  - Назвать класс используя Popup, так как NewCard является сущностью Popup.
*/

const userInfoPopupValidation = new FormValidator(popupEdit);
const addCardPopupValidation = new FormValidator(popupAdd);

userInfo.getUserInfo();

document.addEventListener('click', (event) => {
  if(event.target.classList.contains('user-info__plus-button')) {
    addCardPopup.open();
    addCardPopupValidation.setSubmitButtonState();
  }
});

document.addEventListener('click', (event) => {
  if(event.target.classList.contains('user-info__edit-button')) {
    userPopup.setUserInfo();
    userInfoPopupValidation.setSubmitButtonState();
  }
});



formAdd.addEventListener('submit', (event) => {
  event.preventDefault();
  cardList.addCard(name.value, link.value);
  formAdd.reset();
  popup.close();
})


})();

/*
 Что понравилось:
 - Реализованы все классы
 - Порядок в index.js и в коде в целом
 - Правильная обработка ошибок api
 Можно лучше:
 - Реализовать дополнительные методы в api для:
  - Добавления карточки
  - Установки/снятия лайка
  - Добавления аватарки
*/
