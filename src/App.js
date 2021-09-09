import Footer from "./components/Footer";
import Header from "./components/Header";
import Container from "./components/UI/Container";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter, Route } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path='/product/:id' component={ProductScreen }/>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
