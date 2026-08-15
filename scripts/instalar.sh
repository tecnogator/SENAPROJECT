#!/usr/bin/env sh
set -eu
npm --prefix olympusgym-api-node-express ci
npm --prefix olympusgym-frontend ci
npm --prefix olympusgym-mobile install
echo "Instalación de OlympusGym completada."
