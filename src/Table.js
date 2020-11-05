import React from 'react';
import "./Table.css";
import numeral from 'numeral';


function Table({ countries ,countryCode}) {
    
    return (
        <div className='table'>
            
            {
                countryCode === "worldwide"?countries.map(({ country, cases }) => (
                    <tr>
                    
                        <td>{country}</td>
                        <td>{numeral(cases).format("0,0")}</td>
                    </tr>
                    
                ))
                    :
                    <table className="subTable" >
                       <tr>
                            < td style={{fontWeight:"bold"}}>Country</td>
                            <td style={{fontWeight:"bold"}}>{countries.country}</td>
  
                        </tr>
  <tr>
    <td>Total Cases</td>
    <td>{numeral(countries.cases).format("0,0")}</td>
    
  </tr>
                        <tr>
                        <td>Total Recovered</td>
    <td>{numeral(countries.recovered).format("0,0")}</td>

    
                        </tr>
                        <tr>
    <td>Total Deaths</td>
    <td>{numeral(countries.deaths).format("0,0")}</td>
    
  </tr>
  <tr>
    <td>Today Cases</td>
    <td>{numeral(countries.todayCases).format("0,0")}</td>
    
  </tr>
  <tr>
    <td>Today Recovered</td>
    <td>{numeral(countries.todayRecovered).format("0,0")}</td>
    
  </tr>
  <tr>
    <td>Today Deaths</td>
    <td>{numeral(countries.todayDeaths).format("0,0")}</td>
    
  </tr>

</table>
                    
                                }
            
            
        </div>
    )
}

export default Table
