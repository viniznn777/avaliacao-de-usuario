# API de avaliação de usuário
 Página web conectada a uma API de avaliação de usuário, com requisições GET, POST, PUT, DELETE

Descrição do Projeto - Sistema de Avaliação de Usuário

🌟 Este projeto é uma API de avaliação de usuários acompanhada por uma página web que permite aos usuários inserir suas avaliações, visualizá-las, editar e, se necessário, reenviar os dados para a API. O objetivo principal é coletar feedbacks e sugestões dos usuários para melhorar a experiência do site.

***Funcionalidades do Projeto***:

**Avaliação do Usuário:**

📝 O usuário pode inserir uma avaliação fornecendo seu nome de usuário, email, nota para o site e sugestão.
⚠️ Todos os campos são obrigatórios, e caso algum deles não seja preenchido, o sistema exibirá uma mensagem de alerta para o usuário informando que os campos não podem ficar vazios.
🚀 Os dados preenchidos são enviados para a API de avaliação.
✅ Em caso de sucesso, o usuário será redirecionado para uma página de confirmação; em caso de erro, será redirecionado para uma página de erro.

![enviarAvaliação](https://github.com/viniznn777/avaliacao-de-usuario/assets/103951509/de49d919-8b28-4037-98d3-aebe8b245f16)

---

**Visualização da Avaliação:**

👀 Na página de confirmação, o usuário encontrará um botão "Ver Avaliação".
🔍 Ao clicar, o usuário será direcionado para uma página onde pode pesquisar sua avaliação por nome de usuário.
❌ Se o usuário não for encontrado, uma mensagem de erro será exibida.
✅ Caso contrário, informações da avaliação, exceto o email, serão exibidas por questões de segurança.

![verAvaliação](https://github.com/viniznn777/avaliacao-de-usuario/assets/103951509/ed23fbdd-2616-4ac3-bcee-6ff9ffee5ca6)

---

**Edição da Avaliação:**

🖊️ Na página de visualização da avaliação, o usuário encontrará um botão "Editar Avaliação".
📝 Clicando nele, será redirecionado para uma página de edição, onde pode alterar a nota e sugestão.
🔐 O nome de usuário e email serão solicitados novamente para verificar a autenticidade.
✅ Após a edição, o usuário poderá confirmar as alterações.

![editarAvaliação](https://github.com/viniznn777/avaliacao-de-usuario/assets/103951509/cb21db40-e3a4-446b-bd97-45139496cea7)

---

**Remoção de Avaliação:**

❌ O usuário também tem a opção de remover sua avaliação.
🏠 Na página inicial, após criar uma avaliação, o usuário encontrará um botão "Remover Avaliação".
🚫 Ao clicar nele, será redirecionado para uma página de remoção, onde deverá fornecer o nome de usuário e email para autenticação.
❌ Caso o usuário não seja encontrado, uma mensagem de erro será exibida informando que o usuário não foi encontrado.
❗ Se os campos de nome de usuário e email não forem preenchidos, uma mensagem de erro também será exibida, indicando que os campos são obrigatórios.
✅ Em caso de sucesso na remoção, uma mensagem de confirmação será exibida, indicando que a avaliação foi removida com sucesso.

![removerAvaliação](https://github.com/viniznn777/avaliacao-de-usuario/assets/103951509/2c80fe51-7da4-47a8-b824-637794dcf8ba)

---

**Tecnologias Utilizadas:**

🛠️ JavaScript para lógica do frontend e manipulação da API.
🎨 HTML e CSS para criação e estilização das páginas.
🔗 API de avaliação de usuário para armazenar e recuperar avaliações.
🌐 Fetch API para realizar requisições HTTP para a API.
❗ Tratamento de erros para fornecer feedback em problemas de envio ou busca.

**Considerações Finais:**

🌟 Este projeto busca coletar feedbacks e sugestões dos usuários para aprimorar o site. A funcionalidade de edição permite atualizações das avaliações, fortalecendo o engajamento e interação dos usuários.


## Fique a vontade para enviar sugestões para implementar na api ou no Front-end

--**Link**-- [Instagram](https://www.instagram.com/viniciuskauandev) <br>
--**Link**-- [Portfólio](https://viniciuskaua.vercel.app)
