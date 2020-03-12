'use strict';
let form = document.querySelector('.form');
let btn = document.querySelector('.form__btn');
let input = document.querySelector('.form__value');
let formUpload = document.querySelector('.form-upload');
const URL_ACTION = 'https://localhost:44360/Home/table/?'

input.addEventListener('change', function () {
    form.setAttribute('action', URL_ACTION + 'page=1&' + 'size=' + input.value);
    form.querySelector('.form__current-value').innerText = input.value;
    form.submit();
});

formUpload.addEventListener('change', function () {
    console.log(formUpload.files[0]);
    //document.querySelector('.form-upload__filename').innerText = formUpload.files[0].name;
});