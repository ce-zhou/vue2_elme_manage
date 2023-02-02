import axios from "../http";
function login(data) {
  return axios.post("/adminUser/login", data);
}
export default {
  login,
};
