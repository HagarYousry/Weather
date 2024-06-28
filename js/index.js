
const searchLocationInput= document.getElementById('searchLocation');

/* User location */
if(navigator.geolocation){
     navigator.geolocation.getCurrentPosition(function(pos){

const latitude = pos.coords.latitude;
const longitude = pos.coords.longitude;
console.log(latitude);
console.log(longitude);
getWeatherData(`${latitude},${longitude}`);
     })
}
else{
    console.log('Not Allowed');
}
/* Data */
async function getWeatherData(query){
   let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${query}&days=3&key=8b65c13fb06246d8a77171223242506`);
   let result = await data.json();
console.log(result);
displayTodayWeather(result);
displayTomorrowWeather(result);
displayAfterTomorrowWeather(result);
}

searchLocationInput.addEventListener('input', function(e){
    getWeatherData(e.target.value);
})
function displayTodayWeather(result){
    /* Header Data */
console.log(result,'from displayTodayWeather');
console.log(result.current.last_updated, 'Date of today')
const todayDate=result.current.last_updated;
let date = new Date(todayDate);
const todayName = date.toLocaleString('en-us',{weekday:'long'});
 console.log(todayName,'Today Name'); 
const todayDay = date.getDate();
 console.log(todayDay,"Today Day") 
const todayMonth = date.toLocaleString('en-us',{month:'long'});
 console.log(todayMonth, 'Today Month'); 
dayToday.innerHTML=todayName;
dateToday.innerHTML= `${todayDay} ${todayMonth}`;
/* content */
const countryNameInput=result.location.country;
countryName.innerHTML= countryNameInput;
 console.log(result.current.temp_c,'degreee') 
const degreeTodayInput=result.current.temp_c;
degreeToday.innerHTML= degreeTodayInput; 
 console.log(result.current.condition.text,'conditionnn') 
const conditionTodayInput=result.current.condition.text;
conditionToday.innerHTML= conditionTodayInput; 
 console.log(result.current.humidity,'humidity Today') 
const humidityTodayInput=result.current.humidity;
humidityToday.innerHTML= humidityTodayInput; 
 console.log(result.current.wind_kph,'wind Speed Today') 
const windSpeedTodayInput=result.current.wind_kph;
windSpeedToday.innerHTML= windSpeedTodayInput; 
 console.log(result.current.wind_dir,'wind Direction Today') 
const windDirectionTodayInput=result.current.wind_dir;
windDirectionToday.innerHTML= windDirectionTodayInput; 
 console.log(result.current.condition.icon,'icon img Today') 
imgToday.setAttribute('src',`https:${result.current.condition.icon}`);

}
function displayTomorrowWeather({forecast}){
    console.log(forecast.forecastday);
    const forecastDate = forecast.forecastday[1].date; 
    const date = new Date(forecastDate); 
    const dayName = date.toLocaleString('en-us', {weekday: 'long'}); 
    console.log(dayName);
 Tday.innerHTML=dayName; 
 console.log(forecast.forecastday[1].day.condition.icon)
 imgT.setAttribute('src',`http:${forecast.forecastday[1].day.condition.icon}`)
 
 Ttemp1.innerHTML=forecast.forecastday[1].day.maxtemp_c;  
 Ttemp2.innerHTML=forecast.forecastday[1].day.mintemp_c;  
 Tcondition.innerHTML=forecast.forecastday[1].day.condition.text;

}
function displayAfterTomorrowWeather({forecast}){
    console.log(forecast.forecastday);
    const forecastDate = forecast.forecastday[2].date; 
    const date = new Date(forecastDate); 
    const dayName = date.toLocaleString('en-us',{weekday: 'long'}); 
    console.log(dayName);
    AfterTday.innerHTML=dayName; 
    imgAfterT.setAttribute('src',`http:${forecast.forecastday[2].day.condition.icon}`)
 
    AfterTtemp1.innerHTML=forecast.forecastday[2].day.maxtemp_c;  
    AfterTtemp2.innerHTML=forecast.forecastday[2].day.mintemp_c;  
    AfterTcondition.innerHTML=forecast.forecastday[1].day.condition.text;
}


