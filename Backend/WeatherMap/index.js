import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import 'dotenv/config'; //help to access hidden keys in the .env file

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//OpenWeatherMap API_KEY
const api_key = `${process.env.API_KEY}`;


app.get("/", async (req, res) => {
    // It will not fetch and display any data in the index page
    try {
        res.render("index.ejs", { weather: null, error: null});
    } catch (error) {
        res.render("index.ejs", {weather: null, error:"Error, please try again!"});
    }
  });


// Get city name passed in the form
app.post("/", async (req, res) => {  
    try {
        const city = req.body.city;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
        const response = await axios.get(url); //Request for data using the URL
        const result = response.data; 
        //console.log(result.name);
        
        const place = result.name+", "+result.sys.country;
        const weatherTimezone = `${new Date(result.dt * 1000 - result.timezone * 1000)}`;      
        const weatherTemp = result.main.temp;
        const weatherIcon = `https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`;
        const weatherDescription = result.weather[0].description;
        const humidity = result.main.humidity;
        const pressure = result.main.pressure;
        const clouds = result.clouds.all;
        const visibility = result.visibility;
        const main = result.weather[0].main;
        const weatherFahrenheit = ((weatherTemp * 9) / 5 + 32).toFixed(2);
  
        res.render("index.ejs", {weather:result,place:place,timezone:weatherTimezone, icon:weatherIcon, temp:weatherTemp, fahrenheit:weatherFahrenheit, main:main, 
        description:weatherDescription, clouds:clouds, visibility:visibility, humidity:humidity, pressure: pressure});
    } catch (error) {
        res.render("index.ejs", {weather: null, error:"Error, please try again!"});
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });