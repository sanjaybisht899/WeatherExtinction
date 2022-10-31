import React, {useEffect, useState} from 'react'
import { fethOpenWeatherData, OpenWeatherData } from '../../utils/api'
import { Card, CardContent, Typography,Box } from '@mui/material'
import './WeatherCard.css'
const WeatherCard: React.FC<{
    city: string
}> = ({city}) => {

    const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null)

    useEffect(()=>{
        fethOpenWeatherData(city)
          .then(
            (data) => {
              setWeatherData(data)
            })
          .catch((error) => console.log(error))
      },[city])

      if(!weatherData){
        return <div>Loading...</div>
      }
    return <>
        <Box mx={'4px'} my={'16px'}>
            <Card>
                <CardContent>
                    <Typography variant="h5">{weatherData.name}</Typography>
                    <Typography variant="body1">{Math.round(weatherData.main.temp)}</Typography>
                    <Typography variant="body1">Feels Like: {Math.round(weatherData.main.feels_like)}</Typography>
                    
                </CardContent>
            </Card>
        </Box>
    </>
}

export default WeatherCard