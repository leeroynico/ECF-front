import logo from "./logo.svg";
// import "./App.css";
import Home from "./components/Home";
import Login from "./components/login/LoginView";
import Charts from "./components/charts/Charts";

function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      <Login />
      <Charts />
    </div>
  );
}

export default App;
