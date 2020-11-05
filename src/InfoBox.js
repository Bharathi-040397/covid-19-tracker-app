import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core';
import './InfoBox.css'

function InfoBox({title,cases,active,isCases,isDeaths,total,...props}) {
    return (
        <Card onClick={props.onClick} className={`infoBox ${active && "infoBox--selected"} ${isCases && "infoBox--cases"} ${isDeaths && "infoBox--deaths"} `}>
            <CardContent>
                <Typography className="info_title" color='textSecondary' >
                    {title}
                </Typography>

                <h2 className={`info_cases ${isCases && "info_cases--recover"} ${isDeaths && "info_cases--recover"}`}>{cases}</h2>
                <Typography className="info_total" color="textSecondary">
                    {total} total
                </Typography>

            </CardContent>
        </Card>
        
    )
}

export default InfoBox
