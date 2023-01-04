import React, {useState} from "react";
import axios from "axios";
import Notification from "./components/Notification";

function App() {
  const [data , setData] = useState({})
  const [location, setLocation] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid={APIkey}&units=metric`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
        setLocation('')
      })
      .catch(error => {
        setError(true)
        setMessage(`Cannot find a city called ${location}`)
        setLocation('')
        setData({})
        setTimeout(() => {
          setMessage(null)
          setError(false)
        }, 5000)
      })
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
        value={location}
        onChange={event => setLocation(event.target.value)}
        placeholder="Enter location"
        onKeyPress={searchLocation}
        type="text"/>
        <Notification message={message} error={error}/>
      </div>
      
      <div className="container">
        <div className="top">
          <div className="location">
              {data.name ? <h3>{data.name}</h3> : null}
          </div>
          <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
              {data.weather ? <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} 
              alt='icon' width='125' height='125' className='brightness'></img> : null}
          </div>
        </div>
        {data.name !== undefined &&
        <div className="bottom">
        <div className="feels">
          {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> : null}
          <p>Feels Like</p>
        </div>
        <div className="humidity">
          {data.main ? <p className="bold">{data.main.humidity.toFixed()}%</p> : null }
          <p>Humidity</p>
        </div>
        <div className="wind">
          {data.wind ? <p className="bold">{data.wind.speed.toFixed()} m/s</p> : null }
          <p>Wind Speed</p>
        </div>
      </div>   
        }
      </div>
    </div>
  );
}

export default App;
