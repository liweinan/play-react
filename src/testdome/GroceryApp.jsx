import React from 'react';

const Product = props => {
    const plus = () => {
        props.onVote('up', props.index);
    };
    const minus = () => {
        props.onVote('down', props.index);
    };
    return (
        <li>
            <span>{props.name}</span> - <span>votes: {props.votes}</span>
            <button onClick={plus}>+</button>
            {" "}
            <button onClick={minus}>-</button>
        </li>
    );
};

const GroceryApp = (props) => {
    let [products, setProducts] = React.useState(props.products);

    const onVote = (dir, index) => {

        setProducts(prevProducts => {
            const newProducts = [...prevProducts];
            console.log("prevProducts", prevProducts);
            newProducts[index] = {
                ...newProducts[index],
                votes: dir === 'up'
                    ? newProducts[index].votes + 1
                    : newProducts[index].votes - 1
            };
            console.log("newProducts", newProducts);
            return newProducts;
        });
    };

    return (
        <div id="groceryapp">
            <ul>
                {products.map((product, index) => (
                    <Product
                        key={product.name}
                        name={product.name}
                        votes={product.votes}
                        index={index}
                        onVote={onVote}
                    />
                ))}
            </ul>
        </div>
    );
};

export default GroceryApp;
