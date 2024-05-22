// import Login from "./Pages/login";
import CreditScoreForm from "./Pages/CreditScoreForm";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Table from "./Pages/Table";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CreditScoreForm />} />
        <Route path="/table" element={<Table />} />
      </Routes>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        newestOnTop={false}
        closeOnClick
      />
    </div>
  );
}

export default App;
