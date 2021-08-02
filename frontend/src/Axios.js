import Axios from "axios";

// Local Dev
export const axios = Axios.create({
  baseURL: "http://localhost/api/",
});
