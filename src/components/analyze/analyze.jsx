import React from "react";
import CryptoPie from "../charts/piechart";

function Analyze(props) {
  return (
    <div>
      <p>
        From: {props.location.state.fromYear} To: {props.location.state.toYear}
      </p>
      <CryptoPie cryptoList={props.location.state.cryptoList} />
    </div>
  );
}

export default Analyze;
