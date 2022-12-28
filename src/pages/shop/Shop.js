import React, { useEffect, useState } from "react";
import "./Shop.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Row, Col } from "reactstrap";
import { addProduct,addCategory } from "../../redux/dataSlice";
import { useDispatch } from "react-redux";
import { ProductFilter, ProductSearch,Helmet,CardProduct,CardProductRow,Scrolltop } from "../../components";



const Shop = () => {
  useEffect(() => {
    window.scrollTo(0,0);
   },[]) 

  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  var [containerData, setContainerData] = useState([]);
  const [countP, setCountP] = useState(0);
  // for searching
  const [searchString, setSearchString] = useState("");
  // for select
  const [valueSelectSort, setValueSelectSort] = useState(0);
  const [valueSelectBrand, setValueSelectBrand] = useState(0);
  //category
  const [allCat, setAllCat] = useState([]);
  const [laptopCat, setLaptopCat] = useState([]);
  const [electronicCat, setElectronicCat] = useState([]);
  const [phoneCat, setPhoneCat] = useState([]);
  const [fashionCat, setFashionCat] = useState([]);
  //Brands
  const [allBr, setAllBr] = useState([]);
  const [lenovoBr, setLenovoBr] = useState([]);
  const [hpBr, setHpBr] = useState([]);
  const [hisenseBr, setHisenseBr] = useState([]);
  const [lgBr, setLgBr] = useState([]);
  const [amaniBr, setAmaniBr] = useState([]);
  const [adidasBr, setAdidasBr] = useState([]);
  const [tecnoBr, setTecnoBr] = useState([]);
  const [umidigiBr, setUmidigiBr] = useState([]);
  const [samsungBr, setSamsungBr] = useState([]);
  const [xioomiBr, setXioomiBr] = useState([]);
  const [itelBr, setItelBr] = useState([]);
  //range
  const [rangeMinVal, setRangeMinVal] = useState(0);
  const [rangeMaxVal, setRangeMaxVal] = useState(4500);
  const rangeValInit = { min: 0, max: 4500 };
  const [selectProducts, setSelectProducts] = useState("data");

  //display
  const [isDisplayList, setIsDisplayList] = useState(false);
  /////////////////////////////////////////////////////////////starting features

  useEffect(() => {
    const getProducts = async () => {
      //////////////// get data from firebase
      const ref = collection(db, "products");
      const querySnapshot = await getDocs(ref);
      const list = [];
      querySnapshot.forEach((doc) => {
        let fullDoc = { id: doc.id, ...doc.data() }; //concate id to document
        list.push(fullDoc); //put data in array list
        dispatch(addProduct(fullDoc)); // put doc in store redux
      });

      setData(list); // put data in state data
      setContainerData(list); // put data in state containerData
      setCountP(list.length); // update count of product
    };
    getProducts(); // call to function
    const getCategorys = async () => {
      //////////////// get data from firebase
      const ref = collection(db, "categorys");
      const querySnapshot = await getDocs(ref);
      const list = [];
      querySnapshot.forEach((doc) => {
        let fullDoc = { id: doc.id, ...doc.data() }; //concate id to document
        list.push(fullDoc); //put data in array list
        dispatch(addCategory(fullDoc)); // put doc in store redux
      });      
    };
    getCategorys(); // call to function
 
  }, [dispatch]);

  //////////////////   get categorys / brands
  useEffect(() => {
    //categorys

    setAllCat(data);
    setLaptopCat(data.filter((product) => product.category === "Laptop"));
    setElectronicCat(
      data.filter((product) => product.category === "Electronics")
    );
    setPhoneCat(data.filter((product) => product.category === "Phone"));
    setFashionCat(data.filter((product) => product.category === "Fashion"));

    //brands
    setAllBr(data);
    setLenovoBr(data.filter((product) => product.brand === "Lenovo"));
    setHisenseBr(data.filter((product) => product.brand === "Hisense"));
    setLgBr(data.filter((product) => product.brand === "Lg"));
    setAmaniBr(data.filter((product) => product.brand === "Amani"));
    setAdidasBr(data.filter((product) => product.brand === "Adidas"));
    setTecnoBr(data.filter((product) => product.brand === "Tecno"));
    setUmidigiBr(data.filter((product) => product.brand === "Umidigi"));
    setSamsungBr(data.filter((product) => product.brand === "Samsung"));
    setXioomiBr(data.filter((product) => product.brand === "Xiaomi"));
    setItelBr(data.filter((product) => product.brand === "Itel"));
    setHpBr(data.filter((product) => product.brand === "Hp"));
  }, [data]);

  /////////////////////////////////////////////////////////////////To display list or no list
  const NodisplayList = () => {
    setIsDisplayList(false);
  };
  const displayList = () => {
    setIsDisplayList(true);
  };
  //////////////////////////////////////////////////////////////////to search data
  const handlSearch = (e) => {
    //preparation
    e.preventDefault();
    clearFilter();
    setSelectProducts("searched");

    setSearchString(e.target.value);
    const StringC = e.target.value.trim().toLowerCase();
    if (StringC !== "") {
      var list = data.filter(function (product) {
        return (
          product.productName.toLowerCase().match(StringC) ||
          product.category.toLowerCase().match(StringC) ||
          product.brand.toLowerCase().match(StringC)
        );
      });
      list = list.filter(
        (product) => product.price > rangeMinVal && product.price < rangeMaxVal
      );

      setContainerData(list);
      setCountP(list.length);
    } else {
      setContainerData(data);
      setCountP(data.length);
    }
  };

  /////////////////////////////////////////// sorting data to use by calling
  //sorting data by handle
  const handleSort = (e) => {
    e.preventDefault();
    const target = e.target.value;
    setValueSelectSort(target);
    if (target === "0" || target === "3") {
      containerData.sort((a, b) => {
        var A = a.productName.toUpperCase();
        var B = b.productName.toUpperCase();
        return A < B ? -1 : A > B ? 1 : 0;
      });
    }
    if (target === "1") {
      containerData.sort((a, b) => a.price - b.price);
    }
    if (target === "2") {
      containerData.sort((a, b) => b.price - a.price);
    }
    if (target === "4") {
      containerData.sort((a, b) => {
        var A = a.productName.toUpperCase();
        var B = b.productName.toUpperCase();
        return A < B ? 1 : A > B ? -1 : 0;
      });
    }
  };

  //////////////////////////////////////////////////  filtering
  //get category
  // function to get category
  const getCat = (e, category) => {
    e.preventDefault();
    setContainerData(category);
    setContainerData(category);
    setCountP(category.length);
    setSearchString("");
    setValueSelectSort("");
    setSeed(Math.random()); // //to refresh a component
  };
  const getAllCat = (e) => {
    getCat(e, allCat);
    setSelectProducts("allCat");
  };
  const getLaptop = (e) => {
    getCat(e, laptopCat);
    setSelectProducts("laptopCat");
  };
  const getElectro = (e) => {
    getCat(e, electronicCat);
    setSelectProducts("electronicCat");
  };
  const getPhone = (e) => {
    getCat(e, phoneCat);
    setSelectProducts("phoneCat");
  };
  const getFashion = (e) => {
    getCat(e, fashionCat);
    setSelectProducts("fashionCat");
  };

  //Get brand
  const selectBrand = (e) => {
    e.preventDefault();
    const target = e.target.value;
    setValueSelectBrand(target);
    setSearchString("");
    setValueSelectSort("");
    setSeed(Math.random()); // //to refresh a component
    switch (target) {
      case "0":
        setContainerData(allBr);
        setCountP(allBr.length);
        setSelectProducts("allBr");
        break;
      case "1":
        setContainerData(lenovoBr);
        setCountP(lenovoBr.length);
        setSelectProducts("lenovoBr");
        break;
      case "2":
        setContainerData(hpBr);
        setCountP(hpBr.length);
        setSelectProducts("hpBr");
        break;
      case "3":
        setContainerData(hisenseBr);
        setCountP(hisenseBr.length);
        setSelectProducts("hisenseBr");
        break;
      case "4":
        setContainerData(lgBr);
        setCountP(lgBr.length);
        setSelectProducts("lgBr");
        break;
      case "5":
        setContainerData(amaniBr);
        setCountP(amaniBr.length);
        setSelectProducts("amaniBr");
        break;
      case "6":
        setContainerData(adidasBr);
        setCountP(adidasBr.length);
        setSelectProducts("adidasBr");
        break;
      case "7":
        setContainerData(tecnoBr);
        setCountP(tecnoBr.length);
        setSelectProducts("tecnoBr");
        break;
      case "8":
        setContainerData(umidigiBr);
        setCountP(umidigiBr.length);
        setSelectProducts("umidigiBr");
        break;
      case "9":
        setContainerData(samsungBr);
        setCountP(samsungBr.length);
        setSelectProducts("samsungBr");
        break;
      case "10":
        setContainerData(xioomiBr);
        setCountP(xioomiBr.length);
        setSelectProducts("xioomiBr");
        break;
      case "11":
        setContainerData(itelBr);
        setCountP(itelBr.length);
        setSelectProducts("itelBr");
        break;
      default:
    }
  };

  //change range
  const changeRange = (e) => {
    setRangeMinVal(e.minValue);
    setRangeMaxVal(e.maxValue);
  };
  // const changeRange = (e) => console.log(`rangeMinVal = ${e.minValue}, rangeMaxVal = ${e.maxValue}`)

  const setRange = () => {
    let list = [];
    switch (selectProducts) {
      case "allCat":
        list = allCat;
        break;
      case "laptopCat":
        list = laptopCat;
        break;
      case "electronicCat":
        list = electronicCat;
        break;
      case "phoneCat":
        list = phoneCat;
        break;
      case "fashionCat":
        list = fashionCat;
        break;
      case "allBr":
        list = allBr;
        break;
      case "lenovoBr":
        list = lenovoBr;
        break;
      case "hpBr":
        list = hpBr;
        break;
      case "hisenseBr":
        list = hisenseBr;
        break;
      case "lgBr":
        list = lgBr;
        break;
      case "amaniBr":
        list = amaniBr;
        break;

      case "adidasBr":
        list = adidasBr;
        break;
      case "tecnoBr":
        list = tecnoBr;
        break;
      case "umidigiBr":
        list = umidigiBr;
        break;
      case "samsungBr":
        list = samsungBr;
        break;
      case "xioomiBr":
        list = xioomiBr;
        break;
      case "itelBr":
        list = itelBr;
        break;
      // case "searched":
      //   list = data;
      //   break;
      default:
        list = data;
        break;
    }
    const list2 = list.filter(
      (product) => product.price > rangeMinVal && product.price < rangeMaxVal
    );
    setContainerData(list2);
    setCountP(list2.length);
  };

  // Clear filter

  const [seed, setSeed] = useState(1); //to refresh a component
  // place as props for the component this:  key={seed}
  const clearFilter = () => {
    setSeed(Math.random()); // //to refresh a component
    setValueSelectSort(""); //to set the select in the default value
    setValueSelectBrand(""); //to set the select in the default value
    setContainerData(data);
    setCountP(data.length);
    setSearchString("");
    setSelectProducts("data"); // to initialise the select products

    // setRangeMinVal(rangeValInit.min);
    // setRangeMaxVal(rangeValInit.max);
    // setRangeMinVal(0);
    // setRangeMaxVal(4500);
  };
  
    
  
  return (
    <Helmet title="shopping">
      <div className=" pt-5 d-flex justify-content-center row fs-5">
        <ProductFilter
          key={seed}
          actions={[
            getAllCat,
            getLaptop,
            getElectro,
            getPhone,
            getFashion,
            clearFilter,
            changeRange,
            setRange,
            rangeMinVal,
            rangeMaxVal,
            selectBrand,
            valueSelectBrand,
            rangeValInit,
          ]}
        />
        <div className="col-md-9 p-0 ">
          <ProductSearch
            actions={[
              countP,
              searchString,
              handlSearch,
              handleSort,
              valueSelectSort,
              NodisplayList,
              displayList,
            ]}
          />
          <Row className=" d-flex justify-content-between row">
            {isDisplayList
              ? containerData.map((item) => (
                  <Col
                    lg="12"
                    md="12"
                    sm="12"
                    xs="12"
                    className="mb-3"
                    key={item.id}
                  >
                    <CardProductRow item={item} />
                  </Col>
                ))
              : containerData.map((item) => (
                  <Col
                    lg="3"
                    md="4"
                    sm="6"
                    xs="6"
                    className="mb-4"
                    key={item.id}
                  >
                    <CardProduct item={item} />
                  </Col>
                ))}
          </Row>
        </div>
      </div>   
      <Scrolltop />  
    </Helmet>
  );
};

export default Shop;
