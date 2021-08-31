function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours= date.getHours();
    if(hours < 10 ){
        hours = ` 0${hours}:`;
    }
    let minutes= date.getMinutes();
    if(minutes < 10){
        minutes = `0${minutes}`;
    }
    let days=[
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    let day=days[date.getDay()];
    return ` ${day}${hours}${minutes}`;
}



function displayTemperature(response){

let temperatureElement= document.querySelector("#temperature");
let cityElement= document.querySelector("#city"); 

let descriptionElement= document.querySelector("#description");

let humidityElement= document.querySelector("#humidity");

let windElement= document.querySelector("#wind");

let dateElement= document.querySelector("#date");

let iconElement=document.querySelector("#icon");


celsiusTemperature=response.data.main.temp;

temperatureElement.innerHTML=Math.round(celsiusTemperature);
cityElement.innerHTML=response.data.name;
descriptionElement.innerHTML=response.data.weather[0].description;
humidityElement.innerHTML= response.data.main.humidity;
windElement.innerHTML=Math.round(response.data.wind.speed);
dateElement.innerHTML= formatDate(response.data.dt * 1000);
iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt",response.data.weather[0].description);
}

function search(city){

    let apiKey="50d450f200d9a85e6898548597a9f0b0";
    let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);

}




function handleSubmit(event){
event.preventDefault();
let cityInputElement=document.querySelector("#city-input");
search(cityInputElement.value);
}

function displayFarenheitTemperature(event){
    event.preventDefault();
    let temperatureElement=document.querySelector("#temperature");
    // remove the active class the celsius link
    celsiusLink.classList.remove("active");
    farenheitLink.classList.add("active");
    let farenheitTemperature=(celsiusTemperature * 9)/ 5 + 32;
    temperatureElement.innerHTML=Math.round(farenheitTemperature);
}

function displayCelsiusTemperature(event){
    event.preventDefault();
    let temperatureElement=document.querySelector("#temperature");
    celsiusLink.classList.add("active");
    farenheitLink.classList.remove("active");
    temperatureElement.innerHTML=Math.round(celsiusTemperature);
}



let celsiusTemperature= null;

let form= document.querySelector("#search-form");
form.addEventListener("submit",handleSubmit);

let farenheitLink=document.querySelector('#farenheit-link');
farenheitLink.addEventListener("click",displayFarenheitTemperature);


let celsiusLink=document.querySelector('#celsius-link');
celsiusLink.addEventListener("click",displayCelsiusTemperature);



searc("New York");