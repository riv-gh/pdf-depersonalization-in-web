#!/bin/sh

envsubst < /usr/share/nginx/html/configs/config.tpl.json > /usr/share/nginx/html/configs/config.json

# Execute the provided CMD
exec "$@"