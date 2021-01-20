const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

//ler o formulario html 
app.use(bodyParser.urlencoded({extended: true}));

//home page
app.get("/", function(req,res){
    //mandando o index.html pro browser
    res.sendFile(__dirname + "/index.html");

});

//post a requisacao na api
app.post("/", function(req,res){
    const query = req.body.cityName;
    const api_key = "70c0924878a8445cac240601c2fb4342";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + api_key +"&units=" + units ;

    https.get(url,function(response){

        response.on("data",function(data){
            //transformando os dados recebidos em um json
            const weatherData = JSON.parse(data);
            
            const temperature = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    
    
            res.write("<p> The weather in " + query + " is currently " + weatherDescription + " </p>");
            res.write("<h1> The temperature in " + query + " is " + temperature + " degrees</h1>");
            res.write(" <img src="+ iconURL +"> ");
            
    });

    });

});

app.listen(3000);