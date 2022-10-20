import React, { useState } from 'react';
import react from 'react-router-dom';
import axios from 'axios';


export default function WeatherApp() {

    let cityData = []
    var citySelected;


    const [selectedCity, setSelectedCity] = useState("")
    const [weatherData, setWeatherData] = useState("")
    const [citylist, setCitylist] = useState("")

    const getCityNames = () => {

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'dc057e517dmshb368a5843af0932p101acfjsn4beb0b23d0c8',
                'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
            }
        };

        fetch('https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=AU&minPopulation=1000000&limit=10', options)
            .then(response => response.json())
            .then(response => {
                let htmlStr = ""
               
                response.data.forEach(city => {
                   cityData.push(city)
                    htmlStr += `<option>${city.city}</option>`
                })

               document.getElementById("citylist").innerHTML = htmlStr

            })

            
            .catch(err => console.error(err));
    }

    const showCityDetails = () => {
        const table = document.getElementById("citytable")
        const cityList = document.getElementById("citylist")
        const cityOption = cityList.options[cityList.selectedIndex].text
        citySelected = cityData.find(e => e.city == cityOption)

        table.innerHTML = `<tr>
                               <th>City</th>
                               <td>${citySelected.city}</td>
                            </tr>
                            <tr>
                               <th>Region</th>
                               <td>${citySelected.region}</td>
                            </tr>
                            <tr>
                               <th>Latitude</th>
                               <td>${citySelected.latitude}</td>
                            </tr>
                            <tr>
                               <th>Longitude</th>
                               <td>${citySelected.longitude}</td>
                            </tr>
        `
        setSelectedCity(citySelected.city)

    };

    const getWeatherData = () => {

        ///////////////////////////////////////////////////////////////////
        var url = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity},au&units=metric&APPID=ed33ad22564b564267a56c3602e19863`;
        axios.get(url)
            .then((response) => {
                console.log(response.data);
                // this.setState({ successmsg: "Details updated successfully!", error: "" });

                displayWeatherData(response.data);
            })
            .catch(error => {
                if (error.response) {
                    // this.setState({ errormsg: error.response.data.message, successmsg: "" });
                } else {
                    // this.setState({ errormsg: error.message, successmsg: "" });
                }
            });
    }


    const displayWeatherData = (weatherData) => {

        let weatherHtml = "";

        weatherHtml =
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Category</th>
                        <th colspan="2" scope="col">Information</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Weather</th>
                        <td colspan="2">{selectedCity}</td>
                    </tr>
                    <tr>
                        <th scope="row">Temperature</th>
                        <td>Current:    {weatherData.main.temp} &#176;c<br />
                            Max:  {weatherData.main.temp_max} &#176;c<br />
                            Min: {weatherData.main.temp_min} &#176;c</td>
                        
                    </tr>
                    <tr>
                        <th scope="row">Humidity</th>
                        <td colspan="2">{weatherData.main.humidity}&#37;</td>
                    </tr>
                    <tr>
                        <th scope="row">Wind</th>
                        <td>Speed: {weatherData.wind.speed} m/s<br />
                            Degrees: {weatherData.wind.deg}&#176;</td>
                         
                          
                    </tr>
                </tbody>
            </table>

        setWeatherData(weatherHtml)
    }

    return (
        <div><div className="text-center">


            <hr />
        </div>
            <div className="container">
                <h2>Please Select A City</h2>
                <form>
                    * <select id="citylist" required onClick={getCityNames} onChange={showCityDetails}>
                        <option selected  >Select a City</option>
                        {citylist}
                    </select><br /><br />
                    <table id="citytable" className="table table-light"></table>
                    <button type="button" className="btn btn-success" onClick={getWeatherData}>Get Weather</button>
                </form>
                <br />
                <table id="citytable" className="table table-dark"></table>
                <div id="weathertable" className="container"></div>
            </div>

            {weatherData}
        </div>


    )
}
