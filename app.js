const express = require('express') // Importa ExpressJS. Más info de Express en => https://expressjs.com/es/starter/hello-world.html

const app = express() // Crea una instancia de ExpressJS

const port = 3000

app.use(express.json()) // Permite que el servidor analice el cuerpo de las peticiones como JSON

const people = require('./json/people.json')

app.get('/', (req, res) => {
  res.send('<h1>Bienvenid@ al servidor</h1>')
})

app.get('/people', (req, res) => {
  res.json(people) // Envío todo el array
})

app.get('/people/:index', (req, res) => {
  res.json(people[req.params.index]) // Envío el elemento solicitado por su índice
})

app.post('/people', (req, res) => {
  people.push(req.body) // Añado un nuevo elemento al array
  res.json(req.body)    // Le respondo al cliente el objeto añadido
})

app.put('/people/:index', (req, res) => {
  const index = req.params.index
  if (index >= 0 && index < people.length) {
    people[index] = req.body // Actualizo la persona con el índice especificado
    res.json(people[index])  // Devuelvo la persona actualizada
  } else {
    res.status(404).send('Persona no encontrada')
  }
})

app.delete('/people/:index', (req, res) => {
  const index = req.params.index
  if (index >= 0 && index < people.length) {
    const deletedPerson = people.splice(index, 1) // Elimino la persona con el índice ajustado
    res.json(deletedPerson[0])                    // Respondo con la persona eliminada
  } else {
    res.status(404).send('Persona no encontrada')
  }
})

// Esta línea inicia el servidor para que escuche peticiones en el puerto indicado
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})
