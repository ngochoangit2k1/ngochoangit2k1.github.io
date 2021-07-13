const APP_ID = '026de487fd6c8b4cc0bb10493dd97183';
const DEFAULT_VALUE = '--';
const searchInput = document.querySelector('#search-input');
const cityName = document.querySelector('.city-name');
const weatherState = document.querySelector('.weather-state');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');
const humidity = document.querySelector('.humidity');
const windSpeed = document.querySelector('.wind-speed');
const clouds = document.querySelector('.clouds');
const windDeg = document.querySelector('.wind-deg');
const anc = document.querySelector('.lon');
const lat = document.querySelector('.lat');

//Thành phố mặc định
    
var n = "Da nang"
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${n}&appid=${APP_ID}&exclude=hourly,minutely&units=metric&lang=vi`)
        .then(async res => {
            const data = await res.json();
                console.log('[Search Input]', data);
                cityName.innerHTML = data.name || DEFAULT_VALUE;
                weatherState.innerHTML = data.weather[0].description || DEFAULT_VALUE;
                weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
                console.log(weatherIcon)
                temperature.innerHTML = Math.round(data.main.temp) || DEFAULT_VALUE;    
                sunrise.innerHTML = moment.unix(data.sys.sunrise).format('H:mm') || DEFAULT_VALUE;
                sunset.innerHTML = moment.unix(data.sys.sunset).format('H:mm') || DEFAULT_VALUE;
                humidity.innerHTML = data.main.humidity || DEFAULT_VALUE;
                windSpeed.innerHTML = (data.wind.speed * 3.6).toFixed(2) || DEFAULT_VALUE;
                windDeg.innerHTML = data.wind.deg  || DEFAULT_VALUE;
                clouds.innerHTML = data.clouds.all || DEFAULT_VALUE;
                anc.innerHTML = data.coord.lon || DEFAULT_VALUE;
                anc.innerHTML = data.coord.lat || DEFAULT_VALUE;

}); 

// Thành phố cần tìm kiếm

searchInput.addEventListener('change', (e) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${APP_ID}&exclude=hourly,minutely&units=metric&lang=vi`)
        .then(async res => {
            const data = await res.json();
            console.log('[Search Input]', data);  
       
            cityName.innerHTML = data.name || DEFAULT_VALUE;
            weatherState.innerHTML = data.weather[0].description || DEFAULT_VALUE;
            weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            temperature.innerHTML = Math.round(data.main.temp) || DEFAULT_VALUE;    

            sunrise.innerHTML = moment.unix(data.sys.sunrise).format('H:mm') || DEFAULT_VALUE;
            sunset.innerHTML = moment.unix(data.sys.sunset).format('H:mm') || DEFAULT_VALUE;
            humidity.innerHTML = data.main.humidity || DEFAULT_VALUE;
            windSpeed.innerHTML = (data.wind.speed * 3.6).toFixed(2) || DEFAULT_VALUE;
            windDeg.innerHTML = data.wind.deg  || DEFAULT_VALUE;
            clouds.innerHTML = data.clouds.all || DEFAULT_VALUE;
            anc.innerHTML = data.coord.lon || DEFAULT_VALUE;
           
            anc.innerHTML = data.coord.lat || DEFAULT_VALUE;
        });
});
console.log(anc)
console.log(lat)
console.log(cityName)
// Đồng hồ

function Dong_ho() {
    var gio = document.getElementById("gio");
    var phut = document.getElementById("phut");
    var giay = document.getElementById("giay");
    var Gio_hien_tai = new Date().getHours();
    var Phut_hien_tai = new Date().getMinutes();
    var Giay_hien_tai = new Date().getSeconds();
    gio.innerHTML = Gio_hien_tai;
    phut.innerHTML = Phut_hien_tai;
    giay.innerHTML = Giay_hien_tai;
}

var Dem_gio = setInterval(Dong_ho, 1000);

// Ngày tháng năm

function Ngay_Thang() {
    var ngay = document.getElementById("ngay");
    var thang = document.getElementById("thang");
    var nam = document.getElementById("nam");
    var Ngay_hien_tai = new Date().getDate();
    var Thang_hien_tai = new Date().getMonth()+1;
    var Nam_hien_tai = new Date().getFullYear();
    ngay.innerHTML = Ngay_hien_tai; 
    thang.innerHTML = Thang_hien_tai;
    nam.innerHTML = Nam_hien_tai;
}
var Dem_Ngay = setInterval(Ngay_Thang, 000);



 //Tìm kiếm bằng giọng nói
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

const recognition = new SpeechRecognition();
const synth = window.speechSynthesis;
recognition.lang = 'vi-VI';
recognition.continuous = false;
const microphone = document.querySelector('.microphone');

const speak = (text) => {
    if (synth.speaking) {
        return;
    }
    const utter = new SpeechSynthesisUtterance(text);
    synth.speak(utter);
};

const handleVoice = (text) => {
    console.log('text', text);
    // "thời tiết tại Đà Nẵng" => ["thời tiết tại", "Đà Nẵng"]
    const handledText = text.toLowerCase();
    if (handledText.includes('tại')) {
        const location = handledText.split('tại')[1].trim();
        searchInput.value = location;
        const changeEvent = new Event('change');
        searchInput.dispatchEvent(changeEvent);
        return;
    }
    speak('Vui lòng đọc lại');
}

microphone.addEventListener('click', (e) => {
    e.preventDefault();
    recognition.start();
    microphone.classList.add('recording');
});

recognition.onspeechend = () => {
    recognition.stop();
    microphone.classList.remove('recording');
}

recognition.onerror = (err) => {
    console.error(err);
    microphone.classList.remove('recording');
}

recognition.onresult = (e) => {
    console.log('onresult', e);
    const text = e.results[0][0].transcript;
    handleVoice(text);
}

///////

const currentWeatherItemsEl = document.getElementById('current-weather-items');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');


getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;
        
    
       a = '16.0678'
    
        b = '108.2208'

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${a}&lon=${b}&exclude=hourly,minutely&units=metric&lang=vi&appid=${APP_ID}`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        })

    })
}
function showWeatherData (data){

    let {humidity, wind_deg, sunrise, sunset, wind_speed, uvi, wind_gust, clouds, visibility} = data.current;
    
    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + 'N ' + data.lon+'E'


    currentWeatherItemsEl.innerHTML = 
    `
    <div class="weather-item">
        <div>Mây: ${clouds}%</div>
    </div>
    <div class="weather-item">   
        <div>Độ Ẩm: ${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Chỉ Số UV: ${uvi}</div>
    </div>
    <div class="weather-item">   
        <div>Tầm Nhìn TB: ${visibility}m</div>
    </div>
    <div class="weather-item">
        <div>Hướng Gió: ${wind_deg} độ</div>
    </div>
    <div class="weather-item">
        <div>Tốc Độ Gió: ${wind_speed}km/h</div>
    </div>
    <div class="weather-item">
        <div>Gió Giật: ${wind_gust}km/h</div>
    </div>
    
    <div class="weather-item">
        <div>Mặt Trời Mọc: ${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Mặt Trời Lặng: ${window.moment(sunset*1000).format('HH:mm a')}</div>
    </div>  
    `;

    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt*1000).locale("vi").format('dddd')}</div>
                <div class="temp">  ${day.weather[0].description}</div>
                <div class="temp">Đêm : ${day.temp.night}&#176;C</div>
                <div class="temp">Ngày : ${day.temp.day}&#176;C</div>      
            </div>            
            `
        }else{
            otherDayForcast += `
           
            <div class="weather-forecast-item slide">
    
            
                <div class="day">${window.moment(day.dt*1000).locale("vi").format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">  ${day.weather[0].description}</div>
                <div class="temp">Đêm : ${day.temp.night}&#176;C</div>
                <div class="temp">Ngày : ${day.temp.day}&#176;C</div>
           
            </div>   
             `
        }
    })
    weatherForecastEl.innerHTML = otherDayForcast;
}


