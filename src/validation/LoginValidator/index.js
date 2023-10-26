import * as Yup from "yup";

const regexComplexityPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])/;

export default Yup.object().shape({
  email: Yup.string("O email tem que ser um texto.")
    .email("E-mail invalido")
    .required("E-mail é obrigatório."),
  password: Yup.string("A senha tem que ser um texto.")
    .min(6, "O número minimo para senha é 6 caracteres.")
    .matches(
      regexComplexityPassword,
      "A senha deve conter um número e uma letra."
    )
    .required("A senha é obrigatória"),
});
