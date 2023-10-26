import api from "./api";

const auth = {
  async signIn({ email, password }) {
    try {
      const responseSignin = await api
        .post("/login", {
          email,
          password,
        })
        .then(async (response) => {
          return response.data;
        })
        .catch((error) => {
          return error;
        });
      return responseSignin;
    } catch (error) {
      console.log(error);
    }
  },
};

export default auth;
