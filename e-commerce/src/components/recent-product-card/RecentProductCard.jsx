import "./RecentProductCard.css"
import {useNavigate} from 'react-router-dom'
import {Rating} from '@mui/material'
import {useState} from 'react'

function RecentProductCard({id, name, price, brand, image, initialRating}) {
    const [rating, setRating] = useState(initialRating)
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${id}`)
    }

    return (
        <div className="container">
            <div className="card" onClick={handleClick}>
                <div className="image-container">
                    <img src={image}/>
                </div>
                    <h3 className="name">{name}</h3>
                    <p className="brand">{brand}</p>
                    <p className="price">${price}</p>
            </div>
            <Rating
            className="rating"
            name="simple-controlled"
            value={rating || 0}
            onChange={async (event, newValue) => {
                setRating(newValue);
                await fetch(`http://localhost:4000/api/products/${id}`, {
                    method: 'put',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        rating: newValue
                    })
                })
            }}
            />
        </div>
    )
}

export default RecentProductCard;