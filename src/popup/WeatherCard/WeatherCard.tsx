import React, {useEffect, useState} from 'react'
import { fethOpenWeatherData, OpenWeatherData, OpenWeatherTempScale } from '../../utils/api'
import { Card, CardContent, Typography,Box, CardActions, Button } from '@mui/material'
import './WeatherCard.css'

const WeatherCardContainer : React.FC<{
  children: React.ReactNode,
  onDelete? : () =>void
}> = ({children, onDelete}) =>{
  return <>
    <Box mx={'4px'} my={'16px'}>
      <Card>
        <CardContent>{children}</CardContent>
        <CardActions>
          {
            onDelete && 
            <Button color="secondary" onClick={onDelete}>Delete</Button>
          }
        </CardActions>
        </Card>
    </Box>
  </>
}

type weatherCardState = "loading" | "error" | "ready"


const WeatherCard: React.FC<{
    city: string,
    tempScale : OpenWeatherTempScale
    onDelete? : () =>void
}> = ({city,tempScale, onDelete}) => {

    const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null)
    const [cardState,setCardState] = useState<weatherCardState>("loading")

    useEffect(()=>{
        fethOpenWeatherData(city, tempScale)
          .then(
            (data) => {
              setWeatherData(data)
              setCardState("ready")
            })
          .catch((error) => setCardState("error"))
      },[city,tempScale])

      if(cardState =="loading" || cardState == "error"){
        return <WeatherCardContainer onDelete={onDelete}>
          <Typography variant='body1'>
            {
              cardState == "loading" ? "Loading....." :
              "Error : Could not retrieve weather data"
            }
          </Typography>
        </WeatherCardContainer>
      }
    return <>
        <WeatherCardContainer onDelete={onDelete}>
          <Typography variant="h5">{weatherData.name}</Typography>
          <Typography variant="body2">{Math.round(weatherData.main.temp)}</Typography>
          <Typography variant="body2">Feels Like: {Math.round(weatherData.main.feels_like)}</Typography>
        </WeatherCardContainer>
    </>
}

export default WeatherCard