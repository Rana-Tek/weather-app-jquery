   // $(document).ready(function(){
    //     console.log("Hello World!");
    // });
    $("#city-form").submit(function(event){
        event.preventDefault();

        let cityName = $("#city-name").val();
        getWeather(cityName);

    });

    function getWeather (city) {
  $.get("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=8a0e2e03c568b9c9437a03d809a0e7b0", function(data){
        console.log(data);
        $("#desc").html(data.weather[0].description);
        $("#temp").html(data.main.temp);
    })

    }