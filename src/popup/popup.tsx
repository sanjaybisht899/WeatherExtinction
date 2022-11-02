import React, {useState,useEffect} from 'react'
import { createRoot } from 'react-dom/client'
import { InputBase,IconButton,Paper,Box ,Grid} from '@mui/material'
import { Add } from '@mui/icons-material';
import 'fontsource-roboto'
import './popup.css'
import WeatherCard from './WeatherCard/WeatherCard'
import { setStoredCities,getStoredCities } from '../utils/storage';

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([])

  const [cityInput,setCityInput] = useState<string>('')

  useEffect(() => {
    getStoredCities().then(cities => setCities(cities));
  },[])

  const handleCityButtonClick = () => {
    if (cityInput === ''){
      return
    }

    const updatedCities = [...cities, cityInput]
    setStoredCities(updatedCities)
    .then(() => {
      setCities(updatedCities)
      setCityInput('')
    })
  }

  const handleDeleteButtonClick = (index: number) => {
    cities.splice(index,1)
    const updatedCities = [...cities]
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities)
    })
    
  }

  return (
    <Box mx="8px" my="16px">
      <Grid container>
        <Grid item>
        <Paper>
          <Box px="15px" py="5px">
            <InputBase 
            placeholder='Enter the City Name'
            value={cityInput}
            onChange={(event) => setCityInput(event.target.value)}
            />
            <IconButton onClick={handleCityButtonClick}>
            <Add/>
            </IconButton>
          </Box>
          </Paper>
        </Grid>
      </Grid>
      {cities.map((city,index) => (
        <WeatherCard city={city} key={index} onDelete={() =>
           handleDeleteButtonClick(index)}/>
      ))}
      <Box height="16px">

      </Box>
    </Box>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
