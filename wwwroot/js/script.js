'use strict';
let form = document.querySelector('.form');
let btn = document.querySelector('.form__btn');
let input = document.querySelector('.form__value');
const URL_ACTION = 'https://localhost:44360/Home/table/?'

input.addEventListener('change', function () {
    form.setAttribute('action', URL_ACTION + 'page=1&' + 'size=' + input.value);
    form.submit();
})