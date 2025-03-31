export function displayWeatherForecast(weather) {
    let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let save = [];

    let locations = document.getElementsByClassName("locations")[0];
    let location = document.createElement("span");
    location.id = `${weather.city.coord.lat}-${weather.city.coord.lon}`;
    location.classList.add("focus");
    location.innerHTML = `<p><i class="fa-solid fa-location-dot"></i> ${weather.city.name}, ${weather.city.country}</p>`;
    locations.prepend(location);

    let cities = document.getElementsByClassName("cities")[0];
    let allDay = document.createElement("div");
    allDay.classList.add("all-days", `${weather.city.coord.lat}-${weather.city.coord.lon}`);
    cities.prepend(allDay);

    for(let i of weather.list){
        let UtcTime = new Date(i.dt_txt)
        let localeTime = new Date(UtcTime.getTime() + weather.city.timezone * 1000);
        if(localeTime.getDate() !== save[0]){
            save.unshift(localeTime.getDate()); 
            let allDays = document.getElementsByClassName(`${weather.city.coord.lat}-${weather.city.coord.lon}`)[0];
            let day = document.createElement("div");
            day.classList.add(`weather`);
            day.innerHTML = `
                <p class="date"><i class="fa-solid fa-calendar-days"></i> ${weekdays[localeTime.getDay()]}, ${localeTime.getDate()}, ${months[localeTime.getMonth()]}, ${localeTime.getFullYear()}</p>
                <div class="hourly-forecast">
                <div class="card">
                    <p>${localeTime.getHours() < 10 ? `0${localeTime.getHours()}:00` : `${localeTime.getHours()}:00`}</p>
                    <p class="pop">${i.pop > 0 ? `${Math.round(i.pop * 100)}%` : ""}</p>
                    <img src="https://openweathermap.org/img/wn/${i.weather[0].icon}@2x.png" alt="${i.weather[0].description}">
                    <p>${Math.round(i.main.temp - 273.15)}&deg;C</p>
                </div>            
                </div>`
            allDays.appendChild(day);      
        }  else {
            let hourlyForecast = document.getElementsByClassName(`${weather.city.coord.lat}-${weather.city.coord.lon}`)[0].lastElementChild.lastElementChild;
            let card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
            <p>${localeTime.getHours() < 10 ? `0${localeTime.getHours()}:00` : `${localeTime.getHours()}:00`}</p>
            <p class="pop">${i.pop > 0 ? `${Math.round(i.pop * 100)}%` : ""}</p>
            <img src="https://openweathermap.org/img/wn/${i.weather[0].icon}@2x.png" alt="${i.weather[0].description}">
            <p>${Math.round(i.main.temp - 273.15)}&deg;C</p>`
            hourlyForecast.appendChild(card);
        }   
    }
}

export function changeDisplay(id) {
    let previousSelectedLocation = document.getElementsByClassName("focus")[0];
    if(id !== previousSelectedLocation.id) {
        previousSelectedLocation.classList.replace("focus", "unfocus");
        document.getElementsByClassName(`${previousSelectedLocation.id}`)[0].style.display = "none";
        let newSelectedLocation = document.getElementById(id);
        newSelectedLocation.classList.replace("unfocus", "focus");
        document.getElementsByClassName(id)[0].style.display = "block";
    } 
}