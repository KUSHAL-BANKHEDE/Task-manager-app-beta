import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/toastConfig";
import { Domain } from "../utils/constants";



export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      
      const res = await axios.post(
        `${Domain}/api/auth/register`,
        {
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password,
        },
        
      );

      console.log(res);
      const { user, token } = res.data;

      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("token", token);
        
      

      navigate("/");
        if (res.stetus===200) {
          showToast("Signup successful!")
        }
        else{
          showToast(res.massage,"error")
        }
    } catch (err) {
         
      showToast("Error signing up","error");

      console.error("Error signing up", err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <input
          className="border p-2 w-full mb-4"
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-4"
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
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
        <input
          className="border p-2 w-full mb-4"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 w-full py-2 text-white"
          onClick={handleSignup}
        >
          Signup
        </button>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a className="text-blue-500" href="/">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
