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
  const [product, setTabRev] = [...props.actions];
  const r1 = product.rating1;
  const r2 = product.rating2;
  const r3 = product.rating3;
  const r4 = product.rating4;
  const r5 = product.rating5;

  const rating =
    (r1 * 1 + r2 * 2 + r3 * 3 + r4 * 4 + r5 * 5) / (r1 + r2 + r3 + r4 + r5);
    let per1 = 0;
    let per2 = 0;
    let per3 = 0;
    let per4 = 0;
    let per5 = 0;
 const [rat, setRat] = useState(rating);
  
 if (r1!==0 || r2!==0 || r3!==0 || r4!==0 || r5!==0) {
   per1 = (r1 * 1)*100 / (r1 * 1 + r2 * 2 + r3 * 3 + r4 * 4 + r5 * 5);
   per2 = (r2 * 2)*100 / (r1 * 1 + r2 * 2 + r3 * 3 + r4 * 4 + r5 * 5);
   per3 = (r3 * 3)*100 / (r1 * 1 + r2 * 2 + r3 * 3 + r4 * 4 + r5 * 5);
   per4 = (r4 * 4)*100 / (r1 * 1 + r2 * 2 + r3 * 3 + r4 * 4 + r5 * 5);
   per5 = (r5 * 5)*100 / (r1 * 1 + r2 * 2 + r3 * 3 + r4 * 4 + r5 * 5);

   // to arrunding per
   per1= Math.round(per1 * 10) / 10
   per2= Math.round(per2 * 10) / 10
   per3= Math.round(per3 * 10) / 10
   per4= Math.round(per4 * 10) / 10
   per5= Math.round(per5 * 10) / 10
}
 //new vote to delare
  let newrat1=r1;
  let newrat2=r2;
  let newrat3=r3;
  let newrat4=r4;
  let newrat5=r5;

  
  const dispatch = useDispatch();
  //calling function to rat
  const changeRating = (ratin) => {
    let newRating=null;
    let numRating=null;
    switch (ratin) {
      case 1:
        newRating =((r1+1)*1 + (r2)*2 + (r3)*3 + (r4)*4 + (r5)*5)/(r1+r2+r3+r4+r5+1);
        numRating=1;
        newrat1=r1+1;
        break;
      case 2:
        newRating =((r1)*1 + (r2+1)*2 + (r3)*3 + (r4)*4 + (r5)*5)/(r1+r2+r3+r4+r5+1);
        numRating=2;
        newrat2=r2+1;
        break;
      case 3:
        newRating =((r1)*1 + (r2)*2 + (r3+1)*3 + (r4)*4 + (r5)*5)/(r1+r2+r3+r4+r5+1);
        numRating=3;
        newrat3=r1+3
        break;
      case 4:
        newRating =((r1)*1 + (r2)*2 + (r3)*3 + (r4+1)*4 + (r5)*5)/(r1+r2+r3+r4+r5+1);
        numRating=4
        newrat4=r4+1
        break;
      case 5:
        newRating =((r1)*1 + (r2)*2 + (r3)*3 + (r4)*4 + (r5+1)*5)/(r1+r2+r3+r4+r5+1);
        numRating=5
        newrat5=r5+1
        break;
      default:
        break;
    }

    // const newRating = (rat * vote + ratin) / (vote + 1).toFixed(3);
    setRat(newRating);
    //  setvote(vote+1)
    
    dispatch(
      setRating({ id: product.id, numRat: numRating })
    );

    const docRef = doc(db, "products", product.id);   
    updateDoc(docRef, { rating1: newrat1,rating2: newrat2,rating3: newrat3,rating4: newrat4,rating5: newrat5 })
      .then((docRef) => {
        console.log(
          "A New Document Field has been added to an existing document"
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let res = Math.round(rating * 10) / 10;

  const viewAllrev = () => {
    setTabRev();
    window.scrollTo(0, 410);
  };

  var stylePer5= { 
    width: per5+"%"
  };
  var stylePer4= {
    width: per4+"%"
  };
  var stylePer3= {
    width: per3+"%"
  };
  var stylePer2= {
    width: per2+"%"
  };
  var stylePer1= {
    width: per1+"%"
  };
 
  
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
                <div className="customer-reviews-stars" style={{color:"#629973"}}>★★★★★</div>
                <div className="customer-reviews-slide p-0">
                  <span
                    className="customer-reviews-score "
                    style={stylePer5}
                   
                  ></span>
                </div>
                <div className="customer-reviews-per fw-bold text-end px-1 my-1">{per5} %</div>
              </li>
              <li className="customer-reviews-item d-flex justify-content-center m-0 p-0">
                <div className="customer-reviews-stars" style={{color:"#629973"}}>★★★★</div>
                <div className="customer-reviews-slide p-0">
                  <span
                    className="customer-reviews-score"
                    style={stylePer4}
                  ></span>
                </div>
                <div className="customer-reviews-per fw-bold text-end px-1 my-1">{per4} %</div>
              </li>
              <li className="customer-reviews-item d-flex justify-content-center m-0 p-0">
                <div className="customer-reviews-stars" style={{color:"#629973"}}>★★★</div>
                <div className="customer-reviews-slide p-0">
                  <span
                    className="customer-reviews-score"
                    style={stylePer3}
                  ></span>
                </div>
                <div className="customer-reviews-per fw-bold text-end px-1 my-1">{per3} %</div>
              </li>

              <li className="customer-reviews-item d-flex justify-content-center m-0 p-0">
                <div className="customer-reviews-stars" style={{color:"#629973"}}>★★</div>
                <div className="customer-reviews-slide p-0">
                  <span
                    className="customer-reviews-score"
                    style={stylePer2}
                  ></span>
                </div>
                <div className="customer-reviews-per fw-bold text-end px-1 my-1">{per2} %</div>
              </li>
              <li className="customer-reviews-item d-flex justify-content-center m-0 p-0">
                <div className="customer-reviews-stars" style={{color:"#629973"}}>★</div>
                <div className="customer-reviews-slide p-0">
                  <span
                    className="customer-reviews-score"
                    style={stylePer1}
                  ></span>
                </div>
                <div className="customer-reviews-per fw-bold text-end pe-1">{per1} %</div>
              </li>
            </ul>
            <span
              onClick={viewAllrev}
              className="text-primary allviewlink fs-5"
            >
              View All Reviews
            </span>
          </div>
        }
      >
        <div className="d-flex justify-content-start  mt-3 ">
          <div className=" mb-2 me-2 d-flex align-items-end ">
            <StarRatings
              rating={rat}
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

      <span
        className="fs-4 ms-3 d-flex align-items-end allviewlink"
        style={{cursor: "pointer"}}
        onClick={viewAllrev}
      >
     { product.reviews? product.reviews.length:""}  Reviews
      </span>
    </div>
  );
};

export default Stars;
