import "./App.css";
import RouterConfig from "./routers/RoutersConfigs";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <Navbar />
      <RouterConfig />
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default App;
