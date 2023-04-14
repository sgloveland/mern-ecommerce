import "./Header.css"
import { useNavigate } from "react-router-dom";
import {IoCart, IoHome} from "react-icons/io5"

const Header = ({title}) => {
    const navigate = useNavigate()

    const goToHome = () => {
        navigate('/')
    }

    const goToCart = () => {
        navigate("/cart")
    }

    return (
        <div className='header'>
                <div className="header-icon-container">
                    <IoHome className="header-icon" onClick={goToHome}/>
                </div>
                <div className="header-text-container">
                    <h1>{title}</h1>
                </div>
                <div className="header-icon-container" >
                    <IoCart className="header-icon" onClick={goToCart}/>
                </div>
        </div>
    )
}

export default Header;