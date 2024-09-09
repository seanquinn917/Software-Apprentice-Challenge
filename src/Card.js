import React from "react";


function Card({name, adset, creative, impressions, spend, clicks, result}){

    

    return(
        <div style={{ backgroundColor: "gray", color: 'white' }} className="local-card">
            <h1>{name} Campaign aka {creative}</h1>
            <h2>How many people did we reach? {impressions}!</h2>
            <h3>Ad Group: {adset}</h3>
            <h4>Money spent: ${spend}</h4>
            <h5>{clicks} clicks!</h5>
            <h6>Result: {result}</h6>
        </div>
    )
}

export default Card;