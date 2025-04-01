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
    let chartContainer = document.createElement("div");
    chartContainer.classList.add("chart-container");
    let canvaCreation = document.createElement("canvas");
    canvaCreation.classList.add("line-chart");
    canvaCreation.height = 200;
    chartContainer.prepend(canvaCreation);
    let title = document.createElement("p");
    title.classList.add("title");
    title.textContent = "5 Days Forecast Chart";
    allDay.appendChild(title);
    allDay.appendChild(chartContainer);
    
    let data = weather.list;
    let weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let labels = [];
    let temps = [];
    for(let i of data){
        let UtcTime = new Date(i.dt_txt)
        let localeTime = new Date(UtcTime.getTime() + weather.city.timezone * 1000);
        labels.push(`${weekday[localeTime.getDay()]} ${localeTime.getHours() < 10 ? `0${localeTime.getHours()}:00` : `${localeTime.getHours()}:00`}`);
        temps.push(`${Math.round(i.main.temp - 273.15)}`);
    }
    Chart.register(ChartDataLabels);
    let canva = document.getElementsByClassName("line-chart")[0];
    let chart = new Chart(canva, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                data: temps,
                fill: true,
                backgroundColor: "rgb(255, 192, 159)",
                borderColor: "rgb(236, 110, 76)",
                pointStyle: "line",
                tension: 0.3,
                datalabels: {
                    align: "bottom",
                    color: "rgb(236, 110, 76)",
                    font: {
                        weight: 'bold'
                    },
                    formatter: function(value) {
                        return value + "°C";
                    },
                },
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false, 
            scales: {
                x: {
                    ticks: {
                        autoSkip: false,
                        padding: 20, 
                    }
                },
                y: {
                    ticks: {
                        display: false, 
                    }
                }
            },
            plugins: {
                legend: {
                    display: false,
                },
                datalabels: {
                    display: true,
                }
            }
        }
    })
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