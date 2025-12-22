import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const Product = () => {
    const {id} = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/product/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('error:', error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) return <p>Загрузка...</p>;

    return (
        <div>
            <span><strong>{product.name}</strong></span><br />
            <span>Старая Цена: <strike>{product.out_price}</strike></span><br />
            <span>Новая Цена: {product.sale_price}</span><br />
            <span>Описание: {product.description}</span><br />
            <img src={product.image} alt="Картинка" width={400}/>
            <hr/>          
            <Link to={`/catalog`}>Назад</Link>   
        </div>
    );

}

export default Product;