const apiKey = "88eac00708458932a14a38ae9089f9d9";
 
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
  
const url = (city)=> `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getWeatherByLocation(city){
     
         const resp = await fetch(url(city), {
             origin: "cors" });
         const respData = await resp.json();
     
           addWeatherToPage(respData);
          
     }

function addWeatherToPage(data){
        const cityName = data.name;
        const temp = Ktoc(data.main.temp);
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const date = new Date();
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayOfWeek = days[date.getDay()];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = months[date.getMonth()];
        const day = date.getDate();

        const weather = document.createElement('div')
        weather.classList.add('weather');

        weather.innerHTML = `
        <div id="city-name">
          <h1>${cityName}</h1>
        </div>
        <div id="temp-humidity">
          <h2 style={display:'flex'}><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
          <small>${data.weather[0].main}</small>
          <p>Humidity: ${humidity}%</p>
        </div>
        <div id="precipitation-wind">
          <p>Precipitation: ${data.weather[0].description}</p>
          <p>Wind: ${windSpeed} m/s</p>
        </div>
        <div id="date">
          <p>Date: ${dayOfWeek}, ${month} ${day}</p>
        </div>
        `;

        // cleanup 
        main.innerHTML= "";
         main.appendChild(weather);
    };



     function Ktoc(K){
         return Math.floor(K - 273.15);
     }

form.addEventListener('submit',(e) =>{
        e.preventDefault();

        const city = search.value;

        if(city){
          getWeatherByLocation(city);
      }
      

     });

// Display weather information for London by default
getWeatherByLocation('London');
