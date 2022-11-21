import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import { getSession } from "next-auth/react";

export default function Home() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const session = await getSession();
      if (session) {
        setMessage(`Hi ${session.user.name}`);
      } else {
        const token = localStorage.getItem("jwt_token_key");

        try {
          const response = await fetch("http://localhost:8000/api/me", {
            headers: { Authorization: "Bearer " + token },
          });
          if (response.status !== 200) {
            localStorage.removeItem("jwt_token_key");
            await router.push("/login");
          } else {
            const content = await response.json();
            setMessage(`Hi ${content.data.name}`);
          }
        } catch (e) {
          localStorage.removeItem("jwt_token_key");
          await router.push("/login");
        }
      }
    })();
  }, [router]);

  return <Layout>{message}</Layout>;
}
