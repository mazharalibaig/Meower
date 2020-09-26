// const { response } = require("express");
console.log("Hello World!!");

var none = "none";
var empty = "";

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const API_URL = 'http://localhost:5000/mews';

loadingElement.style.display = none;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');
    console.log("Form was submitted");

    const mew = {
        name,
        content
    }   

    form.style.display = none;
    loadingElement.style.display = '';

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(mew),
        headers: {
            'content-type': 'application/json'
        }
    }).then((response => response.json()))
        .then(createdMew => {
            console.log(createdMew);
        });

    // console.log(loadingElement.style.display);

    // console.log(mew);
});