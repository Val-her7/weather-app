export function displayWeatherForecast(weather) {
    let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let save = [];

    let location = document.getElementById("locationName");
    location.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${weather.city.name}`;

    for(let i of weather.list){
        let UtcTime = new Date(i.dt_txt)
        let localeTime = new Date(UtcTime.getTime() + weather.city.timezone * 1000);
        if(localeTime.getDate() !== save[0]){
            save.unshift(localeTime.getDate()); 
            let allDays = document.getElementsByClassName("all-days")[0];
            let day = document.createElement("div");
            day.classList.add(`weather`);
            day.innerHTML = `
                <p><i class="fa-solid fa-calendar-days"></i>${weekdays[localeTime.getDay()]}, ${localeTime.getDate()}, ${months[localeTime.getMonth()]}, ${localeTime.getFullYear()}</p>
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
            let hourlyForecast = document.getElementsByClassName("all-days")[0].lastElementChild.lastElementChild;
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