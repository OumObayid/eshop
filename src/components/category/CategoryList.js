import Category from "./Category";
import { Row, Col } from "reactstrap";
import allcategorys from "../../assets/allcategorys.png"
const CategoryList = ({ categorys }) => {
  return (
    <>
      <div className="mb-3 d-flex justify-content-center">
        {/* <h1 className="text-center txtTitre  mb-5">All Categorys</h1> */}
        <img src={allcategorys} style={{height:"65px"}} alt="all categorys" />
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
