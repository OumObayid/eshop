import React, { useEffect, useState } from "react";
import $ from "jquery";

const Location = (props) => {
  const changeCountry = props.action[0];
  const changeRegion = props.action[1];
  const changeCity = props.action[2];

  const [flagCountry, setFlagCountry] = useState("");
  //for select Country Region City
  var Codecountry,
    Nameregion,
    flag = "";
  useEffect(() => {
    //-------------------------------SELECT CASCADING-------------------------//
    ///////api to detect country and region
    fetch("https://api.ipregistry.co/?key=f9g7ql7whwv93is5")
      .then(function (response) {
        return response.json();
      })
      .then(function (payload) {
        Codecountry = payload.location.country.code.toLowerCase();
        Nameregion = payload.location.region.name;

        // $("#imgflag").attr("src",flag);
        var BATTUTA_KEY = "00000000000000000000000000000000";
        // var BATTUTA_KEY = "9a6d2a8be80e07589f5daf1492892979";
        ///////////////////select country////////////////////////
        var urlContry =
          "https://battuta.medunes.net/api/country/all/?key=" +
          BATTUTA_KEY +
          "&callback=?";
        // EXTRACT JSON DATA.
        $.getJSON(urlContry, function (data) {
          $.each(data, function (index, value) {
            const flagoption =
              '<option value="' + value.code + '">' + value.name + "</option>";
            $("#country").append(flagoption);
          });
          $("#country option[value=" + Codecountry + "]").prop(
            "selected",
            true
          );
        });
        // to charge  region list where country selected.
        $("#country").change(function () {
          // selectedCountry = this.options[this.selectedIndex].text;
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
                '<option value="' +
                  value.region +
                  '">' +
                  value.region +
                  "</option>"
              );
            });
          });
        });
        ////////////////////////select region//////////////////////////////////
        var urlRegion =
          "https://battuta.medunes.net/api/region/" +
          Codecountry +
          "/all/?key=" +
          BATTUTA_KEY +
          "&callback=?";
        $.getJSON(urlRegion, function (data) {
          $("#region option").remove();
          $("#region").append(
            '<option value="">Please select your region</option>'
          );
          $.each(data, function (index, value) {
            // APPEND OR INSERT DATA TO SELECT ELEMENT.
            $("#region").append(
              '<option value="' +
                value.region +
                '">' +
                value.region +
                "</option>"
            );
          });
          // select this region in select
          $("#region option[value= '" + Nameregion + "' ]").prop(
            "selected",
            true
          );
        });
        // to charge  city list where region selected.
        $("#region").on("change", function () {
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
            $("#city").append(
              '<option value="">Please select your city</option>'
            );
            $.each(data, function (index, value) {
              // APPEND OR INSERT DATA TO SELECT ELEMENT.
              $("#city").append(
                '<option value="' + value.city + '">' + value.city + "</option>"
              );
            });
          });
        });
        ///////////////////////select city//////////////////////////////
        var url =
          "https://battuta.medunes.net/api/city/" +
          Codecountry +
          "/search/?region=" +
          Nameregion +
          "&key=" +
          BATTUTA_KEY +
          "&callback=?";
        $.getJSON(url, function (data) {
          $("#city option").remove();
          $("#city").append(
            '<option value="">Please select your city</option>'
          );
          $.each(data, function (index, value) {
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
      {/* <select name="issuetype" id="issuetype">
        <option
          value="1"
          style={{ backgroundImage: "url(https://flagcdn.com/16x12/fr.png)" }}
        >
          Bug
        </option>
      </select> */}
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
        <select className="form-select fontfrm" id="city" onChange={changeCity}>
          <option value="">City</option>
        </select>
      </div>
    </>
  );
};

export default Location;
