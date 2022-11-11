const OPEN_WEATHER_API_KEY= 'ae17d6ce7b59a518608ff185b0422ed2'

export interface OpenWeatherData{
    name: string,
    main:{
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        humidity: number,
        pressure: number
    },
    weather: {
        description: string,
        icon: string,
        id:number,
        main:string,
    }[],
    wind:{
        deg:number,
        speed:number
    }
}

export type OpenWeatherTempScale = 'metric' | 'imperial'


export async function fethOpenWeatherData(
    city:String,
    tempScale : OpenWeatherTempScale
    ): Promise<OpenWeatherData> {
    const res = await 
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${tempScale}&appid=${OPEN_WEATHER_API_KEY}`)

    if(!res.ok){
        throw new Error('City not found')
    }
    const data : OpenWeatherData = await res.json()
    return data
}