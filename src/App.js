import React, { useState, useEffect } from "react";
import "./App.css";
import Coin from "./Coin";

function App() {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("");
    const [coinNumber, setCoinNumber] = useState(8);
    const [page, setPage] = useState(1);
    const pageArray = [
        ["redBtn", -3],
        ["redBtn", -2],
        ["redBtn", -1],
        ["greenBtn", 0],
        ["redBtn", 1],
        ["redBtn", 2],
        ["redBtn", 3],
    ];

    useEffect(() => {
        let request =
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=" +
            coinNumber +
            "&page=" +
            page +
            "&sparkline=false";
        fetch(request)
            .then((response) => response.json())
            .then((coins) => setCoins(coins))
            .catch((error) => console.log(error));
    }, [coinNumber, page]);

    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleChangeNumber = (e) => {
        if (page > 1) {
            setPage(Math.floor(1 + (coinNumber * (page - 1)) / e.target.value));
        }
        setCoinNumber(e.target.value);
        //console.log(e.target.value);
    };

    const handleChangePage = (e) => {
        setPage(e.target.value);
        console.log(e.target.value);
    };

    const filteredCoins = coins.filter((coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="coin-app">
            <div className="coin-search">
                <form>
                    <label>
                        <h4 className="coin-text">Search a cryto</h4>
                    </label>
                    <input
                        id="coin-input"
                        className="coin-input"
                        type="text"
                        onChange={handleChangeSearch}
                        placeholder="Search"
                    />
                </form>
            </div>
            <div className="coin-number">
                <div onChange={handleChangeNumber}>
                    {" "}
                    <label>
                        <h5># of crypto listed per page :</h5>
                    </label>
                    <input type="radio" value="8" name="coin-number" /> 2³
                    <input type="radio" value="16" name="coin-number" /> 4²
                    <input type="radio" value="64" name="coin-number" /> 8²
                    <input type="radio" value="256" name="coin-number" /> 16²
                </div>
            </div>
            <div className="coin-container">
                <div className="coin-row">
                    <div className="coin">
                        <p>Name</p>
                    </div>
                    <div className="coin-data">
                        <p className="coin-price">Price</p>
                        <p className="coin-volume">Volume</p>
                        <p className="coin-percent">on 24h</p>
                        <p className="coin-marketcap">Market Cap</p>
                    </div>
                </div>
            </div>
            {filteredCoins.map((coin) => {
                return (
                    <Coin
                        key={coin.id}
                        id={coin.id}
                        name={coin.name}
                        price={coin.current_price}
                        symbol={coin.symbol}
                        marketcap={coin.total_volume}
                        volume={coin.market_cap}
                        image={coin.image}
                        priceChange={coin.price_change_percentage_24h}
                    />
                );
            })}
            <div className="pagination">
                page :
                {pageArray.map((item, index) =>
                    parseInt(item[1]) + parseInt(page) > 0 ? (
                        <button
                            className={item[0]}
                            onClick={handleChangePage}
                            value={parseInt(item[1]) + parseInt(page)}
                            key={index}>
                            {parseInt(item[1]) + parseInt(page)}
                        </button>
                    ) : (
                        ""
                    )
                )}
            </div>
        </div>
    );
}

export default App;
