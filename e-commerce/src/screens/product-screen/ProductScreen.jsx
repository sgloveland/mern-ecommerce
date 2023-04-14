import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/product-card/ProductCard";
import RecentProductCard from "../../components/recent-product-card/RecentProductCard";
import "./ProductScreen.css"
import Header from "../../components/header/Header";

function ProductScreen() {
    const [serverRenderedPage, setServerRenderedPage] = useState(null)
    const [recents, setRecents] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:4000/products')
            .then((res) => res.text())
            .then((data) => {
                setServerRenderedPage(data)
            })
            .catch((error) => {
                console.log(error)
            })

        fetch('http://localhost:4000/api/orders/')
            .then(res => res.json())
            .then((data) => {
                setRecents(prev => [...prev, ...data.result])
            })
            .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        if(serverRenderedPage) {
            console.log(document.getElementById('server-rendered-content'))
            const productCardElements = document.querySelectorAll('#server-rendered-content .product-screen-content .product-card')
            
            for(let i = 0; i < productCardElements.length; ++i) {
                productCardElements[i].addEventListener('click', () => {
                    navigate(`/product/${productCardElements[i].id}`);
                })
            }
        }
    }, [serverRenderedPage])

    return (
        <div className="product-screen">
            <Header title="Browse Products"/>
            <h2>Recently Ordered</h2>
            <div className="product-screen-content">
                {recents.map((product, index) => (
                    <RecentProductCard key={index} initialRating={product.rating} id={product._id} name={product.name} price={product.price} brand={product.brand} image={product.imageURL}/>
                ))}
            </div>

            <div
            id="server-rendered-content" 
            dangerouslySetInnerHTML={{__html: serverRenderedPage}}
            />
        </div>
    )
}

export default ProductScreen;