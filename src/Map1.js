import React from 'react';
import './Map1.css';
import {TileLayer,Map} from "react-leaflet"
import { showDataOnMap } from './utils';


function Map1({center,zoom,countries,caseType,countryCode,countryFlag}) {
    return (
        <div className="map1">
            
        <Map center={center} zoom={zoom}>
            <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
               
            {showDataOnMap(countries,caseType,countryCode,center,countryFlag)};
            </Map>
            
    </div>    
    )
}

export default Map1
