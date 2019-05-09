import Table from './components/table.mjs'
import movieService from './api/movie.mjs'

// Inicializamos la tabla
window.table = Table('#movies', {
    header: [
        { label: 'Título', field: 'title' },
        { label: 'Descripción', field: 'description' },
        { label: 'Año', field: 'year' },
        { label: 'Genero', field: 'genres' },
        { label: 'Pais', field: 'country' },
        {
            label: 'Guionistas',
            field: 'writers',
            render: function (data) { return data.join(', ') }
        }
    ],
    data: [],
    // Esta funcion se ejecuta cuando seleccionamos una pelicula
    onSelectedRow: function (row) {
        var btnAgregar = document.getElementById('addMovieBtn')
        var btnElimar= document.getElementById('deleteMoviebtn')
        console.log(table.getSelectedRows().length)
            if (table.getSelectedRows().length > 0){
                btnElimar.disabled=false   
                btnAgregar.disabled=true 
             }
        console.log(table.getSelectedRows())
    },
    // Esta funcion se ejecuta cuando deseleccionamos una pelicula
    onDeselectedRow: function () {
       var btnElimar= document.getElementById('deleteMoviebtn')
       // btnElimar.disabled=true
        var btnAgregar = document.getElementById('addMovieBtn')
        
        
            if (table.getSelectedRows().length==0){
                btnElimar.disabled=true  // deshabilitado
                btnAgregar.disabled=false // habilitado
            }
        console.log(table.getSelectedRows())
    }
})
//Hagan otro HOTFIX de la versión 1.2.0 haciendo que se deshabilite el botón "Eliminar" cuando no hay películas seleccionadas

// Obtenemos todas las peliculas
movieService.getAll().then(table.update)

// Guardamos todas las referencias a elementos que vamos a
// necesitar
const $refs = {
    cancelModalBtn: document.querySelector('#cancelModalBtn'),
    saveMovieBtn: document.querySelector('#saveMovieBtn'),
    addMovieBtn: document.querySelector('#addMovieBtn'),
    closeModalBtn: document.querySelector('#closeModalBtn'),

    modal: document.querySelector('#modal'),

    movieName: document.querySelector('#movieName'),
    moviePlot: document.querySelector('#moviePlot'),
    movieReleaseDate: document.querySelector('#movieReleaseDate'),
    movieCountry: document.querySelector('#movieCountry'),
    movieRuntime: document.querySelector('#movieRuntime'),
    movieLanguage: document.querySelector('#movieLanguage'),
    movieGeneres: document.querySelector('#movieGeneres'),
    movieWriters: document.querySelector('#movieWriters'),
    movieDirectors: document.querySelector('#movieDirectors')
}

/*
 * Abre el modal
 */
function openModal() {
    $refs.modal.classList.add('is-active')
}

/*
 * Cierra el modal
 */
function closeModal() {
    $refs.modal.classList.remove('is-active')
}

function parseCSV(val) {
    return val.split(',').flatMap(v => v.split());
}

/*
 * Guarda una pelicula
 */
function saveMovie() {
    const movie = {
        name: $refs.movieName.value,
        plot: $refs.moviePlot.value,
        year: new Date($refs.movieReleaseDate.value),
        country: $refs.movieCountry.value,
        runtime: +$refs.movieRuntime.value,
        language: $refs.movieLanguage.value,
        generes: parseCSV($refs.movieGeneres.value),
        writers: parseCSV($refs.movieWriters.value),
        directors: parseCSV($refs.movieDirectors.value)
    }

    console.log(movie)
}

// Levantamos los listeners de la app
$refs.addMovieBtn.addEventListener('click', openModal)
$refs.cancelModalBtn.addEventListener('click', closeModal)
$refs.closeModalBtn.addEventListener('click', closeModal)
$refs.saveMovieBtn.addEventListener('click', saveMovie)
