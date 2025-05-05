import lang from './../lang.yml';

const userLang = navigator.language || navigator.userLanguage; // Например, "uk-UA"
const defaultLang = 'uk-ua'; // Язык по умолчанию
let currentLang = lang[userLang.toLowerCase()] ? userLang.toLowerCase() : defaultLang;

export function getTranslation(key) {
  const keys = key.split('.');
  return keys.reduce((obj, k) => (obj && obj[k] ? obj[k] : null), lang[currentLang]) || key;
}

const languageSelector = document.getElementById('language-selector');
for (let langKey in lang) {
  const option = document.createElement('option');
  option.value = langKey;
  option.textContent = lang[langKey].langName;
  if (langKey === currentLang) {
    option.selected = true;
  }
  languageSelector.appendChild(option);
}
console.log(lang);
console.log(currentLang);

console.log(getTranslation('ui.save'));

languageSelector.addEventListener('change', (e) => {
  const selectedLang = e.target.value;
  if (lang[selectedLang]) {
    currentLang = selectedLang;
    updateUI();
  }
});

function updateUI() {
  function updateUIElement(selector, translationKey) {
    // const element = document.selector(id);
    // if (element) {
    //   element.textContent = getTranslation(translationKey);
    // }
    document.querySelectorAll(selector).forEach(element=>{
      element.textContent = getTranslation(translationKey)+(element.tagName=='LABEL'?':':'');
    });
  }
  document.title = getTranslation('defaultTitle');
  updateUIElement('#app-title', 'defaultTitle');
  updateUIElement('#app-description', 'defaultDescription');
  updateUIElement('#save-btn', 'ui.save');
  updateUIElement('#global-brush-round', 'ui.circle');
  updateUIElement('#global-brush-square', 'ui.square');
  updateUIElement('#global-brush-square', 'ui.square');
  updateUIElement('.t-undo-btn', 'ui.undo');
  updateUIElement('.t-reset-btn', 'ui.reset');
  updateUIElement('.t-page-text', 'ui.page');
  updateUIElement('label[for="save-quality-slider"]', 'ui.quality');
  updateUIElement('label[for="global-color-picker"]', 'ui.color');
  updateUIElement('label[for="global-size-slider"]', 'ui.size');
}

updateUI();