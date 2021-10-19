<div align="center">
    <img src="https://raw.githubusercontent.com/Jobsity/ReactChallenge/main/src/assets/jobsity_logo_small.png"/>
</div>

# React Challenge


## How to deploy

 - Run `npm install` | `yarn install` to install all dependencies.
 - Run `npm start`   | `yarn run` to run the app locally.
 - You can find the project running on `localhost:3000`.

## ENV variables
There are two enviroment variables that you can configure in the .env.* files:
<table>
    <tr>
        <th>Varible</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>REACT_APP_WEATHER_APIKEY</td>
        <td>Is the APIKEY provided by <a href="https://developer.accuweather.com/">AccuWeather</a> who is our provider for the weather API service.</td>
    </tr>
    <tr>
        <td>REACT_APP_WEATHER_URL</td>
        <td>Is the main URL base of the API we have to point at.</td>
    </tr>
</table>

## API consideration
Such as the api with its basic plan usage can only consume the next 5 weather predictions, the app will give you the info from today plus 5 days maximun.

## Published URL
You can access to an online demo <a href="https://rchallenge.thianlopezz.com/">here</a>, hosted in Netlify.