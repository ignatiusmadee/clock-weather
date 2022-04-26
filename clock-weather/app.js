window.addEventListener('load', ()=>{
    setTimeout(function(){
        window.location.reload(1);
     }, 1000*60*5);
    let long;
    let lat;
    let clocks = document.querySelector('.clocks');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locTimezone = document.querySelector('.location-timezone');
    let temperatureDescription = document.querySelector('.temperature-description');
    let locationIcon = document.querySelector('.weather-icon');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSectionspan = document.querySelector('.temperature span');
    let temperatureOthstatic = document.querySelector('.temperature-other-static');
    let temperatureOthstaticspan = document.querySelector('.temperature-other-static span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=12345&units=metric`; //change 12345 to your api key
            fetch(api)
            .then(response =>{
                return response.json();

            })
            .then(data =>{
                const {temp,weather} = data.current;
                const {main,description,icon} = weather[0];
                temperatureDegree.textContent = Math.floor(temp); 
                locTimezone.textContent = data.timezone;
                temperatureDescription.textContent = description;
                locationIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`;
                temperatureSection.addEventListener('click', ()=>{
                    if(temperatureSectionspan.textContent === 'F'){
                        temperatureSectionspan.textContent = 'C';
                        temperatureDegree.textContent = Math.floor(temp);
                        
                    }else{
                        temperatureSectionspan.textContent = 'F';
                        temperatureDegree.textContent = Math.floor((temp * 9/5) + 32); 
                    }

                });
            });
        });
        weatherOthStatic();
        
    }
    startTime();
    function weatherOthStatic(){
        let latothstatic = -5.135399; // static location here
        let longothstatic = 119.423790; // static location here
        const apiothstatic = `https://api.openweathermap.org/data/2.5/onecall?lat=${latothstatic}&lon=${longothstatic}&appid=12345&units=metric`; //change 12345 to your api key
        fetch(apiothstatic)
        .then(response =>{
            return response.json();

        })
        .then(data =>{
            const {temp,weather} = data.current;
            const {main,description,icon} = weather[0];
            temperatureOthstatic.innerHTML = `${data.timezone} ${Math.floor(temp)} C ${description} <img src="http://openweathermap.org/img/wn/${icon}.png">`;
        })
    }
    function startTime() {
        const today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();
        let ampm = 'AM';
        m = checkTime(m);
        s = checkTime(s);
        if(h > 12){
            h = h - 12;
            ampm = 'PM';
        }else{
            ampm = 'AM';
        }
        h = checkTime(h);
        //clocks.innerHTML =  h + ":" + m + ":" + s;
        clocks.innerHTML =  `${h}:${m}:${s} ${ampm}`;
        setTimeout(startTime, 1000);
      }
      
      function checkTime(i) {
        if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
      }

});

