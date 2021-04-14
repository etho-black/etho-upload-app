import axios from "axios";

export default axios.create({
  baseURL: "http://8.9.37.205:8080",
  headers: {
    "Content-type": "application/json"
  }
});
