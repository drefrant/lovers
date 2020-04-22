
const info = document.querySelector('#info');
const yourNameInput = document.querySelector('#your-name');
//const yourBirthdayInput = document.querySelector('#your-birthday');
const theirNameInput = document.querySelector('#their-name');
//const theirBirthdayInput = document.querySelector('#their-birthday');
const messageOne = document.querySelector('.message-1');
const messageTwo = document.querySelector('.message-2');

info.addEventListener('submit', (e) => {
    e.preventDefault();

    const yourName = yourNameInput.value;
    //const yourBirthday = yourBirthdayInput.value;
    const theirName = theirNameInput.value;
    //const theirBirthday = theirBirthdayInput.value;

    messageOne.textContent = 'Loading..';

    const data = {
        yourName,
        theirName
    }

    fetch('/lovers', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        response.json()
        .then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.percentage + ' %';
                messageTwo.textContent = data.result;
            }
        })
    })
})
