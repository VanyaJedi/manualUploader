'use strict';

let table = document.querySelector('.table');
let rowTemplate = document.querySelector('#table-row-template').content.firstElementChild;
let form = document.querySelector('.form');
let btn = document.querySelector('.form__btn');
let input = document.querySelector('.form__value');
let formUpload = document.querySelector('.form-upload');
let formInput = document.querySelector('.form-upload__input');
let changeSizeBtn = document.querySelector('.form__change-size');
let prevBtn = document.querySelector('.form__btn-prev');
let nextBtn = document.querySelector('.form__btn-next');
let radioInputs = document.querySelectorAll('.form__radio');
let pageNum = 1;
const URL_ACTION = 'https://localhost:44360/Home/table/?';
const RESPONSE_TYPE = 'json';
const RESPONSE_STATUS_SUCCESS = 200;
let activeSizeInput = sizeItems;


let checkRightInput = function (inputs) {
    inputs.forEach(function (input) {
        if (parseInt(input.value, 10) == activeSizeInput) {
            input.checked = true;
            return;
        }
    });
};


checkRightInput(radioInputs);

if (formInput) {
    formInput.addEventListener('change', function () {
        document.querySelector('.form-upload__filename').innerText = formInput.files[0].name;
    });
}

if (form) {
    form.addEventListener('submit', function () {
        activeSizeInput = document.querySelector('.form__radio:checked').value;
        form.setAttribute('action', URL_ACTION + 'page=1&' + 'size=' + activeSizeInput);
    });
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

let renderRow = function (dbRow) {
    let rowItem = rowTemplate.cloneNode(true);
    for (let key in dbRow) {
        if (key === 'Id') {
            continue;
        }
        let elem = document.createElement('li');
        elem.innerText = dbRow[key];
        rowItem.appendChild(elem);
    };
    return rowItem;
};

let showData = function (response) {
    let fragmentTable = document.createDocumentFragment();
    table.innerHTML = '';
    for (let i = 0; i < response.length; i++) {
        fragmentTable.appendChild(renderRow(response[i]));
    }
    table.appendChild(fragmentTable);
    document.querySelector('.form__page').innerText = pageNum;
}

let showError = function (errorMessage) {
    alert(errorMessage);
}

prevBtn.addEventListener('click', function () {
    if (pageNum === 1) {
        return;
    } 
    pageNum--;
    responseToServer(`https://localhost:44360/Home/RetrieveData?page=${pageNum}&size=${activeSizeInput}`, 'GET', {}, 10000, showData, showError);
});

nextBtn.addEventListener('click', function () {
    if (pageNum == maxPage) {
        return;
    }
    pageNum++;
    responseToServer(`https://localhost:44360/Home/RetrieveData?page=${pageNum}&size=${activeSizeInput}`, 'GET', {}, 10000, showData, showError); 
});
