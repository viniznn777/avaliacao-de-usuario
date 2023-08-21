// Objeto contendo referências aos elementos do DOM
const elements = {
    buttonSearch: document.getElementById("buttonSearch"), // Seleciona o elemento do DOM com o ID "buttonSearch" e armazena-o na propriedade "buttonSearch" do objeto "elements"
    buttonRemove: document.getElementById("buttonRemove"), // Seleciona o elemento do DOM com o ID "buttonRemove" e armazena-o na propriedade "buttonRemove" do objeto "elements"
    username: document.getElementById("username"), // Seleciona o elemento do DOM com o ID "username" e armazena-o na propriedade "username" do objeto "elements"
    email: document.getElementById("email"), // Seleciona o elemento do DOM com o ID "email" e armazena-o na propriedade "email" do objeto "elements"
    textLog: document.getElementById("textLog"), // Seleciona o elemento do DOM com o ID "textLog" e armazena-o na propriedade "textLog" do objeto "elements"
    textLog2: document.getElementById('textLog2'), // Seleciona o elemento do DOM com o ID "textLog2" e armazena-o na propriedade "textLog" do objeto "elements"
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
    // Função para mostrar mensagens de sucesso
function showAlert(message) {
    elements.textLog2.style.color = "yellow"; // Define a cor do texto do elemento "textLog2" para amarelo
    elements.textLog2.innerHTML = message; // Define o conteúdo do elemento "textLog2" como a mensagem de alerta fornecida
    }


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
            console.log(`${response.status} - ${response.statusText}`); // Exibe no console o código de status e a mensagem de status da resposta
            return;
        }
    
          showSuccess("Usuário encontrado"); // Mostra uma mensagem de sucesso
        buttonSearch.style.display = 'none'
        buttonSearch.setAttribute('disabled', '')
        buttonRemove.style.display = 'block'
          showAlert('Deseja mesmo remover sua Avaliação?'); // Mostra uma mensagem de alerta
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

    function deleteUser(e) {
        e.preventDefault()

        // Obtém os valores do input de usuário e email
        const usernameInput = elements.username.value.trim()
        const emailInput = elements.email.value.trim()

        // Verifica se os campos estão vazios
        if(!usernameInput || !emailInput) {
            showError("Por favor, insira as informações nos campos obrigatórios!."); // Mostra uma mensagem de erro se o campo de entrada de texto estiver vazio
            return;
        }
        
        // Faz a requisição DELETE para a API
        fetch(`http://localhost:3000/users/remove_rating/${usernameInput}/${emailInput}`, { method: 'DELETE'})
        .then((response) => {
            if(response.ok) {
                return response.json() // Retorna a resposta como JSON se a requisição for bem-sucedida
            }else if (response.status === 404) { // Lança um erro personalizado se o usuário não for encontrado (status 404)
                throw new Error('Usuário não encontrado');
            }
            else {
                throw new Error('Erro ao deletar avaliação ' + response.statusText); // Lança um erro com a mensagem de status se a requisição não for bem-sucedida
            }
        })
        .then(handleDeleteSuccess) // Chama a função para tratar sucesso
        .catch(handleDeleteError); // Chama a função para tratar erro
    }

    function handleDeleteSuccess(data) {
        elements.textLog2.style.display = 'none';
        showSuccess(data.message); // Exibe a mensagem de sucesso retornada pela API
        elements.buttonRemove.style.display = 'none';
        elements.loginButton.style.display = 'block';
        resetFields();
    }
    
    function handleDeleteError(error) {
        console.error(error);  // Exibe o erro no console para fins de depuração
        elements.textLog.style.color = 'red';
        if (error.message === 'Usuário não encontrado') {
            elements.textLog.innerHTML = 'Impossível deletar. Usuário não encontrado';
            elements.textLog2.style.display = 'none'
            return
        } else {
            elements.textLog.innerHTML = 'Erro ao deletar avaliação, não é você, somos nós 😢';
        }
        elements.textLog2.style.display = 'none';
        resetFields();
    }
    
    function resetFields() {
        elements.email.value = "";
        elements.username.value = "";
    }
    
// Adiciona um evento de clique ao botão de busca
elements.buttonSearch.addEventListener("click", searchUser);

// Adiciona um ouvinte de evento de clique ao botão de remover
elements.buttonRemove.addEventListener("click", deleteUser);