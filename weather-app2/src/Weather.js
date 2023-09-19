import React, { useState } from "react";

const Weather = () => {
	const [city, setCity] = useState('')
	const [data, setData] = useState(null)
	const [errorMessage, setErrorMessage] = useState('')
	const url = `http://localhost:5271/api/Weather?name=${city}`


	const handleInputChange = (event) => {
		setCity(event.target.value);
	};

	const fetchData = async () => {
		try {
			const response = await fetch(url);
			if (await response.status === 204) {
				setData(null);
				setErrorMessage(`No data for the ${city}!`)
			}
			else if (city === '') {
				setData(null);
				setErrorMessage('Please enter your city!');
			}
			else if(city === 'Moscow'){
				setData(null);
				setErrorMessage('russkiy corabl idi nahui');

			}
			else {
				const wetherData = await response.json();
				setData(wetherData);
				setErrorMessage('');
			}
		} catch (error) {
			console.log(`Error ${error}`)
			setData(null);
			setErrorMessage('An error occurred while running')
		}
	}
	const handleSubmit = (event) => {
		event.preventDefault();
		fetchData();
	};

	return (
		<div className="center-container">
			<h1>Weather app</h1>
			<form onSubmit={handleSubmit}>
				<input type="text" style={{ marginRight: 10 }} value={city} onChange={(handleInputChange)} placeholder="City name" />
				<button type="submit">Get weather</button>
			</form>
			{errorMessage && <p>{errorMessage}</p>}

			{
				data && (
					<div>
						<h1>{data.name}, {data.sys.country}</h1>
						<p>Clouds: {data.weather[0].description}</p>
						<p>Temperature in C°: {(parseFloat(data.main.temp) - 273.15).toFixed(2)} C°</p>
						<p>Temperature in F: {parseFloat(data.main.temp).toFixed(2)} F</p>
						<p>Wind speed: {data.wind.speed}</p>
					</div>
				)
			}
		</div >
	);
}

export default Weather;
