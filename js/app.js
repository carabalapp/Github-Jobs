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
    .then(respuesta => mostrarTrabajos(JSON.parse(respuesta.data.contents)))

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

function mostrarTrabajos(trabajos){
    // Esto lo hago para evitar que se repitan los resultados en el html al dar varias veces click
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
    resultado.classList.add('row')
    if(trabajos.length > 0){
        trabajos.forEach(element => {
            // este company le hago destructuring de trabajos que a su vez es lo que obtengo de data.contents
            const { company,title, type, url } = element
            
            resultado.innerHTML += `
                    <div class="bg-light p-6 m-1 rounded col-3">
                        <h2 class="text-dark">${title}</h2>
                        <p class="font-weight-bold">Empresa: <span class="font-weight-normal">${company}</span></p>
                        <p class="font-weight-bold">Tipo de contrato: <span class="font-weight-normal">${type}</span></p>
                        <a href="${url}" class="btn btn-info btn-lg active mb-2" role="button">Ver oferta</a>
                    </div>
            `
        });
    }
}