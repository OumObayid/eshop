import { useState } from "react";
import StarRatings from "react-star-ratings";
import { setRating } from "../../redux/dataSlice";
import { useDispatch } from "react-redux";
import { db } from "../../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import {RiArrowDropDownLine} from "react-icons/ri"

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
  return (
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
      <span className="fs-4 d-flex align-items-end  ">{res}<RiArrowDropDownLine size={20}/></span>
        
      <span className="fs-4  d-flex align-items-end ">      
        {props.vote} Reviews
      </span>
    </div>
  );
};

export default Stars;
