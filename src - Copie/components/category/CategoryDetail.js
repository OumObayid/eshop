import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Row,Col } from 'reactstrap';
import { datacategorys,dataProducts } from "../../redux/dataSlice";
import Helmet from '../Helmet/Helmet';
import CardProduct from '../products/cardProduct/CardProduct';
import "./Category.css"
const CategoryDetail = () => {
  const { id } = useParams();
// for having a product details from categoryId

const categorys = useSelector(datacategorys);
console.log('categorys :', categorys);
const categoryId = categorys.filter((item) => item.id === id);
const category = categoryId[0];
const data = useSelector(dataProducts);
console.log('data :', data);
const productsCat=data.filter((item) => item.category === category.categoryName)
console.log('productsCat :', productsCat);
useEffect(() => {
  window.scrollTo(0,0);
}, [])


  return (
    <Helmet title={category.categoryName}>
    <div className=" pt-5 d-flex justify-content-center row fs-5">
      <h1 className='text-center'>{category.categoryName}</h1>
      <hr className='mt-3' style={{ backgroundColor: "#E99734", width: "100%" }} />
       <p className='txtDesc'>
        {category.descCat}
       </p>
       <hr className='mb-5' style={{ backgroundColor: "#E99734", width: "100%" }} />

      <div className="col-md-9 p-0 ">
        <Row className=" d-flex justify-content-between row">
          {productsCat.map((item) => (
                <Col
                  lg="3"
                  md="4"
                  sm="6"
                  xs="6"
                  className="mb-4"
                  key={item.id}
                >
                  <CardProduct item={item}/>
                </Col>
              ))}
        </Row>
      </div>
    </div>   
  </Helmet>
  )
}

export default CategoryDetail