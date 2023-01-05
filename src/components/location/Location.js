import React, { useEffect } from "react";
import $ from "jquery";

const Location = (props) => {
  const changeCountry=props.action[0];
  const changeRegion=props.action[1];
  const changeCity=props.action[2];
  
  //for select Country Region City
  useEffect(() => {
    var BATTUTA_KEY = "00000000000000000000000000000000";

    var dataCountry=[];
    var  countryCode =""
  // Populate country select box from battuta API
  var urlforCountry =
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
    var urlforRegion =
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
    var region = $("#region").val();
    var url =
      "https://battuta.medunes.net/api/city/" +
      countryCode +
      "/search/?region=" +
      region +
      "&key=" +
      BATTUTA_KEY +
      "&callback=?";
    $.getJSON(url, function(data) {
      console.log(data);
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
      <div className="form__group">
        <select
          className="form-select fontfrm "
          id="country"
          onChange={changeCountry}
        >
          <option value=""> Country</option>
        </select>
      </div>
      <div className="form__group ">
        <select
          className="form-select fontfrm"
          id="region"
          onChange={changeRegion}
        >
          <option value="">Region</option>
        </select>
      </div>
      <div className="form__group ">
        <select
          className="form-select fontfrm"
          id="city"
          onChange={changeCity}
        >
          <option value="">City</option>
        </select>
      </div>
    </>
  );
};

export default Location;
