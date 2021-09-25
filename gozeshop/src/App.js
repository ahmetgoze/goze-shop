import Footer from "./components/Footer";
import Header from "./components/Header";
import Container from "./components/UI/Container";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter, Route } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import ScrollToTop from "./components/ScrollToTop";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";

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
            <Route path="/userlist" component={UserListScreen} />
            <Route path="/productlist" component={ProductListScreen} exact />
            <Route path="/login" component={LoginScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/user-:id-edit" component={UserEditScreen} />
          </Container>
        </main>
        <Footer />
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
