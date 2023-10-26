import * as Yup from "yup";

export default Yup.object().shape({
  idSelectedCustomer: Yup.number("O id do cliente tem que ser um número.").test(
    "is-incorrect",
    "O cliente precisa estar selecionado.",
    (val) => val > 0
  ),
});
