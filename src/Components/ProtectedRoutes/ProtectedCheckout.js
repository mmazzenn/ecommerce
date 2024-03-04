import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import Loading from "../Loading/Loading";
import { Container } from "react-bootstrap";

const ProtectedCheckout = (props) => {
  const { cartItemsNumber, getCart } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        await getCart();
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, [getCart]);

  if (isLoading) {
    return (
      <Container className="py-5">
        <Loading />
      </Container>
    );
  } else if (cartItemsNumber > 0) {
    return props.children;
  } else {
    return <Navigate to={"/home"} />;
  }
};

export default ProtectedCheckout;
