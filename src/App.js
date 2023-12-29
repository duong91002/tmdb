import "./App.css";
import Container from "./components/container/Container";
import Footer from "./components/footer/Footer";
import FacebookSDK from "./FacebookSDK";
function App() {
  return (
    <div className="App">
      <FacebookSDK />
      <Container />
      <Footer />
    </div>
  );
}

export default App;
