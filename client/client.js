console.log("Hello World!!");

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');

var none = "none";
var empty = "";

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

    console.log(loadingElement.style.display);

    console.log(mew);
});