import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import LinksList from "../LinksList/LinksList";
import ProductUi from "../ProductUi/ProductUi";
import Loading from "../Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { SubCategoryContext } from "../../Context/SubCategoryContext";
const ProductsOfSubcategory = () => {
  const navigate = useNavigate();
  const { subCategoryName } = useContext(SubCategoryContext);
  const [subCategoryLinkName, setSubCategoryLinkName] =
    useState(subCategoryName);
  const [title, setTitle] = useState("");
  const [products, setProducts] = useState([]);
  const [notFound, setNotFound] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { subCategoryId } = useParams();

  async function getProducts() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?subcategory=${subCategoryId}`
      );
      setIsError(null);
      setProducts(data.data);
      setIsLoading(false);
      data.data.length > 0 ? setNotFound(null) : setNotFound(true);
    } catch (error) {
      setIsError(error.response?.data?.message || "An error occurred.");
      setProducts([]);
      setNotFound(null);
      setIsLoading(false);
      setTitle("Not Found");
    }
  }

  useEffect(() => {
    const storedSubCategoryName = sessionStorage.getItem("subCategoryName");
    if (!storedSubCategoryName) {
      sessionStorage.clear();
      navigate("/categories/subcategories");
    } else {
      getProducts();
      setSubCategoryLinkName(subCategoryName);
    }

    const handleStorageChange = (event) => {
      if (event.storageArea === sessionStorage) {
        if (
          event.key === "sub categoryName" ||
          event.newValue === null ||
          event.newValue !== subCategoryLinkName
        ) {
          sessionStorage.clear();
          navigate("/categories/subcategories");
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [subCategoryName]);
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title ? title : subCategoryName + " Products"}</title>
      </Helmet>
      <section className="py-5 products">
        <Container>
          {isLoading && <Loading />}
          {isError && <div className="alert alert-danger">{isError}</div>}
          {products.length > 0 && (
            <Row className="gy-5 gx-2">
              <Col sm={12}>
                <LinksList
                  links={[
                    { keys: "Home", values: "/home" },
                    { keys: "Categories", values: "/categories" },
                    {
                      keys: "Sub categories",
                      values: "/categories/subcategories",
                    },
                  ]}
                  activeLink={[
                    {
                      keys: `${subCategoryLinkName} Products`,
                      values: `/categories/subcategories/products/${subCategoryId}`,
                    },
                  ]}
                />
              </Col>
              {products.map((product) => (
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
          {notFound && (
            <Row className="gy-5 gx-2">
              <Col sm={12}>
                <LinksList
                  links={[
                    { keys: "Home", values: "/home" },
                    { keys: "Categories", values: "/categories" },
                    {
                      keys: "Sub categories",
                      values: "/categories/subcategories",
                    },
                  ]}
                  activeLink={[
                    {
                      keys: `${subCategoryLinkName} Products`,
                      values: `/categories/subcategories/products/${subCategoryId}`,
                    },
                  ]}
                />
              </Col>
              <Col sm={12}>
                <div className="alert alert-info">
                  There are no products, try another category
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
    </HelmetProvider>
  );
};

export default ProductsOfSubcategory;
