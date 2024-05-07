import axios from "axios";

export default async function GetMatches() {
  return axios({
    method: "get",
    url: "http://127.0.0.1:8000/api/v0.1/seeker/getmatches",
    headers: { Authorization: localStorage.getItem("token") },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
}
