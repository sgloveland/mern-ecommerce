import React from 'react'

export default function ProductDetails(props) {
    return (
        <div className="details-screen-content">
                <div className="details-screen-image">
                    <img src={props.imageURL}/>
                </div>
                <div className="details-screen-info">
                    <p className="details-screen-text"><strong>Product Name:</strong> {props.name}</p>
                    <p className="details-screen-text"><strong>Price:</strong> ${props.price}</p>
                    <p className="details-screen-text"><strong>Brand: </strong> {props.brand}</p>
                    <p className="details-screen-text"><strong>Product Size:</strong> {props.sizes}</p>
                    <p className="details-screen-text"><strong>Product Description:</strong> {props.description}</p>
                </div>
        </div>
    )
}