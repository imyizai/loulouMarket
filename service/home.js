import axios from "../src/utils/axios";
export function getHome(params) {
  return axios.get("/index-infos");
}
