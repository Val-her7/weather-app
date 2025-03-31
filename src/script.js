import { SELECT } from "./components/constants.js";
import { fetchCitySuggestions } from "./components/suggestion.js";
import { fetchApiWeahter, getCoordonatesWithoutState, getCoordonatesWithState } from "./components/api.js";
import { displayWeatherForecast, changeDisplay } from "./components/display.js";
import { createStorage, getStorage } from "./components/storage.js";

//Handle of input suggestions
const INPUT = document.getElementById("cityInput");
const BUTTON = document.getElementById("searchCityButton");
const LOCATION = document.getElementsByClassName("locations")[0];

INPUT.addEventListener("keyup", () => {
    fetchCitySuggestions(INPUT.value);
    BUTTON.style.visibility = "hidden";
});

SELECT.addEventListener("click", () => {
    if(SELECT.value === "No city found...") {
        SELECT.style.display = "none";        
        INPUT.value = "";
        BUTTON.style.visibility = "hidden";
    } else {
    INPUT.value = SELECT.value;
    SELECT.style.display = "none"; 
    BUTTON.style.visibility = "visible";
    }
});

//Handle of search city button

BUTTON.addEventListener("click", async() => {
    let results = INPUT.value.match(/[^(),]+/g).map(e => e.trim());
    INPUT.value = "";
    BUTTON.style.visibility = "hidden";

    let coordinates;
    if(results.length === 2) {
        coordinates = await getCoordonatesWithoutState(results[0], results[1]);
    }
    if(results.length === 3) {
        coordinates = await getCoordonatesWithState(results[0], results[1], results[2]);
    }  
    let lat = coordinates.lat;
    let lon = coordinates.lon;
    let weather = await fetchApiWeahter(lat, lon);

    let location = document.getElementsByClassName("focus")[0];
    location.classList.replace("focus", "unfocus");
    document.getElementsByClassName(`${location.id}`)[0].style.display = "none";
    
    document.getElementsByClassName("all-days")[0].style.display = "none";

    displayWeatherForecast(weather);
    createStorage(weather);
})

// Handle of load of the page

window.onload = () => {
    let savedWeather = getStorage();
    displayWeatherForecast(savedWeather);
}

// Handle switching city weather

LOCATION.addEventListener("click", (e) => {
    if (e.target.tagName === "P") {
        let spanId = e.target.parentNode.id;
        changeDisplay(spanId);
    }
} )