import React, { useEffect, useState } from "react";
import "./Shop.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Row, Col } from "reactstrap";

import ProductFilter from "../../components/products/ProductFilter";
import ProductSearch from "../../components/products/ProductSearch";
import { addProduct } from "../../redux/dataSlice";
import { useDispatch } from "react-redux";
import Helmet from "../../components/Helmet/Helmet";
import CardProduct from "../../components/cardProduct/CardProduct";

const Shop = () => {
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

    // a effacer

    // setData(data2);
    // setContainerData(data2);
    // data2.forEach((item) => {
    //   dispatch(addProduct(item));
    // });
    // setCountP(data2.length);
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
            ]}
          />
          <Row className=" d-flex m-3 justify-content-between row  m-0">
            {containerData.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={item.id}>
                <CardProduct item={item} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </Helmet>
  );
};

export default Shop;

// const data2 = [
//   {
//     id: 1,
//     productName: "Itel A33 Plus",
//     imgUrl: "p1",
//     price: "280",
//     category: "Phone",
//     brand: "Itel",
//     desc: "A33 Plus Multi-Functions Fingerprint Multi Functions Fingerprint SensorFingerprint sensor is not just for unlock. A33 plus come with multi functions fingerprint sensor which allow you to unlock apps, take photos, record videos, answer phone calls, record phone calls, stop alarm clock, even customize any of your fingerprints as unique shortcut to launch apps in a second.",
//   },
//   {
//     id: 2,
//     productName: "Xioomi Redmi",
//     imgUrl: "p2",
//     price: "300",
//     category: "Phone",
//     brand: "Xiaomi",
//     desc: "Xioomi Redmi Multi-Functions Fingerprint Multi Functions Fingerprint SensorFingerprint sensor is not just for unlock. A33 plus come with multi functions fingerprint sensor which allow you to unlock apps, take photos, record videos, answer phone calls, record phone calls, stop alarm clock, even customize any of your fingerprints as unique shortcut to launch apps in a second.",
//   },
//   {
//     id: 3,
//     productName: "Samsung Galaxy A12",
//     imgUrl: "p3",
//     price: "500",
//     category: "Phone",
//     brand: "Samsung",
//     desc: "Samsung Galaxy A12 mobile was launched on 24th November 2020. The phone comes with a 6.50-inch touchscreen display with a resolution of 720x1600 pixels and an aspect ratio of 20:9. Samsung Galaxy A12 is powered by a 1.8GHz octa-core MediaTek Helio P35 (MT6765) processor that features 4 cores clocked at 1.8GHz and 4 cores clocked at 2.3GHz. It comes with 4GB of RAM. The Samsung Galaxy A12 runs Android 10 and is powered by a 5000mAh battery. The Samsung Galaxy A12 supports proprietary fast charging.",
//   },
//   {
//     id: 4,
//     productName: "Tecno POVA Neo",
//     imgUrl: "p4",
//     price: "300",
//     category: "Phone",
//     brand: "Tecno",
//     desc: "Tecno POVA Neomobile was launched on 24th November 2020. The phone comes with a 6.50-inch touchscreen display with a resolution of 720x1600 pixels and an aspect ratio of 20:9. Samsung Galaxy A12 is powered by a 1.8GHz octa-core MediaTek Helio P35 (MT6765) processor that features 4 cores clocked at 1.8GHz and 4 cores clocked at 2.3GHz. It comes with 4GB of RAM. The Samsung Galaxy A12 runs Android 10 and is powered by a 5000mAh battery. The Samsung Galaxy A12 supports proprietary fast charging. \\n More Powerful and Dynamic Game Performance with ET Engine. With its strong function, users can have a step up from their average playing experience as the engine unlocks high-refresh-rate graphics and dynamic control adjustment.",
//   },
//   {
//     id: 5,
//     productName: "UMIDIGI A11 Pro Max",
//     imgUrl: "p5",
//     price: "300",
//     category: "Phone",
//     brand: "Umidigi",
//     desc: "UMIDIGI is a smartphone manufacturing-based company founded in China Shenzhen in 2012, which commits to delivering exquisite mobile electronic devices. That is focused on premium products, differentiating innovation, achieving technological breakthroughs, and delivering global customers an extraordinary mobile experience with meticulous designs and advanced technology. To make premium products accessible to everyone at an affordable price.  ",
//   },
//   {
//     id: 6,
//     productName: "Tecno Spark 7",
//     imgUrl: "p6",
//     price: "450",
//     category: "Phone",
//     brand: "Tecno",
//     desc: "SPARK 7 brings the perfectly proportioned forms and best-in-class functions together under one playful roof. The newly-added AI lens brightens the overall dark environment and has made it easier for you to capture every wonderful yourself and moment quickly.",
//   },
//   {
//     id: 7,
//     productName: "Black Hoodie",
//     imgUrl: "p7",
//     price: "25",
//     category: "Fashion",
//     brand: "Adidas",
//     desc: "Hello my love ones welcome to this page, here's another one good quality and highly recommended product good in texture available material nice to put on anywhere and everywhere . Original textile come see the difference in clothing",
//   },
//   {
//     id: 8,
//     productName: "Adidas ORIGINALS",
//     imgUrl: "p8",
//     price: "300",
//     category: "Fashion",
//     brand: "Adidas",
//     desc: "Disney's Rex peeks out from the front of this Stan Smith t-shirt. Proof that dinosaurs can be your BFF. The tee is made from 100% organic cotton jersey for a soft, comfortable feel. This product is made with organic cotton and is part of our ambition to end plastic waste.",
//   },
//   {
//     id: 9,
//     productName: "Red Sweat Shirt",
//     imgUrl: "p9",
//     price: "33",
//     category: "Fashion",
//     brand: "Adidas",
//     desc: "Hello,  my love ones welcome to this page, here's another one good quality and highly recommended product good in texture available material nice to put on anywhere and everywhere . Original textile come see the difference in clothing's Red sweat shirt it's unique and hardly rarely seen and copy in a day to day styles made from the best quality material to fit and perfect the body or body shape with the perfect cut, best wear on corporate t-shirt, it's also worn on parties, clubs and occasional event. ",
//   },
//   {
//     id: 10,
//     productName: "Amani 32''INCHES LED FULL HD",
//     imgUrl: "p10",
//     price: "900",
//     category: "Electronics",
//     brand: "Amani",
//     desc: "Enjoy great quality product for life with this Amani 32-inch LED TV. It has an ultra-thin bezel with a sleek finish, it delivers tremendous value in a sophisticated slim frame design, perfect for your home theatre. This flat screen LED TV features Amani True Color Technology for brilliant color and contrast. With direct-lit LED backlighting, view darker blacks and luminous brightness while maintaining the best standards in energy efficiency. An advanced refreshed technology rate allows you to watch fast-moving sports and action scenes or play games with clarity and smoothness. A variety of inputs, including HDMI and USB, turn your television into a multifunctional, multimedia entertainment system. The HDMI inputs allow you to connect to satellite or cable TV, DVD/Blu-ray player, and gaming console or watch and stream high definition video and audio from your PC computer. ",
//   },
//   {
//     id: 11,
//     productName: "LG Powerful XBOOM Home Theatre",
//     imgUrl: "p11",
//     price: "600",
//     category: "Electronics",
//     brand: "LG",
//     desc: "Bass Blast+Advanced EQ, Bass Blast+Deeper bass and clearer vocals are made possible with Bass Blast+. It features advanced EQ for perfect, customized sound. ",
//   },
//   {
//     id: 12,
//     productName: "Hisense 58''Smart UHD 4K TV",
//     imgUrl: "p12",
//     price: "1500",
//     category: "Electronics",
//     brand: "Hisense",
//     desc: "The ultra hd smart led tv58A7100 58 TV is manufactured by Hisense and was added around October 2020. This version of the TV comes in Screen Size : 58 Inch , Display Technology : LED , Special Features : Internet Connectivity , Special Features : Without 3D , Special Features : Smart TV , Refresh Rate : 50 HZ , Display Resolution : Ultra HD (4K).High Dynamic RangeYou’ll be refreshed by what you see  whites look brighter, blacks look darker and colors look more vibrant.",
//   },
//   {
//     id: 13,
//     productName: "Hp Pavilion X360",
//     imgUrl: "p13",
//     price: "3000",
//     category: "Laptop",
//     brand: "HP",
//     desc: "The HP Pavilion x360 14 convertible adapts to you so that you are productive at any angle. Stream your favorite series as long as you want with HP Fast Charge2. Dual Speakers with Audio by B&O give this laptop the immersive sound and entertainment experience you crave. Designed with the environment in mind, the HP Pavilion x360 is made using sustainable, post-consumer recycled, and ocean-bound plastics4. With a perfect balance of design and performance, the HP Pavilion is an ideal laptop for streaming, staying connected, and personal productivity.",
//   },
//   {
//     id: 14,
//     productName: "Hp Pavilion Laptop",
//     imgUrl: "p14",
//     price: "1500",
//     category: "Laptop",
//     brand: "HP",
//     desc: "Operating system : Windows 10 Home Single Language381Processor family : Intel® Pentium® Gold processorProcessor : Intel® Pentium® Gold 7505 (up to 3.5 GHz with Intel® Turbo Boost Technology, 4 MB L3 cache, 2 cores)6,71Chipset : Intel® Integrated SoCMemory : 8 GB DDR4-3200 MHz RAM (2 x 4 GB)Memory layout (slots & size) : 2 x 4 GBInternal Storage : 256 GB PCIe® NVMe™ M.2 SSDDisplay 35.6 cm",
//   },
//   {
//     id: 15,
//     productName: "Lenovo IdeaPad S150",
//     imgUrl: "p15",
//     price: "2000",
//     category: "Laptop",
//     brand: "Lenovo",
//     desc: "Complete daily computing tasks quickly with this Lenovo IdeaPad laptop. The AMD A6-9220E processor and On-Board RAM offer ample power to run multiple applications seamlessly for efficient multitasking, while the AMD Radeon R4 integrated graphics deliver quality visuals on the 14-inch HD display. This Lenovo IdeaPad laptop has a lithium-polymer battery that provides up to 8 hours of uptime on a single charge. Connect to an HDTV or high-def monitor to set up two screens side by side or just see more of the big picture. Connect to a Wireless-AC router for nearly 3x the speed, more capacity and wider coverage than Wireless-N. Backward-compatible with all other Wi-Fi networks and hotspots.Standing screen display size 14 InchesScreen Resolution 1366x768Max Screen Resolution 1366 x 768Memory Speed 2400 MHzGraphics Coprocessor AMD Radeon R4",
//   },
// ];
