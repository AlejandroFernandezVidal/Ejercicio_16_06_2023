/*Ejercicio : Juego de adivinar el personaje de Star Wars.
Crea un juego en el que el jugador tenga que adivinar el nombre del personaje de Star Wars en base a las pistas que se dan,
que será una descripción de éste, que irá aumentando en función de los fallos del usuario. La descripción viene dado por la
"SWAPI"[Star Wars API, gratuita]. El juego carga una página donde se hace una petición a la SWAPI donde nos da una lista de
personajes. Seleccionar un personaje aleatorio y mostrar un trozo de la descripción. Si el usuario falla, la descripción aumenta,
si acierta se muestra una imagen del personaje y un texto de celebración.
Para conseguir foto https://starwars-visualguide.com/assets/img/characters/${ID del personaje}.jpg*/
document.addEventListener('DOMContentLoaded', function() {

    var pistas = document.getElementById("pistas");
    var pista1 = document.getElementById("pista1");
    var respuesta = document.getElementById("respuesta");
    var imagenAcierto = document.getElementById("imagen");
    var respuestaCorrecta = document.getElementById("respuestaCorrecta")
    
    var response;
    var data;
    var person;
    var indiceRandom = Math.floor(Math.random()*10);
    var i = 0;
    var pista;
    var newElement;
    var urlFoto;
    console.log(indiceRandom);

    person = getPerson();
    
    async function getPerson(){
        response = await fetch("https://swapi.dev/api/people/");
        data = await response.json();
        person = data.results[indiceRandom];
        pista1.innerHTML = "Sexo : " + person.gender;
        indiceRandom++;
        urlFoto = "https://starwars-visualguide.com/assets/img/characters/"+indiceRandom+".jpg";
        console.log(person);
        return person;    
    }
    
    validar.addEventListener("click", function() {
        console.log(person.name);
        //i++;
        if(i == -1){
            respuestaCorrecta.textContent = "Ya lo has adivinado.";
        }else {
            i++;
            if(i < 5){
                if(respuesta.value == person.name){
                    respuestaCorrecta.textContent = "Enhorabuena respuesta correcta, lo has adivinado!!!";
                    imagenAcierto.src = urlFoto;
                    respuesta.value = "";
                    i = -1;
                }else {
                    console.log("Lo sentimos has fallado, vuelva a intentarlo.");
                    generarPistas(i);
                    newElement = document.createElement("li");
                    newElement.textContent = pista;
                    pistas.appendChild(newElement);
                    respuesta.value = "";
                }
            }else {
                respuesta.value = "";
                respuestaCorrecta.textContent = "Exceso de intentos, has perdido."
            }
        }
    });

    function generarPistas(i){
        switch (i){
            case 1 :
                pista = "Color de pelo : " + person.hair_color;
                break;
            case 2 :
                pista = "Altura : " + person.height;
                break;
            case 3 :
                pista = "Color de ojos : " + person.eye_color;
                break;
            case 4 :
                pista = "Peso : " + person.mass;
                break;
            case 5 :
                pista = "Color de piel : " + person.skin_color;
                break;
        }
        console.log(person.name);
    } 
});