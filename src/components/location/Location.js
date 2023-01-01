import React, { useEffect } from "react";
import $ from "jquery";
import { useState } from "react";

const Location = (props) => {
  const changeCountry=props.action[0];
  const changeRegion=props.action[1];
  const changeCity=props.action[2];
  

  //for select Country Region City
  useEffect(() => {
    //-------------------------------SELECT CASCADING-------------------------//
    var selectedCountry,
      selectedRegion,
      selectedCity = "";
    // This is a demo API key for testing purposes. You should rather request your API key (free) from http://battuta.medunes.net/
    var BATTUTA_KEY = "00000000000000000000000000000000";
    // var BATTUTA_KEY = "9a6d2a8be80e07589f5daf1492892979";
    // Populate country select box from battuta API

    var url =
      "https://battuta.medunes.net/api/country/all/?key=" +
      BATTUTA_KEY +
      "&callback=?";

    // EXTRACT JSON DATA.
    $.getJSON(url, function (data) {
      var flag = "";
      $.each(data, function (index, value) {
        flag = "https://countryflagsapi.com/png/" + value.code;

        // APPEND OR INSERT DATA TO SELECT ELEMENT.
        $("#country").append(
          '<option value="' + value.code + '">' + value.name + "</option>"
        );
      });
    });
    // Country selected --> update region list .
    $("#country").change(function () {
      selectedCountry = this.options[this.selectedIndex].text;
      var countryCode = $("#country").val();
      // Populate country select box from battuta API
      url =
        "https://battuta.medunes.net/api/region/" +
        countryCode +
        "/all/?key=" +
        BATTUTA_KEY +
        "&callback=?";
      $.getJSON(url, function (data) {
        $("#region option").remove();
        $("#region").append(
          '<option value="">Please select your region</option>'
        );
        $.each(data, function (index, value) {
          // APPEND OR INSERT DATA TO SELECT ELEMENT.
          $("#region").append(
            '<option value="' + value.region + '">' + value.region + "</option>"
          );
        });
      });
    });
    // Region selected --> updated city list
    $("#region").on("change", function () {
      selectedRegion = this.options[this.selectedIndex].text;
      // Populate country select box from battuta API
      var countryCode = $("#country").val();
      var region = $("#region").val();
      url =
        "https://battuta.medunes.net/api/city/" +
        countryCode +
        "/search/?region=" +
        region +
        "&key=" +
        BATTUTA_KEY +
        "&callback=?";
      $.getJSON(url, function (data) {
        $("#city option").remove();
        $("#city").append('<option value="">Please select your city</option>');
        $.each(data, function (index, value) {
          // APPEND OR INSERT DATA TO SELECT ELEMENT.
          $("#city").append(
            '<option value="' + value.city + '">' + value.city + "</option>"
          );
        });
      });
    });
    // city selected --> update location string
    $("#city").on("change", function () {
      selectedCity = this.options[this.selectedIndex].text;
      $("#location").html(
        "Locatation: Country: " +
          selectedCountry +
          ", Region: " +
          selectedRegion +
          ", City: " +
          selectedCity
      );
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
