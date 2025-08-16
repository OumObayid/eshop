import Category from "./Category";
import { Row, Col } from "reactstrap";
import allcategorys from "../../assets/allcategorys.png";
const CategoryList = ({ categorys }) => {
  return (
    <>
      <div className="text-center">
        <img
          src={allcategorys}
          style={{ height: "5rem", transform: "rotate(-1deg)" }}
          alt="all categorys"
        />
      </div>
      <div className="d-flex justify-content-center">
        <hr
          style={{
            position: "relative",
            top: "-1.25rem",
            backgroundColor: "#434341",
            width: "100%",
          }}
        />
      </div>
      <Row className=" d-flex justify-content-between mb-5">
        {categorys.map((category) => (
          <Col lg="6" md="6" sm="12" xs="12" className="mb-3" key={category.id}>
            <Category category={category} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default CategoryList;
