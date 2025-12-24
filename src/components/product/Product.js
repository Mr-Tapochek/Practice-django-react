import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./product.scss";
const Product = () => {
    const { id } = useParams();
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
        <div className="product-page">
            <div className="product-container">
                <div className="product-image-section">
                    <img src={product.image} alt={product.name} className="product-main-image"/>
                </div>

                <div className="product-info-section">
                    <h1 className="product-title">{product.name}</h1>

                    <div className="product-prices">
                        <div className="price-old">
                            <span className="old-label">Старая цена:</span>
                            <span className="old-value"><strike>{product.out_price} ₽</strike></span>
                        </div>
                        <div className="price-current">
                            <span className="current-label">Цена:</span>
                            <span className="current-value">{product.sale_price} ₽</span>
                        </div>
                    </div>

                    <div className="product-description">
                        <h3>Описание</h3>
                        <p>{product.description || 'Описание отсутствует'}</p>
                    </div>

                    <Link to={`/catalog`} className="back-button">← Назад в каталог</Link>
                </div>
            </div>
        </div>
    );

}

export default Product;