@echo off
setlocal
echo Instalando OlympusGym API...
call npm --prefix olympusgym-api-node-express ci || exit /b 1
echo Instalando OlympusGym Web...
call npm --prefix olympusgym-frontend ci || exit /b 1
echo Instalando OlympusGym Mobile...
call npm --prefix olympusgym-mobile install || exit /b 1
echo Instalacion completada.

