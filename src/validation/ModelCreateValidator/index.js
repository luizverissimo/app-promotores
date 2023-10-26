import * as Yup from "yup";

export default Yup.object().shape({
  idSelectedBrand: Yup.number("O id da marca tem que ser um número").test(
    "is-incorrect",
    "A marca precisa estar selecionada.",
    (val) => val > 0
  ),

  idSelectedEquipament: Yup.number(
    "O id do equipamento tem que ser um número"
  ).test(
    "is-incorrect",
    "O equipamento precisa estar selecionado.",
    (val) => val > 0
  ),

  name: Yup.string("O nome do modelo tem que ser um texto.").required(
    "O nome do modelo é obrigatório."
  ),
});
