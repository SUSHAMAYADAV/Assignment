import { Routes, Route } from "react-router-dom";
import HomePage from "./Component/HomePage";
import LoginPage from "./Component/LoginPage";
import ProtectedRoutes from "./Component/ProtectedRoutes";
import Header from "./Component/Header";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<ProtectedRoutes Component={HomePage} />} />
        <Route path="/login" element={<LoginPage />} />
        
        
      </Routes>
    </div>
  );
}

export default App;
