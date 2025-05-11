import Cookies from "js-cookie";

const TokenService = {
  getToken: () => {
    return Cookies.get("token");
  },
  setToken: (token: string) => {
    Cookies.set("token", token);
  },
  removeToken: () => {
    Cookies.remove("token");
  },
};

export default TokenService;