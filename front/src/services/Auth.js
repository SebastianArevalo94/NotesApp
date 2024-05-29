import axios from "axios";
import { url, LOGIN } from "../endpoints/endpoints";

export const LoginHTTP = async (user) => {
  try {
    const response = await fetch(url+ LOGIN, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};
