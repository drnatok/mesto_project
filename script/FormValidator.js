class FormValidator {
  constructor(popup) {
    this.popup = popup;
    this.form = this.popup.querySelector('form');
    const errorMessages =  this.popup.querySelectorAll('.error-message');

    for(let i = 0; i < errorMessages.length; i++) {
      const errorMessage = errorMessages[i];
      errorMessage.textContent = '';
      errorMessage.classList.remove('popup__error_count');
    };

    this.setEventListeners(this.form);  
    
    
    this.setSubmitButtonState(this.form);
    
  }
   
  setEventListeners(form) {
    const inputs = form.querySelectorAll('input');
      for(let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      const errorMessage = input.nextElementSibling;
      input.addEventListener('input', this.checkInputValidity(input, errorMessage));
      input.addEventListener('input', this.setSubmitButtonState);
    }
  }

  checkInputValidity(input, errorMessage) {
     const validation = function() {

      const inputValueLength = input.value.length;
      const hasErrors = (errorMessage.textContent.length !== 0);
      const isUrl = (input.name === 'link');
      const urlRegExp = new RegExp('^http.', 'gi');
      const errors = {
        valueLengthError: 'Должно быть от 2 до 30 символов',
        noValueError: 'Это обязательное поле',
        urlValueError: 'Здесь должна быть ссылка'
      }
        
        if(isUrl) {
          if(!input.value.match(urlRegExp)) {
            errorMessage.textContent = errors.urlValueError;
            errorMessage.classList.add('popup__error_count');
          }
          if(!inputValueLength) {
            errorMessage.textContent = errors.noValueError;
            errorMessage.classList.add('popup__error_count');
          }
          if(input.value.match(urlRegExp)) {
            if(hasErrors) {
              errorMessage.textContent = '';
              errorMessage.classList.remove('popup__error_count');
            }
          }
        } else {
          // можно лучше: Для валидации используйте кастомный метод validation
          // https: //developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation#Constraint_API%27s_element.setCustomValidity() 
          // на русском https: //msiter.ru/tutorials/javascript/js_validation 
          // на русском https://htmlacademy.ru/blog/useful/html/form-validation-techniques 
          // на английском очень хорошая статья с примерами https://css-tricks.com/form-validation-part-2-constraint-validation-api-javascript/ 
          // 
          // как пример, если вы установите  <input type="text" min="10" max="100" >
          // то сразу сможете определить что текст слишком короткий, например так: 
          //  
          // if (validity.tooShort) { 
          // // Значение слишком короткое 
          // }
          // if (validity.tooLong) { 
          // // Значение слишком длинное 
          // }
            if((inputValueLength && inputValueLength < 2) || inputValueLength > 30) {
              errorMessage.textContent = errors.valueLengthError;
                if(!hasErrors) {
                  errorMessage.textContent = errors.valueLengthError;
                  errorMessage.classList.add('popup__error_count');
                }
            }
            if(!inputValueLength) {
              errorMessage.textContent = errors.noValueError;
              if(!hasErrors) {
                errorMessage.textContent = errors.noValueError;
                errorMessage.classList.add('popup__error_count');
              }
            }
            if (inputValueLength >= 2 && inputValueLength < 30) {
              if(hasErrors) {
              errorMessage.textContent = '';
              errorMessage.classList.remove('popup__error_count');
              }
            }
          }
      };
      input.addEventListener('input', validation);

    }

  setSubmitButtonState() {
    const errorMessageCount = this.form.querySelectorAll('.popup__error_count').length;
    const popupSubmitButton = this.form.querySelector('.popup__button');
    const buttonEnabled = (popupSubmitButton.disabled === false);
    const inputs = this.form.querySelectorAll('input');
    let isNotFilled = false;
      
    for(let i = 0; i < inputs.length; i++) {
      if(!inputs[i].value) { isNotFilled = true; }
    }
    if(errorMessageCount > 0 && buttonEnabled) {
      popupSubmitButton.setAttribute('disabled', ' ');
      popupSubmitButton.classList.add('popup__button_disabled');
      return false;
    }
    if(isNotFilled && buttonEnabled) {
      popupSubmitButton.setAttribute('disabled', ' ');
      popupSubmitButton.classList.add('popup__button_disabled');
      return false;
    }
    if(errorMessageCount === 0 && !buttonEnabled && !isNotFilled) {
      popupSubmitButton.removeAttribute('disabled');
      popupSubmitButton.classList.remove('popup__button_disabled');
      return true;
    }
  }
}