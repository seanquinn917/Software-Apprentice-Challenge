import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import CardList from './CardList';

function App() {

 const [adsData, setAdsData]=useState({facebookAds:[], twitterAds:[], snapchatAds:[], googleAnalytics:[]})
 

  useEffect(()=>{
    fetch("http://localhost:3000/fakeDataSet")
    .then((r)=>r.json())
    .then((data)=>setAdsData({facebookAds:data.facebook_ads, twitterAds: data.twitter_ads, snapchatAds: data.snapchat_ads, googleAnalytics: data.google_analytics}))
  },[])




  return (
    <div className="App">
      <CardList adsData={adsData}/>
    </div>
  );
}

export default App;
