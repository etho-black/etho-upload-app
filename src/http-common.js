import axios from "axios";

export default axios.create({
  baseURL: "https://middleware.ethoprotocol.com",
  headers: {
    "Content-type": "application/json"
  }
});
