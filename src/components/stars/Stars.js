import { useState } from "react";
import StarRatings from "react-star-ratings";
import { setRating } from "../../redux/dataSlice";
import { useDispatch } from "react-redux";
import { db } from "../../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { RiArrowDropDownLine } from "react-icons/ri";
import Tooltip from "react-tooltip-lite";
import "./Stars.css";
import { Link } from "react-router-dom";


const Stars = (props) => {
  const [rat, setRat] = useState(props.stars);
  const [vote, setvote] = useState(props.vote);

  const dispatch = useDispatch();

  const changeRating = (rating) => {
    const newRating = (rat * vote + rating) / (vote + 1).toFixed(3);
    setRat(newRating);
    //  setvote(vote+1)
    dispatch(
      setRating({ id: props.id, rating: newRating, vote: props.vote + 1 })
    );

    const docRef = doc(db, "products", props.id);
    updateDoc(docRef, { rating: newRating, vote: props.vote + 1 })
      .then((docRef) => {
        console.log(
          "A New Document Field has been added to an existing document"
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let res = Math.round(props.stars * 10) / 10;

  const viewAllrev = () => {
    props.handleTab();
    window.scrollTo(0,410)
  }
  return (
    <div className="d-flex justify-content-start  mt-3 ">
      <Tooltip
        background="white"
        color="black"
        tipContentClassName="arrow-content-tooltip"
        arrow={true}
        direction="down"
        arrowContent={
          <svg
            style={{ display: "block" }}
            viewBox="0 0 21 11"
            width="20px"
            height="10px"
          >
            <path
              d="M0,11 L9.43630703,1.0733987 L9.43630703,1.0733987 C10.1266203,0.3284971 11.2459708,0 11.936284,1.0733987 L20,11"
              style={{ stroke: "gray", fill: "white" }}
            />
          </svg>
        }
        content={
          <div>
          <ul className="customer-reviews p-0">            
            <li className="customer-reviews-item d-flex justify-content-center m-0 p-0">
              <div className="customer-reviews-stars ">★★★★★</div>
              <div className="customer-reviews-slide p-0">
                <span
                  className="customer-reviews-score "
                  style={{ width: "81%"}}
                ></span>
              </div>
              <div className="customer-reviews-per fw-bold">81%</div>
            </li>
            <li className="customer-reviews-item d-flex justify-content-center m-0 p-0">
              <div className="customer-reviews-stars ">★★★★</div>
              <div className="customer-reviews-slide p-0">
                <span
                  className="customer-reviews-score"
                  style={{ width: "12%"}}
                ></span>
              </div>
              <div className="customer-reviews-per fw-bold">12%</div>
            </li>
            <li className="customer-reviews-item d-flex justify-content-center m-0 p-0">
              <div className="customer-reviews-stars ">★★★</div>
              <div className="customer-reviews-slide p-0">
                <span
                  className="customer-reviews-score"
                  style={{ width: "3%"}}
                ></span>
              </div>
              <div className="customer-reviews-per fw-bold">3%</div>
            </li>
           
            <li className="customer-reviews-item d-flex justify-content-center m-0 p-0">
              <div className="customer-reviews-stars ">★★</div>
              <div className="customer-reviews-slide p-0">
                <span
                  className="customer-reviews-score"
                  style={{ width: "1%"}}
                ></span>
              </div>
              <div className="customer-reviews-per fw-bold">1%</div>
            </li>
            <li className="customer-reviews-item d-flex justify-content-center m-0 p-0">
              <div className="customer-reviews-stars ">★</div>
              <div className="customer-reviews-slide p-0">
                <span
                  className="customer-reviews-score"
                  style={{ width: "3%"}}
                ></span>
              </div>
              <div className="customer-reviews-per fw-bold">3%</div>
            </li>
            
          </ul>
          <span onClick={viewAllrev} className="text-primary allviewlink fs-5">View All Reviews</span>
          </div>
        }
      >
        <div className="d-flex justify-content-start  mt-3 ">
          <div className=" mb-2 me-2 d-flex align-items-end ">
            <StarRatings
              rating={props.stars}
              isSelectable={true}
              starRatedColor={"#FFCA2C"}
              starHoverColor={"#D48443"}
              starDimension={"16px"}
              starSpacing={"1px"}
              isAggregateRating={false}
              changeRating={changeRating}
              numOfStars={6}
            />
          </div>
          <span className="fs-4 d-flex align-items-end  ">
            {res}
            <RiArrowDropDownLine size={20} />
          </span>
        </div>
      </Tooltip>

      <span className="fs-4 ms-5 d-flex align-items-end allviewlink" onClick={viewAllrev}>
        {props.vote} Reviews
      </span>
    </div>
  );
};

export default Stars;
