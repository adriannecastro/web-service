const express = require('express');
const uuid = require('uuid');

const app = express();
app.use(express.json());

let persons = [];

app.get('/persons', (request, response) => {
  return response.status(200).json(persons);
});

app.get('/persons/:id', (request, response) => {
  const personId = request.params.id;

  const person = persons.find(person => person.id === personId);

  if (!person) {
    return response.status(404).json({ message: 'Pessoa não encontrada!'})
  }

  return response.status(200).json(person);
});

app.post('/persons', (request, response) => {
  const { name, age } = request.body;

  if (!name || !age) {
    return response.status(400).json({ message: 'É necessário informar nome e idade!'})
  };

  const person = {
    id: uuid.v4(),
    name,
    age,
  };
  persons.push(person);

  return response.status(200).json({ message: 'Cadastro realizado com sucesso!' })
});

app.put('/persons/:id', (request, response) => {
  const { name, age } = request.body;
  const personId = request.params.id;

  const person = persons.find(person => person.id === personId);

  if (!person) {
    return response.status(404).json({ message: 'Pessoa não encontrada!'})
  }

  const updatePerson = {
    id: person.id,
    name: name ? name : person.name,
    age: age ? age : person.age,
  }

  persons = persons.map(person => person.id === personId ? updatePerson : person);
  
  return response.status(200).json({ message: 'Cadastro atualizado com sucesso!'})
});

app.delete('/persons/:id', (request, response) => {
  const personId = request.params.id;

  const person = persons.find(person => person.id === personId);

  if (!person) {
    return response.status(404).json({ message: 'Pessoa não encontrada!'})
  }

  persons = persons.filter(person => person.id !== personId);

  return response.status(200).json({ message: 'Cadastro excluído com sucesso!'})
});

app.listen(3333)