class NewCard extends Popup {
    constructor(element, form) {
        super(element);
        this.form = form;
    }

    open() {
        super.open();
        this.element.addEventListener('click', (event) => {
            if(event.target.classList.contains('popup')){
              event.preventDefault();
              super.close();
            }
        });
    }

}