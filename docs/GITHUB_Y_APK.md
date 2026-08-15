# Manual de publicación y generación del APK

## Publicar sin cambiar la estructura anterior

Copie estas carpetas y archivos en la raíz de su copia local de `SENAPROJECT`. No cree una carpeta adicional dentro del repositorio.

```bash
git checkout -b ga8-aa2-ev02-react-native
git add .
git commit -m "feat: integrar OlympusGym web, API Node Express y aplicación React Native"
git push -u origin ga8-aa2-ev02-react-native
```

Abra una solicitud de integración hacia `main` o lleve el archivo `.github/workflows/android-apk.yml` a la rama principal. GitHub solo muestra el botón manual de un flujo cuando este ya existe en la rama predeterminada.

## Descargar el APK

1. Abra `https://github.com/tecnogator/SENAPROJECT/actions`.
2. Seleccione **Validar y generar APK OlympusGym**.
3. Presione **Run workflow**.
4. Elija `main` o `ga8-aa2-ev02-react-native`.
5. Espere a que `Compilar APK Android` finalice en verde.
6. Abra la ejecución y baje hasta **Artifacts**.
7. Descargue `OlympusGym-Android-APK`.
8. Extraiga `OlympusGym-GA8-AA2-EV02.apk`.

## Instalar y demostrar

1. Copie el APK al teléfono.
2. Autorice temporalmente la instalación desde esa fuente.
3. Instale y abra OlympusGym.
4. Ingrese con `edgar@olympusgym.test` y `Olympus123*`.
5. Recorra dashboard, rutinas, nutrición, suplementos, membresías y perfil.

## Diagnóstico rápido

| Situación | Solución |
|---|---|
| No aparece Run workflow | Integre el YAML en `main` y recargue Actions |
| Fallan pruebas | Abra el paso rojo y revise el primer mensaje de error |
| El teléfono no llega a localhost | Use la IP LAN del computador o active modo demostración |
| Android bloquea el APK | Autorice la fuente temporalmente y vuelva a instalar |
| No aparece el artefacto | La compilación debe finalizar completamente en verde |

El APK se genera en servidores limpios de GitHub y queda asociado al commit, lo que aporta trazabilidad verificable para la evidencia.

