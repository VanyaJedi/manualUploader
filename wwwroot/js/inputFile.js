'use strict';

{
    let formInput = document.querySelector('.form-upload__input');
  
    formInput.addEventListener('change', function () {
        console.log(1);
        document.querySelector('.form-upload__filename').innerText = formInput.files[0].name;
    });
}