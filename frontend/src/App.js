import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Dashboard from "./component/Dashboard";

function App() {
  return (

    // <div className="text-red-800 ">
    //   <h1>Hello World</h1>
    // </div>
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
   
  );
}

export default App;
