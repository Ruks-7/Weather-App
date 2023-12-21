
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
  if(response.data.city===undefined){
    alert("Enter a valid city!");
    preventDefault();
  }
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

  forecastApi(response.data.city);
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

function forecastApi(city){
let apiKey= "2a73b3dbc21aoe20a5dfta3e447dfa66";
let apiUrl=`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;  

axios.get(apiUrl).then(displayForecast);
}

function findDay(time){
 let date=new Date(time*1000);
 let days=["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
 return days[date.getDay()];
}

function displayForecast(response){
let forecast=document.querySelector("#forecast");
let forecastHtml= ""; //concatenation of a string
console.log(response);

response.data.daily.forEach( function (day, index){
if(index <5){
forecastHtml +=
 `<div class="forecast-details">
    ${findDay(day.time)} <br />
    <img class="weather-icon" src=${day.condition.icon_url}> <br />
    <span class="max-temp">${Math.round(day.temperature.maximum)}°</span> 
    <span class="min-temp">${Math.round(day.temperature.minimum)}°</span>
  </div>` }
}
);
forecast.innerHTML=forecastHtml;
}



