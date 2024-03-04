import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Col, Container, Row } from "react-bootstrap";
import Loading from "../Loading/Loading";
import LinksList from "../LinksList/LinksList";
import { CategoryContext } from "../../Context/CategoryContext";
import { SubCategoryContext } from "../../Context/SubCategoryContext";

const SubCategoryOfCategory = () => {
  const navigate = useNavigate();
  const { setSubCategoryName } = useContext(SubCategoryContext);
  const { categoryName } = useContext(CategoryContext);
  const [categoryLinkName, setCategoryLinkName] = useState(categoryName);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [notFound, setNotFound] = useState(null);
  const { categoryId } = useParams();

  async function getSubCategories() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
      );
      setIsError(null);
      setSubcategories(data.data);
      setIsLoading(false);
      data.data.length > 0 ? setNotFound(null) : setNotFound(true);
    } catch (error) {
      setIsError(error.response?.data?.message || "An error occurred.");
      setSubcategories([]);
      setNotFound(null);
      setIsLoading(false);
      setTitle("Not Found");
    }
  }

  useEffect(() => {
    const storedCategoryName = sessionStorage.getItem("categoryName");
    if (!storedCategoryName) {
      sessionStorage.clear("categoryName");
      navigate("/categories");
    } else {
      getSubCategories();
      setCategoryLinkName(categoryName);
    }

    const handleStorageChange = (event) => {
      if (event.storageArea === sessionStorage) {
        if (
          event.key === "categoryName" ||
          event.newValue === null ||
          event.newValue !== categoryLinkName
        ) {
          sessionStorage.clear("categoryName");
          navigate("/categories");
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [categoryName]);

  const handleSubCategoryClick = (subCategoryName) => {
    setSubCategoryName(subCategoryName);
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title ? title : categoryName}</title>
      </Helmet>
      <section className="sub-categories py-5">
        <Container>
          {isLoading && <Loading />}
          {isError && <div className="alert alert-danger">{isError}</div>}
          {subcategories.length > 0 && (
            <Row className="gy-4">
              <Col sm={12}>
                <LinksList
                  links={[
                    { keys: "Home", values: "/home" },
                    { keys: "Categories", values: "/categories" },
                  ]}
                  activeLink={[
                    {
                      keys: categoryLinkName + " sub categories",
                      values: `/categories/subcategories/${categoryId}`,
                    },
                  ]}
                />
              </Col>
              {subcategories.map((subcategory) => (
                <Col key={subcategory._id} lg={3} md={4} sm={6}>
                  <Link
                    onClick={() => handleSubCategoryClick(subcategory.name)}
                    to={`/categories/subcategories/products/${subcategory._id}`}
                    className="bg-light d-block py-3 rounded-pill"
                  >
                    <h5 className="text-center text-main fw-bold mb-0">
                      {subcategory.name}
                    </h5>
                  </Link>
                </Col>
              ))}
              <Col sm={12}>
                <Link
                  to={`/categories/products/${categoryId}`}
                  className="text-white btn bg-main fw-bold py-2 w-50 d-block mx-auto"
                >
                  Get all {categoryLinkName} products
                </Link>
              </Col>
            </Row>
          )}
          {notFound && (
            <Row className="gy-4">
              <Col sm={12}>
                <LinksList
                  links={[
                    { keys: "Home", values: "/home" },
                    { keys: "Categories", values: "/categories" },
                  ]}
                  activeLink={[
                    {
                      keys: categoryLinkName + " sub categories",
                      values: `/categories/subcategories/${categoryId}`,
                    },
                  ]}
                />
              </Col>
              <Col sm={12}>
                <div className="alert alert-info">
                  There are no subcategories, try another category
                </div>
              </Col>
              <Col sm={12}>
                <Link
                  to={`/categories/products/${categoryId}`}
                  className="text-white btn bg-main fw-bold py-2 w-50 d-block mx-auto"
                >
                  Get all {categoryLinkName} products
                </Link>
              </Col>
            </Row>
          )}
        </Container>
      </section>
    </HelmetProvider>
  );
};

export default SubCategoryOfCategory;
