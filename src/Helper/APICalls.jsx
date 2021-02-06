import axios from "axios";

const api_key = "uR1j3A82i48Cvvn6A4pQRWBCIhUCIvG7";

export const GetData = (url, payload = []) => {
  url += "?api-key=" + api_key;
  for (const item in payload) {
    url += "&" + item + "=" + payload[item];
  }
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(err);
    });
};
