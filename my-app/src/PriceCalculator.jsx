import React, { useState } from "react";
import ReactDOM from "react-dom";

const PriceCalculator = () => {

    return (
        <div>
            <label htmlFor="type">Select Type:</label>
            <select id="type" name="type" value="standard">
                <option value="standard">Standard</option>
                <option value="seasonal">Seasonal</option>
                <option value="weight">Weight</option>
            </select>

            <label htmlFor="weight">Weight (kg):</label>
            <input type="number" id="weight" name="weight" step="0.01" />

            <label htmlFor="totalPrice">Total Price ($):</label>
            <input type="number" id="totalPrice" name="totalPrice" step="0.01"/>

            <div>Discounted price:<span id="discountedPrice">{/*discounted price expected here */}</span></div>
        </div>
    );
};

document.body.innerHTML = "<div id='root'></div>";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<PriceCalculator />);

/*
 if (discountType == DiscountType.Standard) {
            return totalPrice * (1 - 0.06);
        } else if (discountType == DiscountType.Seasonal) {
            return totalPrice * (1 - 0.12);
        } else if (discountType == DiscountType.Weight) {
            if (cartWeight <= 10) {
                return totalPrice * (1 - 0.06);
            } else {
                return totalPrice * (1 - 0.18);
            }
        } else {
            return totalPrice;
        }
 */