import React,{useState,useEffect} from 'react';
import './App.css';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import InfoBox from './InfoBox.js';
import Table from './Table';
import Linegraph from './Linegraph';
import { sortData } from './utils';
import Map1 from './Map1';
import "leaflet/dist/leaflet.css";
import { prettyPrintStat } from './utils'

var worldData;
function App() {
  
  const [countries, setCountries] = useState([]);
  const [countryvalue, setCountryValue] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [caseType, setCaseType] = useState("cases");
  const [mapCenter, setMapCenter] = useState([34.80746,-40.4796 ]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [countryFlag, setCountryFlag] = useState({});
  const [countryName, setCountryName] = useState("");
  
  
  
  
  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then((response) => response.json())
      .then(data => {
        
        setCountryInfo(data);
        
      
      })
  }, []);

  useEffect(() => {

    const getCountriesData = async () => {
      
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then(data => {
          
          const countries = data.map(country => ({
            name: country.country,
            value: country.countryInfo.iso2,
             flag:country.countryInfo.flag,
            
          }));
          

          
          
          setCountries(countries);
           worldData=()=>
          {
             setMapCountries(data);
             let sortedData = sortData(data);
             setTableData(sortedData);
          }
          worldData();
      })
    }
    getCountriesData();
  }, []);

  

   
    
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    countryCode==="worldwide"?await fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
       .then(data => { 
         setCountryInfo(data);  
         worldData();
         setCountryFlag("");
         setMapCenter([34.80746, -40.4796]);
         setCountryValue("worldwide");
         
    })
           :
    await fetch(`https://disease.sh/v3/covid-19/countries/${countryCode}`)
      .then(response => response.json())
      .then(data => {
      
      setCountryValue(countryCode);
      setMapCountries(data);
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
      setCountryInfo(data);
        setCountryFlag(data.countryInfo.flag);
        setCountryName(data.country);
        setTableData(data);
     })
    
  }

  return (
    <div className="app">
      <div className="app_container">
      <div className="app_left">
      <div className="app_header">
          <h1>Covid-19 Tracker</h1>
          <FormControl className='app_dropdown'>
              <Select variant='outlined' value={countryvalue} onClick={onCountryChange} >
                <MenuItem value='worldwide'><img src='https://th.bing.com/th/id/OIP.eKme1-YRhbZr38vQ7NbalgAAAA?pid=Api&rs=1' style={{width:15 ,marginRight:'0.5rem'}} alt="flag"/>Worldwide</MenuItem>
              {
                countries.map((country) => (
                  <MenuItem value={country.value}><img src={country.flag} style={{width:30 ,marginRight:'0.5rem'}} alt="flag"/>{country.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          
        </div>
        <div className="app_stats">
          <InfoBox title="Coronavirus Today cases"
            onClick={(e) => setCaseType("cases")}
            isCases
            active={caseType === "cases"}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)} />
          <InfoBox title="Today Recovered"
            onClick={(e) => setCaseType("recovered")}
            active={caseType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)} />
          <InfoBox title="Today Deaths"
            onClick={(e) => setCaseType("deaths")}
            isDeaths
            active={caseType === "deaths"}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)} />
        </div>
        <Map1
          center={mapCenter}
          zoom={mapZoom}
            countries={mapCountries}
            countryCode={countryvalue}
            caseType={caseType}
            countryFlag={countryFlag}
            
            
        />
        
      </div>
      <Card className="app_right">
        <CardContent>
          
          <h3>Live Cases by Country</h3>
          <Table countryCode={countryvalue} countries={tableData} />
          <br></br>
            {countryvalue !== "worldwide" ? <h3> {countryName} New {caseType}</h3> : <h3> {countryvalue} New  {caseType}</h3>} 
            <Linegraph className="app__graph" countryCode={countryvalue} caseType={caseType} />
        
          </CardContent>
       
      </Card>
      </div>
      <footer style={{ textAlign: "center", boxShadow: '2px 2px 10px #f5f5f5'}}>@copy rights by <strong style={{color:"#555"}}>Bharathi</strong></footer>
        
    </div>
  );
}

export default App;
