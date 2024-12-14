import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/toastConfig";
import { Domain } from "../utils/constants";

export default function Login() {
  const [email, setEmail] = useState("test1@email.com");
  const [password, setPassword] = useState("test1");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(`${Domain}/api/auth/login`, {
        method: "POST",
        // mode: 'no-cors',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const res = await response.json();

      if (response.status === 200) {
        const { user, token } = res;
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("token", token);
        showToast("Login successful!");
        navigate("/dashboard");
      } else {
        showToast(res.message || "Error during login", "error");
        setError("Invalid credentials");
      }
    } catch (err) {
      showToast("Error during login", "error");
      setError("Invalid credentials");
    }
  };

  // function nave(url) {
  //   window.location.href = url;
  // }

  // async function auth() {
  //   try {
  //     const response = await fetch(`${Domain}/request`, {
  //       method: "POST",
  //     });

  //     const data = await response.json();
  //     console.log(data);
  //     nave(data.url);
  //   } catch (err) {
  //     console.error("Error during Google auth", err);
  //   }
  // }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          className="border p-2 w-full mb-4"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          className="bg-blue-500 w-full py-2 text-white"
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <a className="text-blue-500" href="/signup">
            Signup
          </a>
        </p>
        <button
          className="bg-red-500 w-full py-2 text-white mt-4"
          // onClick={() => auth()}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}
