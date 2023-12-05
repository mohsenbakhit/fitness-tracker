import React, {useState} from "react";

const PaidUserRegister = () => {
    return (
        <div>
        <label>Credit Card Number: </label><input type="tel" name="ccnumber"placeholder="6012-1234-5678-9000"/><br/>
        <label>Cardholder Name: </label><input type="text" name="ccholder"placeholder="John Doe"/><br/>
        <label>Expiry Date: </label><input type="date" name="ccexp"placeholder="00/00/0000"/><br/>
        <label>CVV2: </label><input type="tel" name="ccv2"placeholder="000"/><br/>
        <label>Postal Code: </label><input type="text" name="postalcode"placeholder="X1X 1X1"/><br/>
        <br/><br/>
        </div>
    )
}

export default PaidUserRegister;