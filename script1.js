const cloudOutPut = document.querySelector(".cloud");
const humidityOutPut = document.querySelector(".humidity");
const windOutPut = document.querySelector(".wind");
const form = document.querySelector(".locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");
const conditionOutPut = document.querySelector(".condition");
const dateOutPut = document.querySelector(".date");
const timeOutPut = document.querySelector(".time");
const nameOutPut = document.querySelector(".name");
const icon = document.querySelector(".icon")
let cityInput;
// window.addEventListener("load", () => {
//     konumSorgulama();
// })
// function konumSorgulama(){
// navigator.geolocation.getCurrentPosition(success, fail);

// }
// function success (pos) {
//    cityInput = pos;
// }
// function fail (err) {
    
// }

cities.forEach((city) => {
    city.addEventListener("click", (e) => {
    cityInput = e.target.innerHTML;
    fetchWeatherData();
    // app.style.opacity = "0";
    })
})

form.addEventListener("submit", (e) => {
    if(search.value.length == 0){
        alert("Please enter a city name");
    } else{
        cityInput = search.value;
        fetchWeatherData();
        search.value = "";
        // app.style.opacity = "0";
    }

    e.preventDefault()
})

function dayOfTheWeek(day,month,year) {
    const weekday = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];
    return weekday[new Date(`${day}/${month}/${year}.getDay()`)];
};

function fetchWeatherData () {
fetch('https://api.weatherapi.com/v1/current.json?key=764fc75a90dd4e1584b131541230202=${cityInput}').then(response => response.json()).then(data => {
    console.log(data);
    temp.innerHTML = data.current.temp_c + "&#176;";
    conditionOutPut.innerHTML = data.current.condition.text;

    const date = data.location.localtime;
    const y = parseInt(date.substr(0,4));
    const m = parseInt(date.substr(5,2));
    const d = parseInt(date.substr(8,2));
    const time = date.substr(11);
    dateOutPut.innerHTML = `${dayOfTheWeek(d,m,y)} ${d}, ${m}, ${y}`;
    timeOutPut.innerHTML = time;
    nameOutPut.innerHTML = data.location.name;
    const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
    icon.src = "./icons/" + iconId;

    cloudOutPut.innerHTML = data.current.cloud + "%";
    humidityOutPut.innerHTML = data.current.humidity + "%";
    windOutPut.innerHTML = data.current.wind_kph + "km/h";


    let timeOfDay = "day";
    const code = data.current.condition.code;

    if(!data.current.is_day){
        timeOfDay = "night";
    }

    if(code == 1000){
        app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;

        btn.style.background = "#e5ba92";
        if(timeOfDay == "night"){
            btn.style.background = "#181e27";
        }
    }

    else if(
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1273 ||
        code == 1276 ||
        code == 1279 ||
        code == 1282
    ) {
        app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
        btn.style.background = "#fa6d1b";
        if(timeOfDay == "night"){
            btn.style.background = "#181e27";
        }
        
    } else if(
        code == 1063 ||
        code == 1069 ||
        code == 1072 ||
        code == 1150 ||
        code == 1153 ||
        code == 1180 ||
        code == 1183 ||
        code == 1186 ||
        code == 1189 ||
        code == 1192 ||
        code == 1195 ||
        code == 1204 ||
        code == 1207 ||
        code == 1240 ||
        code == 1243 ||
        code == 1246 ||
        code == 1249 ||
        code == 1252 
    ){
        app.style.backgroundImage = `
        url(./images/${timeOfDay}/rainy.jpg)`;
        btn.style.background = "#647d75";
        if(timeOfDay == "night"){
            btn.style.background ="#325c80";
        }

    } else{
        app.style.backgroundImage = `
        url(./images/${timeOfDay}/snowy.jpg)`;
        btn.style.background = "#4d72aa";
        if(timeOfDay == "night"){
            btn.style.background = "#1b1b1b";
        }
    }
    app.style.opacity = "1";
})
.catch(() => {
    alert("City not found, please try again");
    app.style.opacity = "1";
})
}

fetchWeatherData();

app.style.opacity = "1";

