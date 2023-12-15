function weatherCity(event){
  event.preventDefault();
  let city=document.querySelector("h1");
  let cityInput=document.querySelector("#entry-search");
  city.innerHTML=cityInput.value;
}

let form=document.querySelector("#inquiry-form");
form.addEventListener("submit", weatherCity);