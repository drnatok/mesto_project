class PhotoPopup extends Popup{
    constructor(element) {
        super(element);
        this.popupPhotoSrc = document.querySelector('.popup__image');
    }

    open() {
        super.open();
        const imageValue = event.target.attributes.style.value;
        this.popupPhotoSrc.setAttribute('src', imageValue.slice(22,-2));
        this.element.addEventListener('click', (event) => {
            if (event.target.classList.contains('popup')) {
                super.close();
            }
        });
    }

   
} 