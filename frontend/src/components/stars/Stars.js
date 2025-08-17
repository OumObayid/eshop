/*
 * eShop Project
 * Copyright (c) 2025 Oumaima El Obayid
 *
 * Description:
 * Stars component displays product ratings as stars.
 * Allows users to submit a new rating, updates Redux store
 * and Firebase Firestore, and shows a tooltip with detailed rating breakdown.
 *
 * License:
 * MIT License
 * https://opensource.org/licenses/MIT
 */

import { useState } from "react";
import StarRatings from "react-star-ratings";
import { setRating } from "../../redux/dataSlice";
import { useDispatch } from "react-redux";
import { db } from "../../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { RiArrowDropDownLine } from "react-icons/ri";
import Tooltip from "react-tooltip-lite";
import "./Stars.css";

const Stars = (props) => {
  const [product, setTabRev] = [...props.actions]; // Product object and function to scroll to reviews

  // Extract individual ratings
  const { rating1: r1, rating2: r2, rating3: r3, rating4: r4, rating5: r5 } = product;

  // Calculate average rating
  const rating = (r1*1 + r2*2 + r3*3 + r4*4 + r5*5) / (r1 + r2 + r3 + r4 + r5 || 1);
  
  // Percentages for tooltip bars
  let per1 = 0, per2 = 0, per3 = 0, per4 = 0, per5 = 0;
  if (r1 || r2 || r3 || r4 || r5) {
    const total = r1*1 + r2*2 + r3*3 + r4*4 + r5*5;
    per1 = Math.round((r1*1*100 / total) * 10) / 10;
    per2 = Math.round((r2*2*100 / total) * 10) / 10;
    per3 = Math.round((r3*3*100 / total) * 10) / 10;
    per4 = Math.round((r4*4*100 / total) * 10) / 10;
    per5 = Math.round((r5*5*100 / total) * 10) / 10;
  }

  // Local state for dynamic rating display
  const [rat, setRat] = useState(rating);

  // Prepare new vote variables
  let newrat1 = r1, newrat2 = r2, newrat3 = r3, newrat4 = r4, newrat5 = r5;

  const dispatch = useDispatch();

  // Function to handle new user rating
  const changeRating = (ratin) => {
    let newRating = null;
    let numRating = null;

    switch (ratin) {
      case 1: newrat1++; numRating=1; break;
      case 2: newrat2++; numRating=2; break;
      case 3: newrat3++; numRating=3; break;
      case 4: newrat4++; numRating=4; break;
      case 5: newrat5++; numRating=5; break;
      default: break;
    }

    // Recalculate average after new vote
    newRating = (newrat1*1 + newrat2*2 + newrat3*3 + newrat4*4 + newrat5*5) /
                (newrat1 + newrat2 + newrat3 + newrat4 + newrat5);

    setRat(newRating);

    // Update Redux store
    dispatch(setRating({ id: product.id, numRat: numRating }));

    // Update Firebase Firestore
    const docRef = doc(db, "products", product.id);   
    updateDoc(docRef, {
      rating1: newrat1,
      rating2: newrat2,
      rating3: newrat3,
      rating4: newrat4,
      rating5: newrat5
    }).catch(console.log);
  };

  // Rounded rating for display
  const res = Math.round(rating * 10) / 10;

  // Scroll to all reviews section
  const viewAllrev = () => {
    setTabRev();
    window.scrollTo(0, 410);
  };

  // Styles for tooltip bars
  const stylePer1 = { width: per1 + "%" };
  const stylePer2 = { width: per2 + "%" };
  const stylePer3 = { width: per3 + "%" };
  const stylePer4 = { width: per4 + "%" };
  const stylePer5 = { width: per5 + "%" };

  return (
    <div className="d-flex justify-content-start mt-3">
      {/* Tooltip with rating breakdown */}
      <Tooltip
        background="white"
        color="black"
        tipContentClassName="arrow-content-tooltip"
        arrow
        direction="down"
        arrowContent={
          <svg style={{ display: "block" }} viewBox="0 0 21 11" width="20px" height="10px">
            <path d="M0,11 L9.43630703,1.0733987 C10.1266203,0.3284971 11.2459708,0 11.936284,1.0733987 L20,11"
                  style={{ stroke: "gray", fill: "white" }}/>
          </svg>
        }
        content={
          <div>
            <ul className="customer-reviews p-0">
              {[5,4,3,2,1].map((star, idx) => (
                <li key={star} className="customer-reviews-item d-flex justify-content-center m-0 p-0">
                  <div className="customer-reviews-stars" style={{color:"#629973"}}>
                    {"★".repeat(star)}
                  </div>
                  <div className="customer-reviews-slide p-0">
                    <span className="customer-reviews-score" style={eval(`stylePer${star}`)}></span>
                  </div>
                  <div className="customer-reviews-per fw-bold text-end px-1 my-1">
                    {eval(`per${star}`)} %
                  </div>
                </li>
              ))}
            </ul>
            <span onClick={viewAllrev} className="text-primary allviewlink fs-5">
              View All Reviews
            </span>
          </div>
        }
      >
        {/* Star rating display */}
        <div className="d-flex justify-content-start mt-3">
          <div className="mb-2 me-2 d-flex align-items-end">
            <StarRatings
              rating={rat}
              isSelectable
              starRatedColor="#FFCA2C"
              starHoverColor="#D48443"
              starDimension="16px"
              starSpacing="1px"
              isAggregateRating={false}
              changeRating={changeRating}
              numOfStars={6}
            />
          </div>
          <span className="fs-4 d-flex align-items-end">
            {res}
            <RiArrowDropDownLine size={20} />
          </span>
        </div>
      </Tooltip>

      {/* Reviews count link */}
      <span
        className="fs-4 ms-3 d-flex align-items-end allviewlink"
        style={{ cursor: "pointer" }}
        onClick={viewAllrev}
      >
        {product.reviews?.length || 0} Reviews
      </span>
    </div>
  );
};

export default Stars;
