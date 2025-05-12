import lang from './../lang.yml';

let currentLang = 'en-us';

function getTranslation(key) {
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

languageSelector.addEventListener('change', (e) => {
  const selectedLang = e.target.value;
  if (lang[selectedLang]) {
    currentLang = selectedLang;
    updateUI();
  }
});


function updateUI() {
  function updateUIElement(selector, translationKey) {
    document.querySelectorAll(selector).forEach(element=>{
      element.classList.contains('no-translate')
      ? null
      : element.textContent = getTranslation(translationKey)+(element.tagName=='LABEL'?':':'');
    });
  }

  document.documentElement.lang = currentLang.split('-')[0]; //обновление атрибута lang в теге html
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
  updateUIElement('#footer-text', 'footer.text');
  updateUIElement('#license-link', 'footer.licenseLinkText');
}

function initLanguage(initLang) {
  languageSelector.value = initLang;
  currentLang = initLang;
  updateUI();
}

export {
  getTranslation,
  initLanguage,
};

