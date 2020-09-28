var none = "none";
var empty = "";

const form = document.querySelector('form');
const mewsElement = document.querySelector('.mews');
const loadingElement = document.querySelector('.loading');
const API_URL = 'http://localhost:5000/mews';

// loadingElement.style.display = none;

function listAllMews()
{
    mewsElement.innerHTML = '';

    fetch(API_URL)
        .then(res => res.json())
        .then( mews => {
            mews.reverse();
            mews.forEach(element => {
                // console.log(element);
                const div  = document.createElement('div');

                const header = document.createElement('h1');

                const content = document.createElement('p');

                const date = document.createElement('small');
                
                date.textContent = new Date(element.created);

                header.textContent = element.name;
                content.textContent = element.content;
                
                div.appendChild(header);
                div.appendChild(content);
                div.appendChild(date);
                
                const br1 = document.createElement('br');
                const br2 = document.createElement('br');

                div.appendChild(br1);
                div.appendChild(br2);

                mewsElement.appendChild(div);
            });
        });
}

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
    })
    .then((response => response.json()))
    .then(createdMew => {
        form.reset();
        console.log(createdMew);
        loadingElement.style.display = none;
        form.style.display = empty;
        listAllMews();
    });
});