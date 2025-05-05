# pdf-depersonalization-in-web

A small web application to simplify the depersonalization of pdf files

(Млаенький веб-застосунок для спрощення знеособлення pdf файлів)

[View on GitHub Pages](https://riv-gh.github.io/pdf-depersonalization-in-web/)

![image](https://github.com/user-attachments/assets/cb9d0ad6-ed20-4ec3-8540-dff0f9c84756)



[Docker Hub](https://hub.docker.com/r/daenur/pdf-depersonalization-in-web): `daenur/pdf-depersonalization-in-web:latest`

## Use in Docker Compose file

```yml
services:
  pdf-depersonalization-in-web:
    container_name: pdf-depersonalization-in-web
    image: daenur/pdf-depersonalization-in-web:latest
    pull_policy: always
    restart: unless-stopped
    ports:
      - 80:80
```
