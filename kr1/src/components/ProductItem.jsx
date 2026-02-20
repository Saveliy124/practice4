import React from "react";  
  
export default function ProductItem({ product, onEdit, onDelete }) {  
    return (  
        <div className="product-card">  
            <div className="product-card__image">
                <img src={product.image} alt={product.title} />
                <span className="badge category">{product.category}</span>
                <span className="badge rating">★ {product.rating}</span>
            </div>
            <div className="product-card__content">
                <h3 className="title">{product.title}</h3>
                <p className="desc">{product.description}</p>
                
                <div className="stats">
                    <div className="price">{product.price.toLocaleString("ru-RU")} ₽</div>
                    <div className="stock">На складе: {product.stock} шт.</div>
                </div>

                <div className="actions">  
                    <button className="btn" onClick={() => onEdit(product)}>Изменить</button>  
                    <button className="btn btn--danger" onClick={() => onDelete(product.id)}>Удалить</button>  
                </div>  
            </div>
        </div>  
    );  
}
