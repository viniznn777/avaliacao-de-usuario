// Obtendo os elementos do DOM
let InputRange = document.getElementById("rating");
let LabelRating = document.getElementById("labelRating");

// Definindo uma função de callback para o evento "input" do InputRange
InputRange.oninput = function () {
  // Verificando o valor do InputRange e definindo a cor do LabelRating
  if (this.value < 5) {
    LabelRating.style.color = "red";
  } else if (this.value == 5) {
    LabelRating.style.color = "yellow";
  } else if (this.value > 5) {
    LabelRating.style.color = "green";
  }

  // Atualizando o conteúdo do LabelRating com a nota selecionada
  LabelRating.innerHTML = `NOTA: ${this.value}`;
};

// A linha 3 obtém o elemento do DOM com o ID "rating" e armazena na variável InputRange.
// A linha 4 obtém o elemento do DOM com o ID "labelRating" e armazena na variável LabelRating.
// A linha 7 define uma função de callback para o evento "input" do InputRange.
// A partir da linha 8, a função de callback é executada sempre que o valor do InputRange é alterado.
// A linha 10 verifica se o valor do InputRange é menor que 5 e define a cor do LabelRating como vermelho ("red").
// A linha 12 verifica se o valor do InputRange é igual a 5 e define a cor do LabelRating como amarelo ("yellow").
// A linha 14 verifica se o valor do InputRange é maior que 5 e define a cor do LabelRating como verde ("green").
// A linha 17 atualiza o conteúdo do LabelRating para exibir a nota selecionada, interpolando o valor do InputRange usando a sintaxe de template string (${this.value}).
