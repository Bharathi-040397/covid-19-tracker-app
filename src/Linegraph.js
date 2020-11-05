import React,{useState,useEffect} from 'react'
import { Line } from "react-chartjs-2";
import numeral from 'numeral';




const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    parser: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
        
    },
};

const buildChartData = (data, caseType) => {
    const chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
        if (lastDataPoint) {
            let newDataPoint = {
                x: date,
                y: data[caseType][date] - lastDataPoint,
            };
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[caseType][date];
    }
    return chartData;
};

var fetchData;
function Linegraph({caseType="cases",countryCode,...props}) {
    const [data, setData] = useState({});
    
    useEffect(() => {
        if (countryCode === "worldwide") {
             fetchData = async () => {
                await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        
                        const chartData = buildChartData(data, caseType);
                        setData(chartData);
                    })
            }
        }
        else {
            
        fetchData = async (countryCode) => {
            await fetch(`https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=30`)
                .then((response) => response.json())
                .then((data) => {
                    
                const chartData = buildChartData(data.timeline, caseType);
                setData(chartData);
            })
            }
        }
        fetchData(countryCode);
           
    }, [caseType,countryCode])
    
    const bgcolor=()=>
    {
        var bg;
        if (caseType === "cases")
        {
             bg="rgba(204,16,52,0.5)"
        }
        else if (caseType === "recovered")
        {
             bg="#7dd71d"
        }
        else
        {
             bg="#fb4443"
        }
        return bg;
    }
    const linecolor=()=>
    {
        var lg;
        if (caseType === "cases")
        {
             lg = "#CC1034"
        }
        else if (caseType === "recovered")
        {
             lg = "rgb(99, 160, 7)"
        }
        else
        {
             lg ="#555"
        }
        return lg;
    }
    
    return (
        <div className={props.className}>
            {data?.length > 0 && (
                <Line
                    options={options}
                    data={{
                        
                        datasets: [
                            {
                            
                                backgroundColor:bgcolor(),
                                borderColor: linecolor(),
                                data: data,
                            
                            }
                        ]
                    
            
                    
                }}
                />

            )}
                    </div>
    )
}

export default Linegraph
