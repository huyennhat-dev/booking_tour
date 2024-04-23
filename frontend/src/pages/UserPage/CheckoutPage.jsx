import NavBar from "../../components/User/Navbar";
import Footer from "../../components/User/Footer";
import CheckoutStatus from "../../components/User/CheckoutStatus";

const CheckoutPage = () => {
  return (
    <>
      <NavBar />
      <CheckoutStatus status="checkout" />
      <Footer />
    </>
  );
};

export default CheckoutPage;
