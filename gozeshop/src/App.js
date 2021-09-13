import Footer from "./components/Footer";
import Header from "./components/Header";
import Container from "./components/UI/Container";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter, Route } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import ScrollToTop from "./components/ScrollToTop";
import CartScreen from "./screens/CartScreen";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Header />
        <main>
          <Container>
            <Route path="/" component={HomeScreen} exact />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
          </Container>
        </main>
        <Footer />
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
