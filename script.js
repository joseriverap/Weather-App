const nombrePais = document.querySelector('#pais')
const nombreCiudad = document.querySelector('#ciudad')
const form = document.querySelector('.get-clima')
const tar1 = document.querySelector('.temperatura')
const tar2 = document.querySelector('.info-localizacion')
const tar3 = document.querySelector('.viento')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    if(nombreCiudad.value === ''){
        alert('Debes ingresar una ciudad');
    }

    api(nombreCiudad.value,nombrePais.value)
    
})


function api(ciudad,pais){
    //const apiKey = insert your api key here
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`

    fetch(apiUrl)
        .then(data => {
            return data.json();
        })
        .then(dataJSON => {
            if(dataJSON.code === '404'){
                alert('Ciudad no encontrada');
            }
            else{
                clearHTML();
                mostrarClima(dataJSON);
            }
        })
        .catch(error => {
            console.log(error);
        })
    
    
}


function mostrarClima(data){
    const {name, main:{temp},wind:{speed}, weather:[arr]} = data;

    const gra = celcius(temp);

    const contenidoNuevo1 = document.createElement('article');
    contenidoNuevo1.innerHTML = `
        <h4>${gra}°</h4>
        <p>${[arr.main]} </p>
    `;

    tar1.appendChild(contenidoNuevo1)

    const contenidoNuevo2 = document.createElement('article');
    contenidoNuevo2.innerHTML = `
        <h3>${name}</h3>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="icon">
    `;

    tar2.appendChild(contenidoNuevo2)

    const contenidoNuevo3 = document.createElement('article');
    contenidoNuevo3.innerHTML = `
        <h3>Viento</h3>
        <img src="https://cdn-icons-png.flaticon.com/512/91/91977.png" alt="">
        <p>${speed} km/h</p>
    `;

    tar3.appendChild(contenidoNuevo3)

}

function celcius(grado){
    return parseInt(grado - 275)
}

function clearHTML(){
    tar1.innerHTML = '';
    tar2.innerHTML = '';
    tar3.innerHTML = '';
}


