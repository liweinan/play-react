import React, { useState, useMemo } from "react";
import ReactDOM from "react-dom";

// https://app.testdome.com/library?page=1&term=Mega+Store+App&termMatchType=equalsCaseInsensitive&questionId=129895
const DiscountType = {
    Standard: 'standard',
    Seasonal: 'seasonal',
    Weight: 'weight'
}

const PriceCalculator = () => {


    const [discountType, setType] = useState('standard')
    const [cartWeight, setWeight] = useState(0)
    const [totalPrice, setPrice] = useState(0)

    const discounted = useMemo(() => {
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
    }, [discountType, cartWeight, totalPrice])


    return (
        <div>
            <label htmlFor="type">Select Type:</label>
            <select id="type" name="type" value={discountType} onChange={e => setType(e.target.value)}>
                <option value="standard">Standard</option>
                <option value="seasonal">Seasonal</option>
                <option value="weight">Weight</option>
            </select>

            <label htmlFor="weight">Weight (kg):</label>
            <input type="number" id="weight" name="weight" step="0.01" value={cartWeight} onChange={e => setWeight(e.target.value)} />

            <label htmlFor="totalPrice">Total Price ($):</label>
            <input type="number" id="totalPrice" name="totalPrice" step="0.01" value={totalPrice} onChange={e => setPrice(e.target.value)}/>

            <div>Discounted price:<span id="discountedPrice">{discounted}</span></div>
        </div>
    );
};

export default PriceCalculator
// document.body.innerHTML = "<div id='root'></div>";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<PriceCalculator />);
