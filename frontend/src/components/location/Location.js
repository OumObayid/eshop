/*
 * eShop Project
 * Copyright (c) 2025 Oumaima El Obayid
 
 * Description:
 * Composant Location permettant de sélectionner un pays, un état/région
 * et une ville. Utilise la librairie "country-state-city" pour récupérer
 * les données géographiques.
 *
 * Props:
 * - action: tableau de fonctions [changeCountry, changeRegion, changeCity]
 *           appelées à chaque changement de sélection
 * - selected: tableau [countryName, cityName] pour définir
 *             les valeurs initiales
 *
 * Usage:
 * <Location action={[setCountry, setCity]} selected={["Morocco","Casablanca",""]} />
 *
 * License:
 * MIT License
 * You may freely use, modify, and distribute this file
 * provided that the above copyright notice and this
 * permission notice appear in all copies.
 *
 * MIT License details: https://opensource.org/licenses/MIT
 */

import { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city"; // Librairie pour pays, états et villes

const Location = ({ action, selected }) => {
  // Déstructuration des fonctions de mise à jour
  const changeCountry = action[0];
  const changeRegion = action[1];
  const changeCity = action[2];

  // États locaux pour stocker les données
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

  // Charger les états à partir du pays sélectionné
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

  // Charger les villes à partir de l'état sélectionné
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
      {/* Sélecteur de pays */}
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

      {/* Sélecteur d'état / région */}
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
