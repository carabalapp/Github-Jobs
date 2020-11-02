// variables
const formulario = document.querySelector("#formulario")
const resultado = document.querySelector("#resultado")



document.addEventListener("DOMContentLoaded", () =>{
    formulario.addEventListener("submit",validarBusqueda)
})


function validarBusqueda(e){
    e.preventDefault()
    const buscador = document.querySelector("#buscador").value

    if(buscador === '' || buscador.length < 2){
        mostrarAlerta('Entrada vacia o muy corta')
        return
    }
    consultarAPI(buscador)
}

function consultarAPI(buscar){
    const urlAPI = `https://jobs.github.com/positions.json?search=${buscar}`
    const url = `https://api.allorigins.win/get?url=${ encodeURIComponent (urlAPI) }`
    axios.get(url)
    .then(respuesta => console.log(JSON.parse(respuesta.data.contents)))

}

function mostrarAlerta(msg){
    const alerta = document.createElement('div')
    const alertaPrev = document.querySelector('.existe')
    if(!alertaPrev){
        alerta.classList.add('bg-danger', 'mt-2', 'text-center', 'p-4', 'existe' )
        alerta.textContent = msg;
        formulario.appendChild(alerta)
        setTimeout(() => {
            alerta.remove() 
        },3000)
    } 
}