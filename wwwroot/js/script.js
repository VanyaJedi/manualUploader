'use strict';
let form = document.querySelector('.form');
let btn = document.querySelector('.form__btn');
let input = document.querySelector('.form__value');
let formUpload = document.querySelector('.form-upload');
let formInput = document.querySelector('.form-upload__input');
const URL_ACTION = 'https://localhost:44360/Home/table/?';
const VALUE_ACCEPT = [10, 20, 50, 100];
const RESPONSE_TYPE = 'json';
const RESPONSE_STATUS_SUCCESS = 200;

if (input) {
    input.addEventListener('change', function () {
        form.setAttribute('action', URL_ACTION + 'page=1&' + 'size=' + input.value);
        form.querySelector('.form__current-value').innerText = input.value;
        //form.submit();
    });
}

if (formInput) {
    formInput.addEventListener('change', function () {
        document.querySelector('.form-upload__filename').innerText = formInput.files[0].name;
    });
}

function checkInputValue(val) {
    if (VALUE_ACCEPT.includes(val)) {
        return '';     
    }
    return 'Введите верное значение'
}

let responseToServer = function (url, type, data, timeout, onLoad, onError) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;

    xhr.addEventListener('load', function () {
        if (xhr.status === RESPONSE_STATUS_SUCCESS) {
            onLoad(xhr.response);
        } else if (onError) {
            onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
    });

    if (onError) {
        xhr.addEventListener('error', function () {
            onError('Произошла ошибка соединения');
        });

        xhr.addEventListener('timeout', function () {
            onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
        });
    }

    xhr.timeout = timeout;

    xhr.open(type, url);
    xhr.send(data || {});
};

let showData = function (response) {
    console.log(response);
}

let showError = function (errorMessage) {
    alert(errorMessage);
}

form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    responseToServer('https://localhost:44360/Home/RetrieveData?page=1&size=10', 'GET', {}, 10000, showData, showError); 
});