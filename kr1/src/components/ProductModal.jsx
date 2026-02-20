import React, { useEffect, useState } from "react";  
  
export default function ProductModal({ open, initialProduct, onClose, onSubmit }) {  
    const [formData, setFormData] = useState({ title: "", category: "", description: "", price: "", stock: "", rating: "" });

    useEffect(() => {  
        if (open) {
            setFormData(initialProduct || { title: "", category: "", description: "", price: "", stock: "", rating: "5.0" });
        }
    }, [open, initialProduct]);  
  
    if (!open) return null;  
  
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {  
        e.preventDefault();  
        onSubmit({ id: initialProduct?.id, ...formData });  
    };  
  
    return (  
        <div className="backdrop" onMouseDown={onClose}>  
            <div className="modal" onMouseDown={e => e.stopPropagation()}>  
                <div className="modal__header">  
                    <div className="modal__title">{initialProduct ? "Редактировать товар" : "Новый товар"}</div>  
                    <button className="iconBtn" onClick={onClose}>✕</button>  
                </div>  
                <form className="form" onSubmit={handleSubmit}>  
                    <label className="label">Название <input name="title" className="input" value={formData.title} onChange={handleChange} required/></label>  
                    <label className="label">Категория <input name="category" className="input" value={formData.category} onChange={handleChange} required/></label>
                    <label className="label">Описание <textarea name="description" className="input" value={formData.description} onChange={handleChange} required/></label>
                    <div className="row">
                        <label className="label">Цена (₽) <input name="price" type="number" className="input" value={formData.price} onChange={handleChange} required/></label>
                        <label className="label">Количество <input name="stock" type="number" className="input" value={formData.stock} onChange={handleChange} required/></label>
                    </div>
                    <div className="modal__footer">  
                        <button type="button" className="btn" onClick={onClose}>Отмена</button>  
                        <button type="submit" className="btn btn--primary">Сохранить</button>  
                    </div>  
                </form>  
            </div>  
        </div>  
    );  
}
