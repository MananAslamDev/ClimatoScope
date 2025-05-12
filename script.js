const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const APIKey = "18ec1827e67fd86de0feb4a7e4a63cf2";
  const city = document.querySelector(".search-box input").value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img"); // Fixed selector
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].description.toLowerCase()) {
        case "clear sky":
          image.src = "Pictures/sunny.png";
          break;
        case "few clouds":
          image.src = "Pictures/fewClouds.png";
          break;
        case "scattered clouds":
          image.src = "Pictures/cloudy.png";
          break;
        case "broken clouds":
          image.src = "Pictures/brokenClouds.png";
          break;
        case "overcast clouds":
          image.src = "Pictures/overcastClouds.png";
          break;
        case "light rain":
        case "moderate rain":
        case "heavy intensity rain":
          image.src = "Pictures/rain.png";
          break;
        case "snow":
          image.src = "Pictures/snow.png";
          break;
        case "haze":
          image.src = "Pictures/haze.png";
          break;
        case "thunderstorm":
          image.src = "Pictures/thunderstorm.png";
          break;
        case "smoke":
          image.src = "Pictures/smoke.png";
          break;
        case "dust":
          image.src = "Pictures/dust.png";
          break;
        default:
          image.src = "";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    });
});
