// Obtendo os elementos do DOM
let usernameI = document.getElementById("name");
let emailI = document.getElementById("email");
let ratingI = document.getElementById("rating");
let suggestionI = document.getElementById("suggestion");
let submitI = document.getElementById("submit");
const URLAPI = "http://localhost:3000/users";

// Adicionando um ouvinte de evento ao botão de envio (submitI)
submitI.addEventListener("click", (e) => {
  // Verificando se algum dos campos está vazio
  if (
    !usernameI.value ||
    !emailI.value ||
    !ratingI.value ||
    !suggestionI.value
  ) {
    // Mostrando um alerta se algum campo estiver vazio
    window.alert("Os campos não podem ficar vazios!");
    return;
  }

  // Criando um objeto com os dados do formulário
  let avatarUrl = `https://api.dicebear.com/6.x/initials/svg?seed=${usernameI.value}`;
  let encodedURL = encodeURI(avatarUrl);
  let data = {
    username: usernameI.value,
    email: emailI.value,
    rating: ratingI.value,
    suggestion: suggestionI.value,
    avatar: encodedURL,
  };

  // Realizando uma requisição fetch para a URL da API
  fetch(URLAPI, {
    method: "POST",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify(data),
  })
    .then((response) => {
      // Verificando se a resposta da requisição foi bem-sucedida
      if (!response.ok) {
        if (response.status === 400) {
          // Exibindo mensagem de erro se já existe um usuário com esse nome
          window.alert("Nome de usuário Indisponível!");
          return;
        }
        // Lançando um erro se a resposta não foi bem-sucedida
        throw new Error(
          "Erro na requisição: " + response.status + " - " + response.statusText
        );
      }

      // Limpando os campos do formulário
      usernameI.value = "";
      emailI.value = "";
      ratingI.value = "";
      suggestionI.value = "";

      // Redirecionando para uma página de sucesso após 1 segundo
      setTimeout(() => {
        window.location.href =
          "./assets/pages/submit-success/submit-success.html";
      }, 1000);

      // Retornando a resposta como JSON
      return response.json();
    })
    .then((json) => {
      // Exibindo a resposta JSON no console
      console.log(json);
    })
    .catch((error) => {
      // Redirecionando para uma página de erro após 1 segundo
      setTimeout(() => {
        window.location.href = "./assets/pages/submit-error/submit-error.html";
      }, 1000);

      // Exibindo o erro no console
      console.error(error);
    });
});
