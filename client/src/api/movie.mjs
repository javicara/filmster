function getAll() {
    return fetch('/api/v1/movies')
        .then(result => result.json())
}

function create(movie) {
  const anio=movie.year.getFullYear()
fetch('/api/v1/movies', {
        method: 'post',
        body:    JSON.stringify({title:movie.name,description:movie.plot,year:anio,runtime:movie.runtime,country:movie.country,language:movie.language,genres:movie.generes,writers:movie.writers,directors:movie.directors}),
        headers: { 	'Accept': 'application/json',
        			'Content-Type': 'application/json' },
    })
}
 
function deleteMovie(id) {
    return fetch('/api/v1/movies/' + id, { method: 'DELETE' })
        .then(function(response) {
            return response;
        })
        .then(function(myRes) {
            alert('La película ' + id + ' fue borrada exitosamente');
            location.reload();
        })
        .catch(function(error) {
            alert('La película ' + id + ' no fue encontrada');
        });
}



export default {
    getAll,
    create,
    deleteMovie
}
