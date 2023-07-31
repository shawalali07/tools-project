import { useState , useEffect } from "react";
import "./details.css";

const CurrencyDetails = ({data}) => {
  const [displayData , setDisplayData] = useState([
    1689936900000,
    "1889.00000000",
    "1889.30000000",
    "1888.55000000",
    "1888.87000000",
    "7.63640000",
    1689937199999,
    "14423.91691800",
    65,
    "5.04080000",
    "9520.84890300",
    "0"
])


  useEffect(()=>{
    const hasData = data.length > 0
    if (hasData){
      setDisplayData(data.slice(-1)[0])
    }
  },[data])


  return (
    <div className="currencyDetails">
      <h1>Currency Data</h1>

      <table class="crypto-table">
        <tr>
          <th>Statistics</th>
          <th>Eth / BUSD</th>
        </tr>
        <tr>
          <td>24h Volume ETH</td>
          <td>{displayData[7]}</td>
        </tr>
        <tr>
          <td>24h Volume BUSD</td>
          <td>{displayData[10]}</td>
        </tr>
        <tr>
          <td>24h high</td>
          <td>{displayData[4]}</td>
        </tr>
        <tr>
          <td>24h Low</td>
          <td>{displayData[3]}</td>
        </tr>
        <tr>
          <td>Large Orders</td>
          <td>{displayData[2]}</td>
        </tr>
        <tr>
          <td>Medium Orders</td>
          <td>{displayData[1]}</td>
        </tr>
        <tr>
          <td>Small Orders</td>
          <td>{displayData[9]}</td>
        </tr>
      </table>
    </div>
  );
};

export default CurrencyDetails;
