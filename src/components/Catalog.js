import React, {useEffect, useState} from "react";
import axios from "axios";

const Catalog = () => {
    const [products, setProducts] = useState([]);

    useEffect( () => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/product');
                setProducts(response.data);
            } catch (error) {
                console.log('error', error);
            }
        }

        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Товары</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <strong>{product.name}</strong><br />
                        Старая Цена: <strike>{product.out_price}</strike><br />
                        Новая Цена: <strike>{product.sale_price}</strike><br />
                        Описание: {product.description}<br />
                        <image src={product.image} alt="Картинка"></image>
                    </li>
                ))}
            </ul>
        </div>
    );

}

export default Catalog;