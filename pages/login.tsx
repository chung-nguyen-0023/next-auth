import { useRouter } from "next/router";
import React, { SyntheticEvent, useState, useEffect } from "react";
import Layout from "../layouts/Layout";
import { getSession, signIn } from "next-auth/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const session = await getSession();
      if (session) {
        router.push("/");
      }
    })();
  }, [router]);

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
      <div className="login-page-wrapper">
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
        <div className="social-login-wrapper">
          <button className="google" onClick={() => signIn("google")}>Đăng nhập bằng Google</button>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
