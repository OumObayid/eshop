import { useState } from "react";
import StarRatings from "react-star-ratings";
import { setRating } from "../../redux/dataSlice";
import { useDispatch } from "react-redux";
import { db } from "../../firebase/config";
import { doc, updateDoc } from "firebase/firestore";

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

  return (
    <div>
      <StarRatings
        rating={props.stars}
        isSelectable={true}
        starRatedColor={"#FFCA2C"}
        isAggregateRating={false}
        changeRating={changeRating}
        numOfStars={6}
      />
    </div>
  );
};

export default Stars;
