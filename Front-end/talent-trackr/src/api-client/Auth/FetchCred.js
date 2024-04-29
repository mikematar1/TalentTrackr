import axios from "axios";

export default async function FetchCred(data) {
  return axios
    .post("http://127.0.0.1:8000/api/v0.1/auth/login", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}
