<h1 align="center">
  <a href="https://github.com/GITHUB_USERNAME/REPO_SLUG">
    <img src="https://firebasestorage.googleapis.com/v0/b/sala-medica.firebasestorage.app/o/capturasPantalla%2Ffavicon3.ico?alt=media&token=b98b6609-5dd5-428d-a2c7-49ec8be6cbdd" alt="Logo" width="100" height="100">
  </a>
</h1>

<div align="center">
  SALA DE JUEGOS
  
  <br />
 
  <br />
  
</div>

<div align="center">
<br />


</div>

<details open="open">
<summary>Tabla de Contenidos</summary>

  - [Sobre / About](#sobre--about)
  - [Características / Features](#características--features)
- [Capturas de Pantalla / Screenshots](#capturas-de-pantalla--screenshots)
- [Empezando / Getting Started](#empezando--getting-started)
  - [Hecho con / Built With](#hecho-con--built-with)
  - [Instalación / Installation](#instalación--installation)
  - [Deploy](#deploy)
- [Contribuciones / Contributing](#contribuciones--contributing)
- [Autores y contribuyentes / Authors & contributors](#autores-y-contribuyentes--authors--contributors)
- [Licencia / License](#licencia--license)
- [Reconocimientos / Acknowledgments](#reconocimientos--acknowledgments)
  


</details>

---

## Sobre / About
> Esta aplicación de juegos permite a los usuarios medir sus capacidades cognitivas y motrices a través de distintos juegos interactivos. La plataforma es intuitiva y almacena estadísticas de cada jugador y cada juego, asegurando una experiencia fluida y desafiante.


---

## Características / Features

### Autenticación de Usuarios
- **Registro y Login con Firebase Authentication**.
- **Inicio de sesión con botones de acceso rápido**.
- **Registro de logs de acceso en Firebase**.
- **Restricción de acceso a usuarios registrados**.

### Juegos Disponibles
- **Ahorcado**: Selección de letras mediante botones, sin ingreso por teclado.
- **Mayor o Menor**: Predicción de la siguiente carta basada en un mazo.
- **Preguntados**: Obtención de preguntas con imágenes desde una API, con opciones de respuesta.
- **Juego de Transporte (Original)**: Basado en medios de transporte y programación lineal.

### Chat
- Accesible solo para usuarios logueados.
- Mensajes con identificación de usuario y hora de envío.

### Encuesta
- Datos requeridos: Nombre, Apellido, Edad (18-99 años), Teléfono (hasta 10 números).
- Mínimo 3 preguntas con distintos controles: textbox, checkbox, radiobutton.
- Validaciones en todos los campos.
- Respuestas almacenadas en Firebase y accesibles solo para administradores.

### Listado de Resultados
- Registro de resultados al finalizar cada juego.
- Almacenamiento de datos del usuario, fecha, puntaje, etc.

### Presentación "Quién Soy"
- Datos personales del desarrollador.
- Foto del desarrollador.
- Explicación detallada del juego de transporte.

### Experiencia de Usuario
- Navegación fluida e intuitiva.
- Mensajes e instrucciones claras.
- Animaciones para mejorar la interactividad.

---
## Capturas de Pantalla / Screenshots
<br>


|                        Home                             |    
| :-------------------------------------------------------------------:       | 
| <img src="https://firebasestorage.googleapis.com/v0/b/sala-medica.firebasestorage.app/o/capturasPantalla%2FScreenshot%202025-03-11%20at%2017-47-39%20TpSalaDeJuegos.png?alt=media&token=ac1c29e5-0545-4f86-8e20-37f3c602015b" title="Turnos" width="100%">  | 
|                                                    |    


|                           Preguntados                 |                                                     
|  :-------------------------------------------------------------------:      
| <img src="https://firebasestorage.googleapis.com/v0/b/sala-medica.firebasestorage.app/o/capturasPantalla%2FScreenshot%202025-03-11%20at%2017-48-19%20TpSalaDeJuegos.png?alt=media&token=e3608748-931e-4930-ac3f-22d1adb0a887" title="Calculator" width="100%">    |
|                             |    

|                               Mayor o Menor                      |    
| :-------------------------------------------------------------------:       | 
|<img src="https://firebasestorage.googleapis.com/v0/b/sala-medica.firebasestorage.app/o/capturasPantalla%2FScreenshot%202025-03-11%20at%2017-48-29%20TpSalaDeJuegos.png?alt=media&token=b8724f70-1d46-49f3-87b2-373dee536326" title="Inicio sesion" width="100%">       | 
|                        Inicio de sesión sencillo                             |    

|                       Transporte                         |    
| :-------------------------------------------------------------------:       | 
|<img src="https://firebasestorage.googleapis.com/v0/b/sala-medica.firebasestorage.app/o/capturasPantalla%2FScreenshot%202025-03-11%20at%2017-48-39%20TpSalaDeJuegos.png?alt=media&token=8bb0dcd3-05a7-4fee-b88c-74a9b1560d30" title="Inicio sesion" width="100%">       | 
|                                                    |    

|                     Puntajes                           |    
| :-------------------------------------------------------------------:       | 
|<img src="https://firebasestorage.googleapis.com/v0/b/sala-medica.firebasestorage.app/o/capturasPantalla%2FScreenshot%202025-03-11%20at%2017-49-12%20TpSalaDeJuegos.png?alt=media&token=7bbfb86d-4aee-4e5d-9455-f0252e82269f" title="Inicio sesion" width="100%">       | 
|                                                    |   

|                     Encuesta                           |    
| :-------------------------------------------------------------------:       | 
|<img src="https://firebasestorage.googleapis.com/v0/b/sala-medica.firebasestorage.app/o/capturasPantalla%2FScreenshot%202025-03-11%20at%2017-49-20%20TpSalaDeJuegos.png?alt=media&token=7021cb55-7e71-4d5b-9c4f-6fac7eed7153" title="Inicio sesion" width="100%">       | 
|                                                    |   

</details>
---

## Empezando / Getting Started


### Hecho con / Built With
- **Angular 18**
- **Firebase Authentication y Firestore** para autenticación y almacenamiento de datos.
- **Angular Material para la interfaz de usuario.
- **ExcelJS y jsPDF** para generación de reportes.

---

### Instalación / Installation
1. Clonar el repositorio:
   ```sh
   git clone https://github.com/jonybhm/Sala-de-juegos.git
   ```
2. Instalar dependencias:
   ```sh
   npm install
   ```
3. Ejecutar el servidor de desarrollo:
   ```sh
   ng serve
   ```
4. Acceder a la aplicación en: `http://localhost:4200/`

---

### Deploy
La aplicación está desplegada en línea y accesible en: https://sala-de-juegos-e948c.web.app.

---

## Contribuciones / Contributing

Si deseas contribuir, por favor revisa las [pautas de contribución](docs/CONTRIBUTING.md). Cualquier tipo de aporte es **bienvenido**.

---

## Autores y contribuyentes / Authors & contributors

El desarrollo de esta API fue realizado por [Jonathan De Castro](https://github.com/jonybhm).

Lista de [contribuyentes](https://github.com/jonybhm/REPO_SLUG/contributors).

---

## Licencia / License

Este proyecto está autorizado bajo la **Licencia MIT**.

Consulta [LICENCIA](LICENSE) para obtener más información.

---

## Reconocimientos / Acknowledgments

Agradecimientos a los docentes de la Universidad Teconológica Nacional FRA.

