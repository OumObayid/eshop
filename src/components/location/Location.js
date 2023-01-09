import React, { useEffect } from "react";
import $ from "jquery";

const Location = (props) => {
  //from component CheckoutForm
  const changeCountry=props.action[0];
  const changeRegion=props.action[1];
  const changeCity=props.action[2];
  
  //from component Accountedit
  const selected=props.selected
  
  //for select Country Region City
  useEffect(() => {
    let BATTUTA_KEY = "00000000000000000000000000000000";

    let dataCountry=[];
    let  countryCode =""
  // Populate country select box from battuta API
  let urlforCountry =
    "https://battuta.medunes.net/api/country/all/?key=" +
    BATTUTA_KEY +
    "&callback=?";

  // EXTRACT JSON DATA.
  
  $.getJSON(urlforCountry, function(data) {
   dataCountry=[...data] 
    $.each(data, function(index, value) {
      // APPEND OR INSERT DATA TO SELECT ELEMENT.
      $("#country").append(
        '<option value="' + value.name + '">' + value.name + "</option>"
      );
    });
  });
  // Country selected --> update region list .
  $("#country").on("change", function() {
    const country = dataCountry.find((value) => value.name===$("#country").val())   
     countryCode = country.code;
    // Populate country select box from battuta API
    let urlforRegion =
      "https://battuta.medunes.net/api/region/" +
      countryCode +
      "/all/?key=" +
      BATTUTA_KEY +
      "&callback=?";
    $.getJSON(urlforRegion, function(data) {
      $("#region option").remove();
      $('#region').append('<option value="">Please select your region</option>');
      $.each(data, function(index, value) {
        // APPEND OR INSERT DATA TO SELECT ELEMENT.
        $("#region").append(
          '<option value="' + value.region + '">' + value.region + "</option>"
        );
      });
    });
  });
  // Region selected --> updated city list
  $("#region").on("change", function() {
    // Populate country select box from battuta API
    let region = $("#region").val();
    let url =
      "https://battuta.medunes.net/api/city/" +
      countryCode +
      "/search/?region=" +
      region +
      "&key=" +
      BATTUTA_KEY +
      "&callback=?";
    $.getJSON(url, function(data) {
      $("#city option").remove();
      $('#city').append('<option value="">Please select your city</option>');
      $.each(data, function(index, value) {
        // APPEND OR INSERT DATA TO SELECT ELEMENT.
        $("#city").append(
          '<option value="' + value.city + '">' + value.city + "</option>"
        );
      });
    });
  });


  }, []);

  
  return (
    <>
      <div className="form__group fs-4">
        <select
          className="form-select fontfrm "
          id="country"
          onChange={changeCountry}
        >         
          {(selected !==null)
          ?<option selected>{selected[0]}</option>
          :<option selected value=""> Country</option>}
        </select>
      </div>
      <div className="form__group ">
        <select
          className="form-select fontfrm"
          id="region"
          onChange={changeRegion}
        >          
          {(selected !==null)
          ?<option selected>{selected[1]}</option>
          :<option selected value="">Region</option>}
        </select>
      </div>
      <div className="form__group ">
        <select
          className="form-select fontfrm"
          id="city"
          onChange={changeCity}
        >          
          {(selected !==null)
          ?<option selected>{selected[2]}</option>
          :<option selected value="">City</option>}
        </select>
      </div>
    </>
  );
};

export default Location;
