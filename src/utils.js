import {  Popup,Circle,CircleMarker} from "react-leaflet";
import numeral from "numeral";
import React from "react";









const caseTypeColors = {
  cases: {
      hex: "#CC1034",
      multiplier: 800,
  },
  recovered: {
      hex: "#7dd71d",
      multiplier: 1200,
  },
  deaths: {
      hex: "#fb4443",
      multiplier: 2000,
  },
};

export const sortData = (data) => {
    const sortedData = [...data];
  

    return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
}

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";



export const showDataOnMap = (countries, caseType = "cases", countryCode, center, countryFlag) =>
  
  countryCode === "worldwide" ?
  
    countries.map(country => (
      <Circle
        center={[country.countryInfo.lat, country.countryInfo.long]}
        color={caseTypeColors[caseType].hex}
        fillColor={caseTypeColors[caseType].hex}
        fillOpacity={0.4}
        radius={
          Math.sqrt(country[caseType]) * caseTypeColors[caseType].multiplier
        }
      >
         
        <Popup>
         
          <div className="info_container">
            <div className="info_flag" ><img src={country.countryInfo.flag} alt="flag"></img></div>
            <div className="info_name">{country.country}</div>
            <div className="info_confirmed">Cases: <strong>{numeral(country.cases).format("0,0")}</strong></div>
            <div className="info_recovered">Recovered: <strong>{numeral(country.recovered).format("0,0")}</strong></div>
            <div className="info_deaths">Deaths: <strong>{numeral(country.deaths).format("0,0")}</strong></div>
          </div>
          
        </Popup>
      
      </Circle>
    ))
    :
    <CircleMarker center={center}>
  <Popup>

<div className="info_container">
    <div className="info_flag" ><img src={countryFlag} alt="flag"></img></div>
    <div className="info_name">{countries.country}</div>
    <div className="info_confirmed">Cases: <strong>{numeral(countries.cases).format("0,0")}</strong></div>
    <div className="info_recovered">Recovered: <strong>{numeral(countries.recovered).format("0,0")}</strong></div>
    <div className="info_deaths">Deaths: <strong>{numeral(countries.deaths).format("0,0")}</strong></div>
  </div>

</Popup>

</CircleMarker>


    



  

  
