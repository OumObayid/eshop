import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";

const Location = ({ action, selected }) => {
  const changeCountry = action[0];
  const changeRegion = action[1];
  const changeCity = action[2];

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");

  // Initialisation des pays et sélection initiale
  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);

    if (selected?.[0]) {
      const selCountry = allCountries.find(c => c.name === selected[0]);
      if (selCountry) setCountryName(selCountry.isoCode);
    }
  }, [selected]);

  // Charger les états à partir du countryName
  useEffect(() => {
    if (countryName) {
      const allStates = State.getStatesOfCountry(countryName);
      setStates(allStates);

      if (selected?.[1]) {
        const selState = allStates.find(s => s.name === selected[1]);
        if (selState) setStateName(selState.isoCode);
      } else {
        setStateName("");
      }

      setCities([]);
      setCityName("");
    } else {
      setStates([]);
      setCities([]);
      setStateName("");
      setCityName("");
    }
  }, [countryName, selected]);

  // Charger les villes à partir de stateName
  useEffect(() => {
    if (countryName && stateName) {
      const allCities = City.getCitiesOfState(countryName, stateName);
      setCities(allCities);

      if (selected?.[2]) {
        const selCity = allCities.find(c => c.name === selected[2]);
        if (selCity) setCityName(selCity.name);
      } else {
        setCityName("");
      }
    } else {
      setCities([]);
      setCityName("");
    }
  }, [countryName, stateName, selected]);

  return (
    <>
      <div className="form__group fs-4">
        <select
          className="form-select fontfrm"
          value={selected?.[0] || countryName}
          onChange={e => {
            setCountryName(e.target.value);
            changeCountry?.(e);
          }}
        >
          <option value="">Country</option>
          {countries.map(c => (
            <option key={c.isoCode} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form__group">
        <select
          className="form-select fontfrm"
          value={selected?.[1] || stateName}
          onChange={e => {
            setStateName(e.target.value);
            changeRegion?.(e);
          }}
        >
          <option value="">City</option>
          {states.map(s => (
            <option key={s.isoCode} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

  
    </>
  );
};

export default Location;
