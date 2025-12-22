import React, {useEffect, useState} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Catalog = () => {
    const [products, setProducts] = useState([]);

    useEffect( () => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/product');
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
                {products.map(product => (
                    <Link to={`/catalog/product/${product.id}`}>
                        <span><strong>{product.name}</strong></span><br />
                        <span>Старая Цена: <strike>{product.out_price}</strike></span><br />
                        <span>Новая Цена: {product.sale_price}</span><br />
                        <span>Описание: {product.description}</span><br />
                        <img src={product.image} alt="Картинка" width={400}/>
                        <hr/>
                    </Link>
                ))}
        </div>
    );

}

export default Catalog;