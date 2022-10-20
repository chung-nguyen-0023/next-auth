import { useRouter } from "next/router";
import React, { SyntheticEvent, useState } from "react";
import Layout from "../layouts/Layout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        localStorage.setItem("jwt_token_key", data.access_token);
        await router.push("/");
      });
  };

  return (
    <Layout>
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Đăng nhập</h1>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            placeholder="Mật khẩu"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Đăng nhập
        </button>
      </form>
    </Layout>
  );
};

export default Login;
