function weatherCity(event){
  event.preventDefault();
  let cityInput=document.querySelector("#entry-search");
  apiSearch(cityInput.value);
}
let form=document.querySelector("#inquiry-form");
form.addEventListener("submit", weatherCity);

function apiSearch(city){
  let apiKey= "2a73b3dbc21aoe20a5dfta3e447dfa66";
  let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(displayWeather);
}
apiSearch("Nairobi"); //default city with correct temperature

function displayWeather(response){
  let city=document.querySelector("h1");
  city.innerHTML=response.data.city;
  let degree=document.querySelector("#degree");
  let temperature=Math.round(response.data.temperature.current)
  degree.innerHTML=temperature;

  let humidity=document.querySelector("#humidity");
  humidity.innerHTML=`${response.data.temperature.humidity}%`;
  let windspeed=document.querySelector("#windspeed");
  windspeed.innerHTML=`${response.data.wind.speed}km/h`;
  let description=document.querySelector("#description");
  description.innerHTML=response.data.condition.description;
  let icon=document.querySelector("#weather-icon");
  icon.innerHTML=`<img src=${response.data.condition.icon_url} alt=${response.data.condition.icon}>`;

  let date=new Date();
  let dayInfo=document.querySelector("#dayInfo");
  dayInfo.innerHTML=displayDay(date);

  let time=document.querySelector("#time");
  time.innerHTML=displayTime(date);
}

function displayDay(info){
 let today=info.getDay();
 let days=["Sunday", "Monday","Tuesday","Wednsday","Thursday","Friday","Saturday"];
 today=days[info.getDay()];
 return today;
}

function displayTime(info){
  let hours=info.getHours().toString().padStart(2, "0");
  let minutes=info.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}

function displayForecast(){
let forecast=document.querySelector("#forecast");
let days=["Tue", "Wed", "Thur", "Fri", "Sat"];
let forecastHtml= "";

days.forEach( function (day){
forecastHtml +=
 `<div class="forecast-details">
    ${day} <br />
    🌦 <br />
    <span class="max-temp">17°C</span>
    <span class="min-temp">12°C</span>
  </div>` }
);
forecast.innerHTML=forecastHtml;
}

displayForecast();