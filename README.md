# pdf-depersonalization-in-web

[![Latest Release](https://img.shields.io/github/release-pre/riv-gh/pdf-depersonalization-in-web.svg?label=Latest%20Release)](https://github.com/riv-gh/pdf-depersonalization-in-web/releases)
[![Docker Pulls](https://img.shields.io/docker/pulls/daenur/pdf-depersonalization-in-web.svg?label=Docker%20Pulls)](https://hub.docker.com/r/daenur/pdf-depersonalization-in-web)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![GitHub Repo stars](https://img.shields.io/github/stars/riv-gh/pdf-depersonalization-in-web?style=social)](https://github.com/riv-gh/pdf-depersonalization-in-web)

A small web application to simplify the depersonalization of pdf files

(Млаенький веб-застосунок для спрощення знеособлення pdf файлів)

[View on GitHub Pages](https://riv-gh.github.io/pdf-depersonalization-in-web/)


![image](https://github.com/user-attachments/assets/6c4f2e0f-b533-4104-9969-d00fdafff691)





[Docker Hub](https://hub.docker.com/r/daenur/pdf-depersonalization-in-web): `daenur/pdf-depersonalization-in-web:latest`

## Use in Docker Compose file

```yml
services:
  pdf-depersonalization-in-web:
    container_name: pdf-depersonalization-in-web
    image: daenur/pdf-depersonalization-in-web:latest
    pull_policy: always
    restart: unless-stopped
    environment:
        CUSTOM_TITLE: "change the title if needed"
        CUSTOM_DESCRIPTION: "change the description if needed"
        DEFAULT_LANG: en # "en-US" avalible too
        SHOW_LANG_SELECTOR: true # or false   
        # Avalible languages:
        #  de (de-DE) – German (Germany)
        #  en (en-US) – English (United States) [default]
        #  es (es-ES) – Spanish (Spain)
        #  fr (fr-FR) – French (France)
        #  ru (ru-RU) – Russian (Russia)
        #  uk (uk-UA) – Ukrainian (Ukraine)
        #  tt (tt-RU) – Tatar (Russia)
        BRUSH_COLOR: "#ffffff"
        BRUSH_SIZE: 25 # from 1 to 50
        SAVE_QUALITY: 0.2 # from 0.1 to 1
    ports:
      - 80:80
```
