import { APIKEY } from "./constants.js";

async function fetchApiGeolocalisationWithState(cityName, countryCode, countryState) {
    try {
        let request = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${countryCode},${countryState}&appid=${APIKEY}`);

        if(!request.ok) throw new Error("Issue with the GEOLOCADE API...");

        let response = await request.json();
        
        if(response.length === 0) throw new Error("Not a valid city name...");
        
        return response[0];
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function fetchApiGeolocalisationWithoutState(cityName, countryCode) {
    try {
        let request = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${countryCode}&appid=${APIKEY}`);

        if(!request.ok) throw new Error("Issue with the GEOLOCADE API...");

        let response = await request.json();
        
        if(response.length === 0) throw new Error("Not a valid city name...");
        
        return response[0];
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getCoordonatesWithState(cityName, countryCode, countryState) {
    let apiResponse = await fetchApiGeolocalisationWithState(cityName, countryCode, countryState);
    
    if(apiResponse) {
       let lat = apiResponse.lat;
       let lon = apiResponse.lon;
       return {lat, lon};
    } else {
        return null;
    }
}

export async function getCoordonatesWithoutState(cityName, countryCode) {
    let apiResponse = await fetchApiGeolocalisationWithoutState(cityName, countryCode);
    
    if(apiResponse) {
       let lat = apiResponse.lat;
       let lon = apiResponse.lon;
       return {lat, lon};
    } else {
        return null;
    }
}

export async function fetchApiWeahter(lat, lon) {
    try {
        let request = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}`);
        
        if(!request.ok) throw new Error("Issue with the WEATHER API...");
        
        let response = await request.json();
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
}