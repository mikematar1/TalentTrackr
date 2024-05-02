import axios from "axios";

export default async function EditProfile(data) {
  return axios
    .post("http://127.0.0.1:8000/api/v0.1/seeker/edit", data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
}
