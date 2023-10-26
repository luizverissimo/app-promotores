import * as Yup from "yup";

export default Yup.object().shape({
  idSelectedCustomer: Yup.number("O id do cliente tem que ser um número.").test(
    "is-incorrect",
    "O cliente precisa estar selecionado.",
    (val) => val > 0
  ),

  idSelectedModel: Yup.number("O id do modelo tem que ser um número.").test(
    "is-incorrect",
    "O modelo precisa estar selecionado.",
    (val) => val > 0
  ),

  title: Yup.string("O título tem que ser um texto.").required(
    "O titulo é obrigatório."
  ),
  description: Yup.string("A descrição tem que ser um texto.").required(
    "A descrição é obrigatória."
  ),
});
