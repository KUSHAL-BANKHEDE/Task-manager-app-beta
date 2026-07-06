import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Dashboard from "./component/Dashboard";
import Summary from "./component/Task_summry";
import ProtectedRoute from "./component/protectedRoutes";

function App() {
  return (

    // <div className="text-red-800 ">
    //   <h1>Hello World</h1>
    // </div>
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/dashboard" 
              element={
                <ProtectedRoute>
                <Dashboard />
                </ProtectedRoute>
                
             } 
        />

        <Route path="/summary" 
              element={
                <ProtectedRoute>
                <Summary />
                </ProtectedRoute>
                }
         />
      </Routes>
   
  );
}

export default App;
