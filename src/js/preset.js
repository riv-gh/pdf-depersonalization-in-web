import { initLanguage  } from "./lang";

fetch('./configs/config.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`Failed to load config.json: ${response.statusText}`);
    }
    return response.json();
  })
  .then(config => {
    console.log('Loaded config:', config);
    initLanguage(config.DEFAULT_LANG.toLowerCase());
    setConfigText('#year', (new Date()).getFullYear());
    setConfigText('#app-title', config.CUSTOM_TITLE);
    setConfigText('#app-description', config.CUSTOM_DESCRIPTION);
    setConfigRangeValue('#save-quality-slider', config.SAVE_QUALITY);
    setConfigRangeValue('#global-size-slider', config.BRUSH_SIZE);
    setConfigColorValue('#global-color-picker', config.BRUSH_COLOR); 
  })
  .catch(error => {
    console.error('Error fetching config.json:', error);
  });

function setConfigText(selector, text) {
  if (!text) return;
  document.querySelectorAll(selector).forEach(element => {
    element.textContent = text;
    element.classList.add('no-translate');
  });
}

function setConfigRangeValue(selector, value) {
  console.log(selector, value)
  if (!value) return;
  document.querySelectorAll(selector).forEach(element => {
    if (element.min<=+value && element.max>=+value) {
      element.value = +value;
    }
    else {
      console.warn(`Value ${value} is out of range for ${selector}.`);
    }
  });
}

function setConfigColorValue(selector, value) {
  if (!value) return;
  if (!value.match(/^#[0-9a-f]{6}$/i)) {
    console.warn(`Value ${value} is not a valid hex color code for ${selector}.`);  
    return; 
  }
  document.querySelectorAll(selector).forEach(element => {
    element.value = value;
  });
}
