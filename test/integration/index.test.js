const startServer = require('../../server/src/index.js')
const fetch = require('node-fetch');

let server, baseURL;

beforeAll(async () => {
    server = await startServer();
    baseURL = `http://localhost:${server.address().port}/api/v1`
})

afterAll(() => {
    server.close()
})

test('Se debería iniciar la aplicación sin películas', async () => {
    const URL = `${baseURL}/movies`;
    const req = await fetch(URL)
    const movies = await req.json()

    expect(movies.length).toBe(0)
});

test('Se deberia poder eliminar una pelicula de la bd', async () => { 
    //Se declara la pelicula
    const movie = {
        title: 'Back to the Future',
        description: 'Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.',
        year: 1985,
        runtime: 116,
        country: 'United States',
        language: 'English',
        genres: ['Adventure', 'Comedy', 'Science Fiction'],
        directors: ['Robert Zemeckis'],
        writers: ['Robert Zemeckis', 'Bob Gale']
        };

    //Se llama a la API
    await fetch(`${baseURL}/movies`, {
        method: 'POST', 
        body: JSON.stringify(movie),
        headers:{
            'Content-Type': 'application/json'
        }});



    await fetch(`${baseURL}/movies/1`, {
        method: 'DELETE', 
        headers:{
            'Content-Type': 'application/json'
        }});    


    const allMovies = await fetch(`${baseURL}/movies`)
        .then(result => result.json());

    
    expect(allMovies.length).toBe(0);
});