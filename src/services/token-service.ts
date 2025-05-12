import Cookies from "js-cookie";

export const TOKEN_KEY = "ts-token";

const TokenService = {
  getToken: () => {
    return Cookies.get(TOKEN_KEY);
  },
  setToken: (token: string) => {
    Cookies.set(TOKEN_KEY, token);
  },
  removeToken: () => {
    Cookies.remove(TOKEN_KEY);
  },
};

export default TokenService;