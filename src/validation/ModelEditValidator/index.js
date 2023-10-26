import * as Yup from "yup";

export default Yup.object().shape({
  name: Yup.string("O nome do modelo tem que ser um texto.").required(
    "O nome do modelo é obrigatório."
  ),
});
