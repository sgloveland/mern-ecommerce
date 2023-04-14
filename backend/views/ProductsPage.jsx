import React from 'react'
import ProductCard from './components/ProductCard'

export default function ProductsPage({recents, products}) {
    return (
        <>
            <h2>All Products</h2>
            <div className="product-screen-content">
                {products.map((product, index) => (
                    <ProductCard key={index} id={product._id} name={product.name} price={product.price} brand={product.brand} image={product.imageURL}/>
                ))}
            </div>
        </>
    )
}