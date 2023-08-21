function get_date() {
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const NOW = new Date();
  const DAY = NOW.getDate();
  const MONTH = NOW.getMonth();
  const YEAR = NOW.getFullYear();

  return `${DAY}/${months.at(MONTH)}/${YEAR}`;
}
module.exports = get_date();
