

#pragma once

enum OrderSide{
	Buy,
    Sell,
    none
};

enum OrderStatus{
    //Init status, limit order in order book
    InOrderBook
    //Partially matched
    ,Processing
    //Fully matched
    ,Matched
    //Not enough funds on account
    ,NotEnoughFunds
    //No liquidity
    ,NoLiquidity
    //Unknown asset
    ,UnknownAsset
    //Cancelled
    ,Cancelled
    //end
    ,none
};
