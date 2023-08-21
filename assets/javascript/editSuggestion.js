// Objeto contendo referências aos elementos do DOM
const elements = {
  buttonSearch: document.getElementById("buttonSearch"), // Seleciona o elemento do DOM com o ID "buttonSearch" e armazena-o na propriedade "buttonSearch" do objeto "elements"
  buttonSend: document.getElementById("sendButton"), // Seleciona o elemento do DOM com o ID "sendButton" e armazena-o na propriedade "buttonSend" do objeto "elements"
  suggestionText: document.getElementById("suggestion"), // Seleciona o elemento do DOM com o ID "suggestion" e armazena-o na propriedade "suggestionText" do objeto "elements"
  rating: document.getElementById("rating"), // Seleciona o elemento do DOM com o ID "rating" e armazena-o na propriedade "rating" do objeto "elements"
  username: document.getElementById("username"), // Seleciona o elemento do DOM com o ID "username" e armazena-o na propriedade "username" do objeto "elements"
  email: document.getElementById("email"), // Seleciona o elemento do DOM com o ID "email" e armazena-o na propriedade "email" do objeto "elements"
  textLog: document.getElementById("textLog"), // Seleciona o elemento do DOM com o ID "textLog" e armazena-o na propriedade "textLog" do objeto "elements"
  hideContainer: document.getElementById("hideContainer"), // Seleciona o elemento do DOM com o ID "hideContainer" e armazena-o na propriedade "hideContainer" do objeto "elements"
  loginButton: document.getElementById("linkButton"), // Seleciona o elemento do DOM com o ID "loginButtonn" e armazena-o na propriedade "loginButton" do objeto "elements"
};

// Função para mostrar mensagens de erro
function showError(message) {
  elements.textLog.style.color = "red"; // Define a cor do texto do elemento "textLog" para vermelho
  elements.textLog.innerHTML = message; // Define o conteúdo do elemento "textLog" como a mensagem de erro fornecida
}

// Função para mostrar mensagens de sucesso
function showSuccess(message) {
  elements.textLog.style.color = "green"; // Define a cor do texto do elemento "textLog" para verde
  elements.textLog.innerHTML = message; // Define o conteúdo do elemento "textLog" como a mensagem de sucesso fornecida
}

// Função para buscar informações do usuário
async function searchUser(e) {
  // Retira o evento padrão do botão
  e.preventDefault();

  const usernameInput = elements.username.value.trim(); // Obtém o valor do campo de entrada de texto "username" e remove espaços em branco do início e do final
  const emailInput = elements.email.value.trim(); // Obtém o valor do campo de entrada de texto "email" e remove espaços em branco do início e do final

  if (usernameInput === "" || emailInput == "") {
    showError("Por favor, insira as informações nos campos obrigatórios!."); // Mostra uma mensagem de erro se o campo de entrada de texto estiver vazio
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/edit/${usernameInput}/${emailInput}`
    ); // Faz uma requisição HTTP GET para a URL `http://localhost:3000/edit/${usernameInput}/${emailInput}`
    const userData = await response.json(); // Converte a resposta para JSON e armazena os dados na variável "userData"

    elements.textLog.innerHTML = ""; // Limpa o conteúdo do elemento "textLog"

    if (!response.ok) {
      showError("Erro na requisição: Usuário não encontrado!"); // Mostra uma mensagem de erro se a resposta não for bem-sucedida (código de status diferente de 2xx)
      elements.hideContainer.style.display = "none";
      console.log(`${response.status} - ${response.statusText}`); // Exibe no console o código de status e a mensagem de status da resposta
      return;
    }

    elements.hideContainer.style.display = "block"; // Exibe o elemento "hideContainer"
    showSuccess("Usuário encontrado"); // Mostra uma mensagem de sucesso
  } catch (error) {
    if (error.message === "Failed to fetch") {
      showError(
        "Houve um erro ao buscar suas informações, não é você, somos nós. 😢"
      ); // Mostra uma mensagem de erro específica para falha na requisição
    } else {
      showError("Houve um erro ao buscar suas informações: " + error); // Mostra uma mensagem de erro genérica para outros erros durante a requisição
    }
  }
}

// Função para atualizar o recurso
function updateResource(e) {
  // Retira o evento padrão do botão
  e.preventDefault();
  const ratingValue = elements.rating.value; // Obtém o valor do campo "rating"
  const suggestionTextValue = elements.suggestionText.value; // Obtém o valor do campo "suggestionText"

  if (!ratingValue || !suggestionTextValue) {
    showError("Os campos não podem ficar vazios!"); // Mostra uma mensagem de erro se algum dos campos estiver vazio
    return;
  }

  const data = {
    rating: ratingValue,
    suggestion: suggestionTextValue,
  }; // Cria um objeto "data" com os valores dos campos "rating" e "suggestionText"

  const usernameValue = elements.username.value; // Obtém o valor do campo "username"

  fetch(`http://localhost:3000/users/${usernameValue}/rating`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }) // Faz uma requisição HTTP PUT para a URL `http://localhost:3000/users/${usernameValue}/rating`, enviando o objeto "data" no corpo da requisição como JSON
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Erro na requisição: O recurso não pôde ser atualizado"
        ); // Lança um erro se a resposta não for bem-sucedida (código de status diferente de 2xx)
      }
      return;
    })
    .then(() => {
      console.log("Recurso atualizado"); // Exibe uma mensagem de sucesso no console
      elements.suggestionText.value = ""; // Limpa o campo "suggestionText"
      elements.rating.value = ""; // Limpa o campo "rating"
      elements.hideContainer.style.display = "none"; // Esconde o elemento "hideContainer"
      showSuccess("Atualizado com sucesso!"); // Mostra uma mensagem de sucesso
      elements.buttonSearch.style.display = "none"; // Esconde o botão de busca
      elements.username.value = ""; // Limpa o campo "username"
      elements.email.value = ""; // Limpa o campo "email"
      setTimeout(() => {
        elements.loginButton.style.display = "block"; // Exibe o botão de login após um atraso de 2000 milissegundos (2 segundos)
      }, 2000);
    })
    .catch((error) => {
      showError("Erro ao atualizar o recurso: " + error); // Mostra uma mensagem de erro caso ocorra um erro durante a atualização do recurso
    });
}

// Adiciona um evento de clique ao botão de busca
elements.buttonSearch.addEventListener("click", searchUser);

// Adiciona um evento de clique ao botão de envio
elements.buttonSend.addEventListener("click", updateResource);
