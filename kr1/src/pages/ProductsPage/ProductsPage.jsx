import React, { useEffect, useState } from "react";  
import "./ProductsPage.scss";  
import ProductItem from "../../components/ProductItem";  
import ProductModal from "../../components/ProductModal";  
import { api } from "../../api";  
  
export default function ProductsPage() {  
    const [products, setProducts] = useState([]);  
    const [loading, setLoading] = useState(true);  
    const [modalOpen, setModalOpen] = useState(false);  
    const [editingProduct, setEditingProduct] = useState(null);  
      
    useEffect(() => { loadProducts(); }, []);  
  
    const loadProducts = async () => {  
        try {  
            setLoading(true);  
            const data = await api.getProducts();  
            setProducts(data);  
        } catch (err) {  
            alert("Ошибка загрузки товаров");  
        } finally {  
            setLoading(false);  
        }  
    };  
      
    const openCreate = () => {  
        setEditingProduct(null);  
        setModalOpen(true);  
    };  
  
    const openEdit = (product) => {  
        setEditingProduct(product);  
        setModalOpen(true);  
    };  
      
    const handleDelete = async (id) => {  
        if (!window.confirm("Удалить товар из магазина?")) return;  
        try {  
            await api.deleteProduct(id);  
            setProducts((prev) => prev.filter((p) => p.id !== id));  
        } catch (err) {  
            alert("Ошибка удаления");  
        }  
    };  
  
    const handleSubmitModal = async (payload) => {  
        try {  
            if (!editingProduct) {  
                const newProduct = await api.createProduct(payload);  
                setProducts((prev) => [...prev, newProduct]);  
            } else {  
                const updatedProduct = await api.updateProduct(payload.id, payload);  
                setProducts((prev) => prev.map((p) => (p.id === payload.id ? updatedProduct : p)));  
            }  
            setModalOpen(false);  
        } catch (err) {  
            alert("Ошибка сохранения");  
        }  
    };  
  
    return (  
        <div className="page">  
            <header className="header">  
                <div className="container header__inner">  
                    <div className="brand">IT Store Admin</div>  
                </div>            
            </header>  
            <main className="main container">  
                <div className="toolbar">  
                    <h1 className="title">Товары в наличии</h1>  
                    <button className="btn btn--primary" onClick={openCreate}>+ Добавить товар</button>  
                </div>  
                {loading ? <div className="empty">Загрузка товаров...</div> : (  
                    <div className="products-grid">
                        {products.map(p => (
                            <ProductItem key={p.id} product={p} onEdit={openEdit} onDelete={handleDelete} />
                        ))}
                    </div> 
                )}  
            </main>  
            <ProductModal open={modalOpen} initialProduct={editingProduct} onClose={() => setModalOpen(false)} onSubmit={handleSubmitModal} />  
        </div>    
    );  
}
