import { APIKEY, SELECT } from "./constants.js";

export async function fetchCitySuggestions(input) {
    if (input.length < 2) { 
        SELECT.innerHTML = "";
        SELECT.style.display = "none";
        return;
    }
    try {
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${APIKEY}`);
        
        if (!response.ok) throw new Error("Issue with the GEOLOCADE API...");

        const cities = await response.json();
        displaySuggestions(cities);
    } catch (error) {
        console.error(error);
        SELECT.innerHTML = "<option>Error while loading suggestions...</option>";
    }
}

function adjustSelectSize() {
    const optionsCount = SELECT.options.length;
    if (optionsCount > 1) {
        SELECT.size = Math.min(optionsCount, 5);
    } else {
        SELECT.size = 1;
    }
}

function displaySuggestions(cities) {
    SELECT.innerHTML = "";
    if (cities.length === 0) {
        const option = document.createElement("option");
        option.value = "No city found...";
        option.textContent = "No city found...";
        SELECT.appendChild(option);
        SELECT.style.dislay = "block";
        SELECT.size = 1;
        return;
    }
    cities.forEach(city => {
        const option = document.createElement("option");
        if(city.state) {
            option.value = `${city.name} (${city.country}, ${city.state})`;
            option.textContent = `${city.name} (${city.country}, ${city.state})`;
        } else {
            option.value = `${city.name} (${city.country})`;
            option.textContent = `${city.name} (${city.country})`;
        }
        SELECT.appendChild(option);
        adjustSelectSize();
    });
    SELECT.style.display = "block";
}
