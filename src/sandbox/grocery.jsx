// https://www.testdome.com/library?page=1&skillArea=48&questionSets=public&questionId=149714
import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';

const Product = ({name, votes, onUpvote, onDownvote}) => {
    return (
        <li>
            <span>{name}</span> - <span>votes: {votes}</span>
            <button onClick={onUpvote}>+</button>
            <button onClick={onDownvote}>-</button>
        </li>
    );
};

const GroceryApp = (props) => {
    let [products, setProducts] = React.useState(props.products);
    const handleUpvote = (index) => {
        setProducts(prev => prev.map((product, i) => {
            return i === index ? {...product, votes: product.votes + 1} : product
        }))
    }

    const handleDownvote = (index) => {
        setProducts(prev => prev.map((product, i) => {
            return i === index ? {...product, votes: product.votes - 1} : product
        }))
    }

    return (
        <ul>
            {/* Render an array of products, which should call onVote when + or - is clicked */}
            {products.map((product, index) => (
                <Product
                    key={product.name}
                    name={product.name}
                    votes={product.votes}
                    onUpvote={() => handleUpvote(index)}
                    onDownvote={() => handleDownvote(index)}
                />

            ))}
        </ul>
    );
}

document.body.innerHTML = "<div id='root'></div>";
const root = createRoot(document.getElementById("root"));
root.render(<GroceryApp
    products={[
        {name: "Oranges", votes: 0},
        {name: "Bananas", votes: 0}
    ]}
/>);

setTimeout(() => {
    let plusButton = document.querySelector("ul > li > button");
    if (plusButton) {
        plusButton.click();
    }
    setTimeout(() => {
        console.log(document.getElementById('root').outerHTML);
    });
});