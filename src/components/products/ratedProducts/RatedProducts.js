import { Row, Col } from "reactstrap";
import {SlideProduct,CardProduct}  from "../../../components";
import WellRatedProducts from "../../../assets/Well-Rated-Products.png"

const RatedProducts = ({ products }) => {
  const sortProducts = products.sort((a, b) => {
    const a1 = a.rating1;
    const a2 = a.rating2;
    const a3 = a.rating3;
    const a4 = a.rating4;
    const a5 = a.rating5;
    const ratingA =
      (a1 * 1 + a2 * 2 + a3 * 3 + a4 * 4 + a5 * 5) / (a1 + a2 + a3 + a4 + a5);
    const b1 = b.rating1;
    const b2 = b.rating2;
    const b3 = b.rating3;
    const b4 = b.rating4;
    const b5 = b.rating5;
    const ratingB =
      (b1 * 1 + b2 * 2 + b3 * 3 + b4 * 4 + b5 * 5) / (b1 + b2 + b3 + b4 + b5);
    return ratingA < ratingB ? 1 : ratingA > ratingB ? -1 : 0;
  });
const productRatedTop=sortProducts.slice(0,10)


  return (
    <div className="ratedmargTop">
      <div className="text-center">
        <img src={WellRatedProducts} style={{height:"4.7rem"}} alt="Well Rated Products" />
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
      <SlideProduct >
        {productRatedTop.map((product,index) => (
          <Col lg="3" md="3" sm="12" xs="12" className="mb-3" key={index}>
            <CardProduct item={product} />
          </Col>
        ))}
        </SlideProduct>
      </Row>
    </div>
  );
};

export default RatedProducts;
