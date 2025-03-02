console.log('Client side Javascript is loaded!');

const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const msg1 = document.querySelector('#msg-1');
const msg2 = document.querySelector('#msg-2');

weatherForm.addEventListener('submit', ev => {
    ev.preventDefault();
    const location = searchInput.value;
    console.log('testing!', location);
    msg1.textContent = 'Loading forecast...';
    msg2.textContent = '';
    getForecast(location);
});
msg1.textContent = 'From Javascript';

const getForecast = (location) => {
    fetch(`http://localhost:3000/weather?address=${location}`)
    .then((response) => response.json())
    .then((data) => {
        if (data.error) {
            console.log(data.error);
            msg1.textContent = '';
            msg2.textContent = data.error;
        } else {
            const { location, forecast } = data;
            console.log(location,forecast);
            msg1.textContent = `${location}'s weather forecast: `;
            msg2.textContent = forecast;
        }
    });
};

