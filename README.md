# pdf-depersonalization-in-web
Млаенький веб-застосунок для спрощення знеособлення pdf файлів
![image](https://github.com/user-attachments/assets/ce6b7f2c-2d9a-4089-934a-c5dac8f48d6c)


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
