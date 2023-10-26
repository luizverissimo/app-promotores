import * as Yup from "yup";

const regexComplexityPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])/;

export default Yup.object().shape({
  name: Yup.string("O nome tem que ser um texto.").required(
    "O nome é obrigatório."
  ),
  email: Yup.string("O E-mail tem que ser um texto.")
    .email("E-mail invalido")
    .required("E-mail é obrigatório."),
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
    .matches(/^\d+$/, "O telefone não pode ter espaços ou formatação."),
  password: Yup.string("A senha tem que ser um texto.")
    .min(6, "O número minimo para senha é 6 caracteres.")
    .matches(
      regexComplexityPassword,
      "A senha deve conter um número e uma letra."
    ),
  operationalArea: Yup.string("O nome tem que ser um texto.").required(
    "O campo area de atuação é obrigatório."
  ),
});
