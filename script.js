const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
    const APIKey = '18ec1827e67fd86de0feb4a7e4a63cf2';
    const city = document.querySelector(".search-box input").value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img'); // Fixed selector
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                    case 'Clear':
                    image.src = 'Pictures/sunny.png';
                        break;
                    case 'Clouds':
                    image.src = 'Pictures/cloudy.png';
                        break;
                    case 'Rain':
                        image.src = 'Pictures/rain.png';
                        break;
                    case 'Snow':
                        image.src = 'Pictures/snow.png';
                        break;
                    case 'Haze':
                        image.src = 'Pictures/haze.png';
                        break;
                    case 'Thunderstorm':
                        image.src = 'Pictures/thunderstorm.png';
                        break;
                    case 'Smoke':
                        image.src = 'Pictures/smoke.png';
                        break;
                    case 'Dust':
                        image.src = 'Pictures/dust.png';
                        break;
                    case 'Overcast Clouds':
                        image.src = 'Pictures/overcastClouds.png';
                        break;
                    case 'Broken Clouds':
                        image.src = 'Pictures/brokenClouds.png';
                        break;
                    case 'Few Clouds':
                        image.src = 'Pictures/fewClouds.png';
                        break;
                    default:
                        image.src = '';
                }
    
                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                description.innerHTML = `${json.weather[0].description}`;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;
    
                weatherBox.style.display = '';
                weatherDetails.style.display = '';
                weatherBox.classList.add('fadeIn');
                weatherDetails.classList.add('fadeIn');
                container.style.height = '590px';
            });
    });
