const usernameI = document.getElementById("username");
const buttonSearch = document.getElementById("search");
const result = document.getElementById("info");
const usernameInfo = document.getElementById("usernameInfo");
const rating = document.getElementById("rating");
const suggestion = document.getElementById("suggestion");
const date = document.getElementById("date");
const containerInfo = document.querySelector(".container-info");

// Adiciona um evento de clique ao botão de busca
buttonSearch.addEventListener("click", async function getUsername(e) {
  e.preventDefault(); // Impede o comportamento padrão do clique no botão, que é o envio do formulário

  const username = usernameI.value.trim(); // Obtém o valor do campo de nome de usuário e remove espaços em branco do início e do final

  if (username === "") {
    // Validação se o campo de nome de usuário está vazio

    // Para maior segurança, o email cadastrado não é mostrado nas informações de login, pois somente com o nome de usuário e o email em CONJUNTO é possível alterar as informações da avaliação.

    result.style.color = "red";
    result.innerHTML = "Por favor, insira um nome de usuário válido.";
    rating.innerHTML = "";
    suggestion.innerHTML = "";
    containerInfo.style.display = "none";
    return; // Encerra a função se o campo de nome de usuário estiver vazio
  }

  try {
    let response = await fetch(`http://localhost:3000/user/${username}`);
    let userData = await response.json();

    result.innerHTML = ""; // Limpa o conteúdo do elemento result

    if (!response.ok) {
      // Tratamento de resposta não bem-sucedida (usuário não encontrado)
      result.style.color = "red";
      result.innerHTML = "Erro na requisição: Usuário não encontrado!";
      console.log(+response.status + " - " + response.statusText);
      rating.innerHTML = "";
      suggestion.innerHTML = "";
      containerInfo.style.display = "none"; // Esconde o contêiner de informações
      return; // Encerra a função se a resposta não for bem-sucedida
    }

    // Exibição dos dados do usuário encontrados
    result.style.color = "yellow";
    result.innerHTML = "Suas informações..";
    containerInfo.style.display = "block"; // Exibe o contêiner de informações
    usernameInfo.innerHTML = `(${JSON.stringify(userData.username)})`;
    rating.innerHTML = `${JSON.stringify(userData.rating)}`;
    suggestion.innerHTML = `${JSON.stringify(userData.suggestion)}`;
    date.innerHTML = `${JSON.stringify(userData.date)}`;
    usernameI.value = ""; // Limpa o campo de nome de usuário para a próxima busca
  } catch (error) {
    // Tratamento de erros durante a requisição
    if (error.message === "Failed to fetch") {
      result.style.color = "red";
      result.innerHTML =
        "Houve um erro ao buscar suas informações, não é você, somos nós. 😢";
    } else {
      result.style.color = "red";
      result.innerHTML = "Houve um erro ao buscar suas informações: " + error;
    }
  }
});
