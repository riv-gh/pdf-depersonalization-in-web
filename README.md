# pdf-depersonalization-in-web

[![Docker Pulls](https://img.shields.io/docker/pulls/daenur/pdf-depersonalization-in-web)](https://hub.docker.com/r/daenur/pdf-depersonalization-in-web)
[![Last Tag](https://img.shields.io/github/v/tag/riv-gh/pdf-depersonalization-in-web)](https://github.com/riv-gh/pdf-depersonalization-in-web/tags)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![GitHub Repo stars](https://img.shields.io/github/stars/riv-gh/pdf-depersonalization-in-web?style=social)](https://github.com/riv-gh/pdf-depersonalization-in-web)

A small web application to simplify the depersonalization of pdf files

(Млаенький веб-застосунок для спрощення знеособлення pdf файлів)

[View on GitHub Pages](https://riv-gh.github.io/pdf-depersonalization-in-web/)


![image](https://github.com/user-attachments/assets/ee7711f6-4092-4ab4-be15-f5ae9c041ddb)




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
        DEFAULT_LANG: en-US
        # Avalible languages:
        #   de-DE – German (Germany)
        #   en-US – English (United States) [default]
        #   es-ES – Spanish (Spain)
        #   fr-FR – French (France)
        #   ru-RU – Russian (Russia)
        #   uk-UA – Ukrainian (Ukraine)
        BRUSH_COLOR: "#ffffff"
        BRUSH_SIZE: 25 # from 1 to 50
        SAVE_QUALITY: 0.2 # from 0.1 to 1
    ports:
      - 80:80
```
