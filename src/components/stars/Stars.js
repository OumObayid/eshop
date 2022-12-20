import { useState } from "react";
import StarRatings from "react-star-ratings";
import {setRating} from "../../redux/dataSlice";
import { useDispatch } from "react-redux";


const Stars = (props) => {
 
  console.log(props.stars)
  console.log(props.vote)
  const [rat, setRat] = useState(props.stars);
  const [vote, setvote] = useState(props.vote);

  const dispatch=useDispatch();

 const  changeRating = (rating) => {
  const newRating = ((rat*vote)+rating)/(vote+1).toFixed(3);
   setRat(newRating)
  //  setvote(vote+1)
       dispatch(setRating({id:props.id,stars:newRating}))  
  } 
  
  return (
    <div>
          <StarRatings
            rating={props.stars}
            isSelectable={true}
            starRatedColor={'#FFCA2C'}
            isAggregateRating={false}
            changeRating={changeRating}
            numOfStars={6}
          />
        </div>
  );
};

export default Stars;
