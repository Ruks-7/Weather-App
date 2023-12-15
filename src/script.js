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
}

