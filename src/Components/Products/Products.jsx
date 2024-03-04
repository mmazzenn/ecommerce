import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import LinksList from "../LinksList/LinksList";
import ProductUi from "../ProductUi/ProductUi";
import Loading from "../Loading/Loading";

const Products = () => {
  const loaction = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchList, setSearchList] = useState([]);
  const loactionPathName = loaction.pathname.slice(1);
  const [isError, setIsError] = useState(null);
  let { data, isLoading } = useQuery("Products", getProducts, {
    onError: (error) => {
      setIsError(error.response?.data?.message || "An error occurred.");
    },
    enabled: !isError,
  });

  async function getProducts() {
    setIsError(null);
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  useEffect(() => {
    setSearchList(
      data?.data?.data.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  useEffect(() => {
    setSearchList(data?.data?.data);
  }, [data]);

  return (
    <HelmetProvider>
      {loactionPathName === "products" && (
        <Helmet>
          <title>Products</title>
        </Helmet>
      )}
      <section className="py-5 products">
        <Container>
          {loactionPathName === "products" && isLoading ? <Loading /> : null}
          {isError && <div className="alert alert-danger">{isError}</div>}
          {data?.data?.data.length > 0 && (
            <Row className="gy-4 gx-3">
              {loactionPathName === "products" && (
                <>
                  <Col sm={12}>
                    <LinksList
                      links={[{ keys: "Home", values: "/home" }]}
                      activeLink={[{ keys: "Products", values: "/products" }]}
                    />
                  </Col>
                  <Col sm={12}>
                    <input
                      onChange={(e) => setSearchTerm(e.target.value)}
                      type="search"
                      name="searchProducts"
                      className="form-control mb-4"
                    />
                  </Col>
                </>
              )}
              {searchList
                ?.slice(0, loactionPathName !== "products" ? 12 : undefined)
                .map((product) => (
                  <ProductUi
                    key={product.id}
                    product={{
                      id: product.id,
                      img: product.imageCover,
                      categoryName: product.category.name,
                      title: product.title,
                      price: product.price,
                      rating: product.ratingsAverage,
                    }}
                  />
                ))}
            </Row>
          )}
        </Container>
      </section>
    </HelmetProvider>
  );
};

export default Products;
