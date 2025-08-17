/*
 * eShop Project
 * Shop Component
 *
 * Description:
 * Displays the list of products in the shop.
 * Provides features to filter by category and brand, 
 * search products, sort them, change display layout, 
 * and adjust price ranges.
 *
 * License:
 * MIT License
 */

import { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { dataProducts } from "../../redux/dataSlice";
import { useSelector } from "react-redux";
import {
  ProductFilter,
  ProductSearch,
  Helmet,
  CardProduct,
  CardProductRow,
  Scrolltop,
} from "../../components";
import "./Shop.css";

// Component Shop
const Shop = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // State variables
  const [data, setData] = useState([]); // All products data
  var [containerData, setContainerData] = useState([]); // Filtered/Displayed products
  const [countP, setCountP] = useState(0); // Count of displayed products

  // Search, sorting and selection
  const [searchString, setSearchString] = useState("");
  const [valueSelectSort, setValueSelectSort] = useState(0);
  const [valueSelectBrand, setValueSelectBrand] = useState(0);

  // Category states
  const [allCat, setAllCat] = useState([]);
  const [laptopCat, setLaptopCat] = useState([]);
  const [electronicCat, setElectronicCat] = useState([]);
  const [phoneCat, setPhoneCat] = useState([]);
  const [fashionCat, setFashionCat] = useState([]);

  // Brand states
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

  // Price range
  const [rangeMinVal, setRangeMinVal] = useState(0);
  const [rangeMaxVal, setRangeMaxVal] = useState(4500);
  const rangeValInit = { min: 0, max: 4500 };
  const [selectProducts, setSelectProducts] = useState("data"); // Current product selection type

  // Display mode
  const [isDisplayList, setIsDisplayList] = useState(false);

  // Fetch products from Redux store
  const dataProd = useSelector(dataProducts);
  useEffect(() => {
    setData(dataProd);
    setContainerData(dataProd);
    setCountP(dataProd.length);
  }, [dataProd]);

  // Extract categories and brands
  useEffect(() => {
    setAllCat(data);
    setLaptopCat(data.filter((product) => product.category === "Laptop"));
    setElectronicCat(data.filter((product) => product.category === "Electronics"));
    setPhoneCat(data.filter((product) => product.category === "Phone"));
    setFashionCat(data.filter((product) => product.category === "Fashion"));

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

  // Functions to toggle display mode
  const NodisplayList = () => setIsDisplayList(false);
  const displayList = () => setIsDisplayList(true);

  // Handle search
  const handlSearch = (e) => {
    e.preventDefault();
    clearFilter();
    setSelectProducts("searched");

    const StringC = e.target.value.trim().toLowerCase();
    setSearchString(e.target.value);
    if (StringC !== "") {
      var list = data.filter((product) =>
        product.productName.toLowerCase().includes(StringC) ||
        product.category.toLowerCase().includes(StringC) ||
        product.brand.toLowerCase().includes(StringC)
      );
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

  // Sorting
  const handleSort = (e) => {
    e.preventDefault();
    const target = e.target.value;
    setValueSelectSort(target);

    if (target === "0" || target === "3") {
      containerData.sort((a, b) =>
        a.productName.toUpperCase() < b.productName.toUpperCase() ? -1 : 1
      );
    }
    if (target === "1") containerData.sort((a, b) => a.price - b.price);
    if (target === "2") containerData.sort((a, b) => b.price - a.price);
    if (target === "4") {
      containerData.sort((a, b) =>
        a.productName.toUpperCase() < b.productName.toUpperCase() ? 1 : -1
      );
    }
  };

  // Category filter functions
  const getCat = (e, category) => {
    e.preventDefault();
    setContainerData(category);
    setCountP(category.length);
    setSearchString("");
    setValueSelectSort("");
    setSeed(Math.random()); // refresh component
  };

  const getAllCat = (e) => { getCat(e, allCat); setSelectProducts("allCat"); };
  const getLaptop = (e) => { getCat(e, laptopCat); setSelectProducts("laptopCat"); };
  const getElectro = (e) => { getCat(e, electronicCat); setSelectProducts("electronicCat"); };
  const getPhone = (e) => { getCat(e, phoneCat); setSelectProducts("phoneCat"); };
  const getFashion = (e) => { getCat(e, fashionCat); setSelectProducts("fashionCat"); };

  // Brand filter
  const selectBrand = (e) => {
    e.preventDefault();
    const target = e.target.value;
    setValueSelectBrand(target);
    setSearchString("");
    setValueSelectSort("");
    setSeed(Math.random()); // refresh component
    switch (target) {
      case "0": setContainerData(allBr); setCountP(allBr.length); setSelectProducts("allBr"); break;
      case "1": setContainerData(lenovoBr); setCountP(lenovoBr.length); setSelectProducts("lenovoBr"); break;
      case "2": setContainerData(hpBr); setCountP(hpBr.length); setSelectProducts("hpBr"); break;
      case "3": setContainerData(hisenseBr); setCountP(hisenseBr.length); setSelectProducts("hisenseBr"); break;
      case "4": setContainerData(lgBr); setCountP(lgBr.length); setSelectProducts("lgBr"); break;
      case "5": setContainerData(amaniBr); setCountP(amaniBr.length); setSelectProducts("amaniBr"); break;
      case "6": setContainerData(adidasBr); setCountP(adidasBr.length); setSelectProducts("adidasBr"); break;
      case "7": setContainerData(tecnoBr); setCountP(tecnoBr.length); setSelectProducts("tecnoBr"); break;
      case "8": setContainerData(umidigiBr); setCountP(umidigiBr.length); setSelectProducts("umidigiBr"); break;
      case "9": setContainerData(samsungBr); setCountP(samsungBr.length); setSelectProducts("samsungBr"); break;
      case "10": setContainerData(xioomiBr); setCountP(xioomiBr.length); setSelectProducts("xioomiBr"); break;
      case "11": setContainerData(itelBr); setCountP(itelBr.length); setSelectProducts("itelBr"); break;
      default: break;
    }
  };

  // Price range handling
  const changeRange = (e) => { setRangeMinVal(e.minValue); setRangeMaxVal(e.maxValue); };
  const setRange = () => {
    let list = [];
    switch (selectProducts) {
      case "allCat": list = allCat; break;
      case "laptopCat": list = laptopCat; break;
      case "electronicCat": list = electronicCat; break;
      case "phoneCat": list = phoneCat; break;
      case "fashionCat": list = fashionCat; break;
      case "allBr": list = allBr; break;
      case "lenovoBr": list = lenovoBr; break;
      case "hpBr": list = hpBr; break;
      case "hisenseBr": list = hisenseBr; break;
      case "lgBr": list = lgBr; break;
      case "amaniBr": list = amaniBr; break;
      case "adidasBr": list = adidasBr; break;
      case "tecnoBr": list = tecnoBr; break;
      case "umidigiBr": list = umidigiBr; break;
      case "samsungBr": list = samsungBr; break;
      case "xioomiBr": list = xioomiBr; break;
      case "itelBr": list = itelBr; break;
      default: list = data; break;
    }
    const list2 = list.filter(
      (product) => product.price > rangeMinVal && product.price < rangeMaxVal
    );
    setContainerData(list2);
    setCountP(list2.length);
  };

  // Refresh component helper
  const [seed, setSeed] = useState(1);
  const clearFilter = () => {
    setSeed(Math.random());
    setValueSelectSort("");
    setValueSelectBrand("");
    setContainerData(data);
    setCountP(data.length);
    setSearchString("");
    setSelectProducts("data");
  };

  // Render
  return (
    <Helmet title="shopping">
      <div className=" pt-5 d-flex justify-content-center row fs-5">
        {/* Product filters */}
        <ProductFilter key={seed} actions={[
            getAllCat, getLaptop, getElectro, getPhone, getFashion,
            clearFilter, changeRange, setRange, rangeMinVal, rangeMaxVal,
            selectBrand, valueSelectBrand, rangeValInit,
        ]}/>
        <div className="col-md-9 p-0 ">
          {/* Search and sort */}
          <ProductSearch actions={[
            countP, searchString, handlSearch, handleSort,
            valueSelectSort, NodisplayList, displayList,
          ]}/>
          {/* Product list */}
          <Row className=" d-flex justify-content-between mt-3 row">
            {isDisplayList
              ? containerData.map((item) => (
                  <Col lg="12" md="12" sm="12" xs="12" className="mb-3" key={item.id}>
                    <CardProductRow item={item} />
                  </Col>
                ))
              : containerData.map((item) => (
                  <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={item.id}>
                    <CardProduct item={item} />
                  </Col>
                ))}
          </Row>
        </div>
      </div>
      {/* Scroll to top button */}
      <Scrolltop />
    </Helmet>
  );
};

// Export Shop component
export default Shop;
