import axios from "axios";

export default async function GetFeedback() {
  return axios({
    method: "get",
    url: "http://127.0.0.1:8000/api/v0.1/feedbacks/",
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
}
