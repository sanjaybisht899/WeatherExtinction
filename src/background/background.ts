// TODO: background script
import {setStoredCities}  from '../utils/storage'
chrome.runtime.onInstalled.addListener(() => {
  setStoredCities([])
})
