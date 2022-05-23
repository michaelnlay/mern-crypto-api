import React, { useState } from "react";

//STEP 4 - create state variable to store all the coins in that we get back
const Coins = () => {
  let [coinList, setCoinList] = useState([]);

  //STEP 2- create a function after clicking on button
  const getCoins = () => {
    console.log("getting coins now...");

    //Step 3 - fetch data from API endpoint
    //fetch gives back a promise. a promise is a set of code that is asynchronous (it doest go from line to line) where the reponse time is not exact and we can allow it to perform some task or run some code while it is waiting to get back the response. When it gets back the response, we can tell it what to do in the .then()
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    )
      .then((response) => {
        //.then means whenever the api is done getting back the data
        console.log("2");
        return response.json(); //conver the response to json that our applicaiton can read
      })
      .then((response) => {
        //this is a callback function

        console.log("got the response-->", response);
        //Step 4A - setCoinList to be the response
        setCoinList(response);
      })
      .catch((err) => {
        //.catch is for if there is any issue in getting the data
        console.log(err);
      });
  };

  return (
    <>
      <h2>Lastest information:</h2>
      <div>
        {/* STEP 1 - Create button and make it functional */}
        <button onClick={getCoins}>Click me for latest coin info</button>
        {/* Step 5 - display data to page using .map() */}
        {
          // a function that given an input to another function is called 'callback'
          coinList.map((coin, idx) => {
            // the first one is each item on the list, the second one is the index
            return (
              <div key={idx}>
                <h3>{coin.name}</h3>
                <p>Price:${coin.current_price}</p>
                <img src={coin.image} alt="" width="150px" />
              </div>
            );
          })
        }
      </div>
    </>
  );
};
export default Coins;
