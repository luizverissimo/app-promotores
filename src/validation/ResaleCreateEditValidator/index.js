import * as Yup from "yup";

export default Yup.object().shape({
  name: Yup.string("O nome tem que ser do tipo texto.").required(
    "O nome é obrigatório."
  ),
  phone: Yup.string("O telefone tem que ser do tipo texto.")
    .test(
      "len",
      "Os numeros devem estar com o DDD e o celular com 9 digitos.",
      (val) =>
        val &&
        (val.length === 11 ||
          val.length === 13 ||
          (val.length === 12 &&
            parseInt(val.charAt(4)) > 1 &&
            parseInt(val.charAt(4)) < 6) ||
          (val.length === 10 &&
            parseInt(val.charAt(2)) > 1 &&
            parseInt(val.charAt(2)) < 6))
    )
    .matches(/^\d+$/, "O telefone não pode ter espaços ou formatação.")
    .required("O numero de telefone é obrigatório."),
  formatted_address: Yup.string("O endereço tem que ser um texto.").required(
    "O endereço é obrigatorio."
  ),
});
