window.addEventListener('load', () => {
    let long, lat, tempDescription, tempDegree, locationTimezone, tempIcon, temperatureSection, temperatureSpan;

    tempDescription = document.querySelector(".temperature-description");
    tempDegree = document.querySelector(".temperature-degree");
    locationTimezone = document.querySelector(".location-timezone");
    tempIcon = document.querySelector(".temp-icon");
    temperatureSection = document.querySelector(".degree-wrapper");
    temperatureSpan = document.querySelector(".degree-wrapper span");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(userLocation => {
            long = userLocation.coords.longitude;
            lat = userLocation.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=2865d517f56106720786fe2ecf53fe85`;

            fetch(api)
                .then(response => response.json())
                .then(data => {
                    const { name, main: { feels_like }, weather: [{ id, description }] } = data;
                    const realDegree = Math.floor(feels_like - 273.15);
                    const fahrenheit = (realDegree * 9 / 5) + 32;

                    tempDegree.textContent = realDegree;
                    locationTimezone.textContent = name;
                    tempDescription.textContent = description;

                    if (id < 250) tempIcon.src = './icons/icons8-cloud-lightning-100.png';
                    else if (id < 350) tempIcon.src = './icons/icons8-snow-100.png';
                    else if (id < 550) tempIcon.src = './icons/icons8-rain-100.png';
                    else if (id < 650) tempIcon.src = './icons/icons8-snow-100.png';
                    else if (id < 790) tempIcon.src = './icons/icons8-wind-100.png';
                    else if (id < 810) tempIcon.src = './icons/icons8-partly-cloudy-day-100.png';

                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === 'C') {
                            temperatureSpan.textContent = "F";
                            tempDegree.textContent = Math.round(fahrenheit);
                        } else {
                            temperatureSpan.textContent = "C";
                            tempDegree.textContent = realDegree;
                        }
                    });
                });
        });
    } else {
        alert("Kindly allow location so you can get the weather forecast");
    }
});
