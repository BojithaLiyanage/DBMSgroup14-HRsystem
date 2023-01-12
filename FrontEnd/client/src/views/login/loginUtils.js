import { createContext, useContext, useState } from "react";
import axios from "axios";

export const login = ({ username, password }) =>
  new Promise((resolve, reject) => {
    if (username && password) {
      const data = {
        username: username,
        password: password,
      };

      const url = "http://localhost:3001/user/login";
      //axios.defaults.withCredentials = true;
      axios
        .post(url, data)
        .then((res) => {
          if (res.request.status === 200 || res.request.status === 201) {
            // setRole(res.data.role);
            let token = res.data.token;
            let userId = res.data.user_id;
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("userId", userId);
            sessionStorage.setItem("username", res.data.username);
            sessionStorage.setItem("paygrade", res.data.paygrade);
            sessionStorage.setItem("type", res.data.type);
            // setUserName(sessionStorage.getItem("user"));
            // setAlertShow(false);
            // setAlertMessage("");
            resolve(res.data.paygrade);
          } else {
            reject(res.data.message);
          }
        })
        .catch((err) => {
          //switch (err.request.status) {
          // case 400:
          // setAlertMessage(err.response.data.message);
          // setAlertShow(true);
          // break;
          // case 401:
          // setAlertMessage(err.response.data.message);
          // setAlertShow(true);
          // break;
          // case 500:
          // setAlertMessage("Server Error!");
          // setAlertShow(true);
          // break;
          // case 501:
          // setAlertMessage("Server Error!");
          // setAlertShow(true);
          // break;
          // case 502:
          // setAlertMessage("Server Error!");
          // setAlertShow(true);
          // break;
          // default:
          // break;
          //}
          reject(err);
        });
    }
  });

export const logout = () => {
  sessionStorage.clear();
};
