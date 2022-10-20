import { useRouter } from "next/router";
import React, { SyntheticEvent, useState } from "react";
import Layout from "../layouts/Layout";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (response.status === 200) {
      await router.push("/login");
    }
  };

  return (
    <Layout>
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Đăng ký</h1>

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="Tên người dùng"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          Đăng ký
        </button>
      </form>
    </Layout>
  );
};

export default Register;
