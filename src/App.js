import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";

function App() {

  const { currentUser } = useContext(AuthContext)
  console.log(currentUser)

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/Login" />
    }
    return children
  }

  return (
    <BrowserRouter>
      <div className="App col-12 ">
        <Routes>
          <Route path="/">
            <Route index element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Sidebar" element={<Sidebar />} />
            <Route path="/Chat" element={<Chat />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
