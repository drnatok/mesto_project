class Api {
    constructor(options) {
        this.options = options;
    }

    getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

    //Получение карточек с сервера
    getInitialCards() {
        return fetch(`${this.options.baseUrl}/cards`, {
            headers: this.options.headers,
            method: 'GET'
        })
        .then((res) => this.getResponseData(res));
    }

    //Получение инфо о юзере с сервера
    getProfileData() {
        return fetch(`${this.options.baseUrl}/users/me`, {
            headers: this.options.headers,
            method: 'GET'
        })
        .then((res) => this.getResponseData(res));
    }

    //отправка на сервер обновленной информации о юзере
    sendProfileData(name, about) {
        return fetch(`${this.options.baseUrl}/users/me`, {
            headers: this.options.headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
                about: about
            })

        })
        .then((res) => this.getResponseData(res))
    }
}
