import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HistoryChart from "./HistoryChart";
import "./Crypto.css";
//import { Link } from "react-router-dom";

function Crypto() {
	const { id } = useParams();
	const [coinDetails, setCoinDetails] = useState(null);

	useEffect(() => {
		let request =
			"https://api.coingecko.com/api/v3/coins/" +
			id +
			"?localization=false&developer_data=false&sparkline=false";
		//console.log(request);
		fetch(request)
			.then((response) => response.json())
			.then((coinDetails) => {
				setCoinDetails(coinDetails);
				//console.log("dans le zen ..");
				console.log("inside", coinDetails);
			})
			.catch((error) => console.log(error));
		console.log("outside", coinDetails);
	}, []);

	return (
		<>
			<div className="cryptoDetails">
				{/* <h2>{id}</h2> */}
				{coinDetails != null ? (
					<>
						<table>
							<tbody>
								<tr>
									<td>
										<h2>
											<img
												src={coinDetails.image.small}
												alt="crypto"
											/>
											{coinDetails.name}
										</h2>
									</td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td>
										Homepage :
										<h5>
											<a
												href={
													coinDetails.links
														.homepage[0]
												}
												target="_blank"
												rel="noopener noreferrer"
											>
												{coinDetails.links.homepage[0]}
											</a>
										</h5>
									</td>
									<td>
										Creation date :
										<h5>{coinDetails.genesis_date}</h5>
									</td>
									<td>
										Rank :{" "}
										<h5>{coinDetails.coingecko_rank}</h5>
									</td>
								</tr>
								<tr>
									<td>
										Price :
										<h5>
											{
												coinDetails.market_data
													.current_price.usd
											}{" "}
											$
										</h5>
									</td>
									<td>
										Market Cap :
										<h5>
											${" "}
											{
												coinDetails.market_data
													.market_cap.usd
											}
										</h5>
									</td>
									<td>
										Evolution last 24h :
										<h5>
											{coinDetails.market_data.price_change_percentage_24h.toFixed(
												2
											)}{" "}
											%
										</h5>
									</td>
								</tr>
							</tbody>
						</table>
						<HistoryChart
							id={id}
							// data={{
							// 	day: dayChartData,
							// 	week: weekChartData,
							// 	year: yearChartData,
							// }}
							// name={coinDetails.name}
						/>
						<h4>About :</h4>
						<p>{coinDetails.description.en}</p>
					</>
				) : (
					<p></p>
				)}
			</div>
		</>
	);
}

export default Crypto;
