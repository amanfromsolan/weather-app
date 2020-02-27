
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const successMessageContainer = document.querySelector('#success-message-container');
const successMessageLocation = document.querySelector('#success-message-location');
const successMessageForecast = document.querySelector('#success-message-forecast');
const successMessageEmoji = document.querySelector('#success-message-emoji');

const errorMessageContainer = document.querySelector('#error-message-container');
const errorMessage = document.querySelector('#error-message');
const errorMessageEmoji = document.querySelector('#error-message-emoji');

errorMessageContainer.style.display = 'none';
successMessageContainer.style.display = 'none';


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  successMessageContainer.style.display = 'flex';
  successMessageLocation.textContent = '';
  successMessageForecast.textContent = 'loading...';
  successMessageEmoji.textContent = '🧑‍💻';


  const location = search.value;

  fetch('/weather?address=' + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        successMessageContainer.style.display = 'none';
        errorMessageContainer.style.display = 'flex';
        errorMessage.textContent = data.error;
      } else {
        errorMessageContainer.style.display = 'none';
        successMessageContainer.style.display = 'flex';

        successMessageLocation.textContent = data.location;
        successMessageForecast.textContent = data.forecast;

        successMessageEmoji.textContent = '🌤';

      }
    });
  });

})