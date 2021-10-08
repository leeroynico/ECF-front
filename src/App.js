import logo from "./logo.svg";
// import "./App.css";
import Home from "./components/Home";
import Login from "./components/login/LoginView";
import Charts from "./components/charts/Charts";
import CsvImport from "./components/csv/CsvImport";

function App() {
  return (
    <div className="App">
      <CsvImport />
      {/* <Home /> 
      <Login />
      <Charts />*/}
    </div>
  );
}

export default App;
