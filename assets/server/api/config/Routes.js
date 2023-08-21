const express = require("express");
const routes = express.Router();
const DB_RATING_USERS = require("./Database/Users");
const DB_PRIVATE_INFO_USER = require("./Database/UsersPrivate");
const FGETDAY = require("./utilities/date");

// Requisiçao get que retorna todos os usuários
routes.get("/allusers", (request, response) => {
  return response.json(DB_RATING_USERS.USERS);
});

// Requisiçao get que retorna a avaliação do usuário que for passado como parâmetro na URL
routes.get("/user/:username", (request, response) => {
  const { username } = request.params;

  const index = DB_RATING_USERS.USERS.findIndex(
    (user) => user.username === username
  );
  if (index !== -1) {
    response.status(200).json(DB_RATING_USERS.USERS[index]);
  } else {
    response
      .status(404)
      .send({ messageError: "Não há avaliação com este nome de usuário!" });
    console.log(index);
  }
});

// Requisição get que retorna a avaliação do usuário que for passado como parametro na URL, mas deverá ser passado o nome de usuário e o email cadastrado para que haja maior segurança.
routes.get("/edit/:username/:email", (request, response) => {
  const { username, email } = request.params;

  const index = DB_PRIVATE_INFO_USER.USERS.findIndex((user) => {
    // Verifica se o usuário com o nome de usuário e email foi encontrado
    return user.username === username && user.email === email;
  });

  if (index !== -1) {
    response.status(200).json(DB_PRIVATE_INFO_USER.USERS[index]);
  } else {
    response
      .status(404)
      .json({ messageError: "Não há avaliação com este nome de usuário!" });
    console.log(index);
  }
});

// Requisiçao post onde é adicionado as informaçoes de um usuário
routes.post("/users", (request, response) => {
  const { username, email, rating, suggestion } = request.body;

  // Verificar se há duplicatas, caso houver será retornado o valor 1, caso contrário será -1
  const VERIFY_DUPLICATE = DB_RATING_USERS.USERS.findIndex(
    (ForEachUsername) => ForEachUsername.username === username
  );

  // As informações de usuário que foram passadas no body será salvas em dois DBs um com as informações públicas como (username, id, rating e suggestion) e o outro com as informações privadas contendo as mesmas informações, mais o email do usuário que é pedido para a avaliação ser editada.

  if (VERIFY_DUPLICATE === -1) {
    const userPrivate = {
      username,
      email,
      id: "",
      rating,
      suggestion,
      date: `${FGETDAY}`,
    };
    const user = { username, id: "", rating, suggestion, date: `${FGETDAY}` };
    DB_RATING_USERS.USERS.push(user);
    DB_PRIVATE_INFO_USER.USERS.push(userPrivate);
    userPrivate.id = DB_PRIVATE_INFO_USER.USERS.length;
    user.id = DB_RATING_USERS.USERS.length;
    response.json(user).status(200);
  } else {
    response.status(400).end();
  }
});

// Requisiçao PUT onde é possivel atualizar a avaliaçao do usuário, podendo mudar o rating e suggestion. Usuário pode acessar através do seu nome de usuário para fazer a atualizaçao. Caso nao houver usuário com o username informado na rota, será retornado o status 404
routes.put("/users/:username/rating", (request, response) => {
  const { username } = request.params;
  const { rating, suggestion } = request.body;

  const index = DB_RATING_USERS.USERS.findIndex(
    (user) => user.username === username
  );
  if (index !== -1) {
    DB_RATING_USERS.USERS[index].rating = rating;
    DB_RATING_USERS.USERS[index].suggestion = suggestion;
    DB_RATING_USERS.USERS[index].date = FGETDAY;
    // PRIVATE DB //
    DB_PRIVATE_INFO_USER.USERS[index].rating = rating;
    DB_PRIVATE_INFO_USER.USERS[index].suggestion = suggestion;
    DB_PRIVATE_INFO_USER.USERS[index].date = FGETDAY;
    response.status(200).json(DB_RATING_USERS.USERS[index]);
  } else {
    response.status(404).send("Usuário não encontrado");
    console.log(index);
  }
});

routes.delete('/users/remove_rating/:username/:email', (request, response) => {
  const { username, email } = request.params;

  const indexToRemove = DB_PRIVATE_INFO_USER.USERS.findIndex((user) => {
    return user.username === username && user.email === email
  })
  if (indexToRemove !== -1) {
    DB_PRIVATE_INFO_USER.USERS.splice(indexToRemove, 1)
    DB_RATING_USERS.USERS.splice(indexToRemove, 1)
    response.status(200).json({ message: 'Avaliação removida com sucesso!.' })
  }else {response.status(404).send('Usuário não encontrado')}
})
module.exports = routes;
