import { Link } from "react-router-dom";
import "./Category.css";
const Category = ({category}) => {
  return (
    <div className=" m-1 card   p-1  ">
      <Link
        to={`/categoryDetail/${category.id}`}
        className="justify-content-center row"
      >
        <p className=" text-center fs-2 h-25 m-0 ">
          {category.categoryName}
        </p>
        <img
          src={category.imgCat}
          className=" cat m-0"
          alt="imagee"
        />
          <p className="text-center fs-4 h-25 m-3 ">
            {category.titleCat}
          </p>
  
      </Link>
    </div>
  );
};

export default Category;
