import React, { useEffect } from "react";
import Card from "./Card";
import { useState } from "react";

const CardList= ({adsData})=>{
const [sortOrder, setSortOrder]=useState("")
const [FBsearch, setFBSearch]=useState("")
const [TWsearch, setTWSearch]=useState("")
const [Snapsearch, setSnapSearch]=useState("")
const [fbAds, setFBAds]=useState([] )
const [twAds, setTWAds]=useState([] )
const [snAds, setSNAds]=useState([] )

useEffect(()=>{
    if(adsData){
        setFBAds(adsData?.facebookAds)
        setTWAds(adsData?.twitterAds)
        setSNAds(adsData?.snapchatAds)
    }
},[adsData])

const toggleSortOrder = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc"
    setSortOrder(newSortOrder);
    setFBAds(sortAdsBySpend([...adsData.facebookAds], 'spend', newSortOrder))
    setTWAds(sortAdsBySpend([...adsData.twitterAds], 'spend', newSortOrder))
    setSNAds(sortAdsBySpend([...adsData.snapchatAds], 'cost', newSortOrder))
  };
const clearSortOrder = () => {
    setSortOrder("");
    setFBAds(adsData?.facebookAds)
    setTWAds(adsData?.twitterAds)
    setSNAds(adsData?.snapchatAds)
  };

const sortAdsBySpend = (ads, spendProperty, sortDirection) => {
    if (sortDirection === "asc") {
      return ads.sort((ad1, ad2) => ad1[spendProperty] - ad2[spendProperty]);
    } else {
      return ads.sort((ad1, ad2) => ad2[spendProperty] - ad1[spendProperty]);
    }
  };


 const handleFaceBookFilter = (searchTerm)=>{
    setFBSearch(searchTerm)
    setFBAds(adsData.facebookAds?.filter((ad)=>ad.campaign_name.toLowerCase().includes(searchTerm.toLowerCase())))
 }

 const handleTwitterFilter = (searchTerm)=>{
    setTWSearch(searchTerm)
    setTWAds(adsData.twitterAds?.filter((ad)=>ad.campaign.toLowerCase().includes(searchTerm.toLowerCase())))
 }

 const handleSnapChatFilter = (searchTerm)=>{
    setSnapSearch(searchTerm)
    setSNAds(adsData.snapchatAds?.filter((ad)=>ad.campaign_name.toLowerCase().includes(searchTerm.toLowerCase())))
 }

const faceBookAds = fbAds.map((ad)=>{
    const googleAnalyticsResult = adsData.googleAnalytics.find((ga) => ga.utm_campaign === ad.campaign_name);
    return <Card key={ad.id} name={ad.campaign_name} adset={ad.media_buy_name} creative={ad.ad_name} impressions= {ad.impressions} spend={ad.spend} clicks={ad.clicks} result={googleAnalyticsResult.results}  />
});

const twitterAds = twAds.map((ad)=>{
    const googleAnalyticsResult = adsData.googleAnalytics.find((ga) => ga.utm_campaign === ad.campaign);
    return <Card key={ad.id} name={ad.campaign} adset={ad.ad_group} creative={ad.image_name} impressions={ad.impressions} spend={ad.spend} clicks={ad.post_clicks} result={googleAnalyticsResult.results} />
})

const snapChatAds = snAds.map((ad)=>{
    const googleAnalyticsResult = adsData.googleAnalytics.find((ga) => ga.utm_campaign === ad.campaign_name);
    return <Card key={ad.id} name={ad.campaign_name} adset={ad.ad_squad_name} creative={ad.creative_name} spend={ad.cost} impressions={ad.impressions} clicks={ad.post_clicks} result={googleAnalyticsResult.results}  />
})



    return(
        <div className="card-grid">
            <div className="ad-set">
            <button style={{ backgroundColor: 'black', color: 'white' }} onClick={toggleSortOrder}>SORT BY SPENDING</button>  <button style={{ backgroundColor: 'red', color: 'white' }} onClick={clearSortOrder}>Clear Sort Order</button>
            <h1 style={{ textDecoration: 'underline', fontWeight: 'bold'}}className="FB header">Facebook Ads</h1> 
            <input type="text" value={FBsearch} onChange={(e) => handleFaceBookFilter(e.target.value)} placeholder="Search FB ads by name" />
            <ul>
            <ul>
                {faceBookAds.length > 0 ? faceBookAds : <li>No Ads Found</li>}
            </ul>
            </ul>
            </div>
            <div className="ad-set">
            <h2 style={{textDecoration: 'underline', fontWeight: 'bold'}}className="TW header">Twitter Ads</h2>
            <input type="text" value={TWsearch} onChange={(e) => handleTwitterFilter(e.target.value)} placeholder="Search Twitter ads by name" />
            <ul>
                {twitterAds.length>0 ? twitterAds : <li>No Ads Found</li>}
            </ul>
            </div>
            <div className="ad-set">
            <h3 style={{textDecoration: 'underline', fontWeight: 'bold'}}>Snapchat Ads</h3>
            <input type="text" value={Snapsearch} onChange={(e) => handleSnapChatFilter(e.target.value)} placeholder="Search Snap ads by name" />
            <ul>
                {snapChatAds.length > 0 ? snapChatAds : <li> No Ads Found</li>}
            </ul>
            </div>
        </div>
    )
}

export default CardList