class Card {

    constructor(name, link, photoPopup) {
      this.remove = this.remove.bind(this);
      this.name = name;
      this.link = link;
      this.photoPopup = photoPopup;
    }

    create(name, link) {

      const cardContainer = document.createElement('div');
      const imageElement = document.createElement('div');
      const deleteButtonElement = document.createElement('button');
      const descriptionElement = document.createElement('div');
      const cardNameElement = document.createElement('h3');
      const likeButtonElement = document.createElement('button');


      cardContainer.classList.add('place-card');
      imageElement.classList.add('place-card__image');
      imageElement.setAttribute('style', 'background-image: url(' + link + ');');
      deleteButtonElement.classList.add('place-card__delete-icon');
      descriptionElement.classList.add('place-card__description');
      cardNameElement.classList.add('place-card__name');
      cardNameElement.textContent = name;
      likeButtonElement.classList.add('place-card__like-icon');


      cardContainer.appendChild(imageElement);
      imageElement.appendChild(deleteButtonElement);
      cardContainer.appendChild(descriptionElement);
      descriptionElement.appendChild(cardNameElement);
      descriptionElement.appendChild(likeButtonElement);

      cardContainer.querySelector('.place-card__like-icon').addEventListener('click', this.like);
      cardContainer.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);

      cardContainer.querySelector('.place-card__image').addEventListener('click', this.photoPopup.open);

      return cardContainer;
    }

    like(event) {
      event.target.classList.toggle('place-card__like-icon_liked');
    }


    remove(event) {
      const cardElement = event.target.closest('.place-card');
      cardElement.remove();

      cardElement.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
      cardElement.querySelector('.place-card__delete-icon').removeEventListener('click', this.remove);
      cardElement.querySelector('.place-card__image').removeEventListener('click', this.photoPopup.open);
    }
  }
