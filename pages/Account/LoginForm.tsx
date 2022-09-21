import React, { useState } from "react";
import axios from "axios";
import JSEncrypt from "jsencrypt";
import Router, { useRouter } from "next/router";

type Props = {};

const LoginForm = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const username = useFormInput("");
  const password = useFormInput("");
  const [error, setError] = useState(null);
  const handleLogin = () => {
    const uuid = uniqueGuid();
    const publicKey =
      "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDAjQDj9Iwjyb7oqzr1/XoTrH9qBvnaFqH8JKvVtgIxPm4KRCeV5dqifzbE/IE525NQPiv6H1nBEn9Khr7iKb3Kdt/t2YiozwDYvfWGw19n3cUtWFTC0sWaouhEeW1lSV7f1fGtslZN4pORJdiHyTUsdGV5UmNs7nyKBumM9yyeawIDAQAB";
    setError(null);
    setLoading(true);
    // const cryptr = new Cryptr(publicKey);

    // const encryptRsa = new EncryptRsa();

    // const encryptedPassword = encryptRsa.encryptStringWithRsaPublicKey({
    //     text: password.value,
    //     publicKey,
    //   });
    // const  encryptedPassword = encryptRsa.encryptStringWithRsaPublicKey(password.value,RsaPublicKey);
    //  let RSAEncrypt = new JSEncrypt({ default_key_size: '1024' });
    //   RSAEncrypt.setPublicKey(RsaPublicKey)
    //    const encryptedPassword = RSAEncrypt.encrypt(password.value);
    const loginRequest = {
      username: username.value.toLowerCase(),
      password: password.value,
      uuid,
    };
    const headers = {
      "Content-Type": "application/json",
      withCredentials: false,
      timeout: 20000, // 20 seconds
    };
    axios
      .post("https://dev-user-api.sky11.com/api/v1/user/login", loginRequest)
      .then((response) => {
        setLoading(false);
        console.log("response", response.data.jwtToken);

        Router.push({
          pathname: "./MainPage",
          query: { name: response.data.jwtToken.slice(0, 20) },
        });
      })
      .catch((error) => {
        setLoading(false);
        console.log("err,", error);
      });
  };
  const uniqueGuid = (): string => {
    const id = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      id() +
      id() +
      "-" +
      id() +
      "-" +
      id() +
      "-" +
      id() +
      "-" +
      id() +
      id() +
      id()
    );
  };
  return (
    <div>
      Login
      <br />
      <br />
      <div>
        Username
        <br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password
        <br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && (
        <>
          <small style={{ color: "red" }}>{error}</small>
          <br />
        </>
      )}
      <br />
      <input
        type="button"
        value={loading ? "Loading..." : "Login"}
        onClick={handleLogin}
        disabled={loading}
      />
      <br />
    </div>
  );
};
const useFormInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: { target: { value: any } }) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default LoginForm;
