import { BrowserRouter, Routes, Route } from "react-router-dom";
//pages
import {Home, Contact, Login, Register, Reset, Admin} from "./pages"
//components
import {Header, Footer} from "./Components/index"
import AdminOnlyRoute from "Components/adminOnlyRoute/AdminOnlyRoute";
import ProductDetails from "Components/product/productDetails/ProductDetails";
import Cart from "pages/cart/Cart";
import OrderDetails from "pages/orderDetails/OrderDetails";
import NotFound from "pages/notFound/NotFound";
import AboutUs from "pages/aboutUs/AboutUs";

function App() {
  return (
    <>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />

          <Route
            path="/admin/*"
            element={
              // only acessible to admin
               <AdminOnlyRoute> 
                <Admin />
              </AdminOnlyRoute>
            }
          />

          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
