export function displayWeatherForecast(weather) {
    let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let save = [];

    let location = document.getElementById("locationName");
    location.textContent = weather.city.name;

    for(let i of weather.list){
        let UtcTime = new Date(i.dt_txt)
        let localeTime = new Date(UtcTime.getTime() + weather.city.timezone * 1000);
        if(localeTime.getDate() !== save[0]){
            save.unshift(localeTime.getDate()); 
            let allDays = document.getElementsByClassName("all-days")[0];
            let day = document.createElement("div");
            day.classList.add("weather");
            day.innerHTML = `
                <p><i class="fa-solid fa-calendar-days"></i>${weekdays[localeTime.getDay()]}, ${localeTime.getDate()}, ${months[localeTime.getMonth()]}, ${localeTime.getFullYear()}</p>
                <div class="hourly-forecast">
                <div class="card">
                    <p>${localeTime.getHours()}</p>
                    <i class="fa-solid fa-cloud"></i>
                    <p>${(i.main.temp - 273.15).toFixed(2)}&deg;C</p>
                </div>            
                </div>`
            allDays.appendChild(day);      
        }     
    }
}