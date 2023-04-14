import {useState, useEffect} from 'react'
import Papa from 'papaparse'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/header/Header'
import ProductCard from '../../components/product-card/ProductCard'
import "./CartScreen.css"
import TaxesData from '../../data/tax_rates2.csv'
import ZipData from '../../data/zip_codes.csv'

const CartScreen = (props) => {
    const [cart, setCart] = useState([])
    const [error, setError] = useState("")
    const [needsUpdate, setNeedsUpdate] = useState(false)
    const [phoneError, setPhoneError] = useState("")
    const [cardError, setCardError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [zipError, setZipError] = useState("")
    const [stateError, setStateError] = useState("")
    const navigate = useNavigate()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [creditCard, setCreditCard] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [shippingStreet, setShippingStreet] = useState("")
    const [shippingCity, setShippingCity] = useState("")
    const [shippingState, setShippingState] = useState("")
    const [shippingZipCode, setShippingZipCode] = useState("")
    const [shippingMethod, setShippingMethod] = useState("standard")

    const [taxesCSV, setTaxesCSV] = useState("")
    const [zipcodeCSV, setZipcodeCSV] = useState("")
    const [zipsData, setZipsData] = useState([])
    const [taxesData, setTaxesData] = useState([])
    const [taxRate, setTaxRate] = useState("")

    useEffect(() => {
        console.log("Fetching")
        fetch('http://localhost:4000/api/cart/', {
            method: 'get',
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => {
                setCart(prev =>  [...prev, ...data.result])
                setNeedsUpdate(false)
            })
            .catch((error) => console.log(error))
    }, [needsUpdate])

    useEffect(() => {
        processTaxes()
    }, [])

    useEffect(() => {
        processZips()
    }, [])

    function getSubtotalPrice() {
        let sum = 0;
        cart.map((item) => {
            sum += item.price
        })
        return Math.round((sum + Number.EPSILON) * 100) / 100
    }

    function getTotalPrice() {
        let sum = getSubtotalPrice()
        const taxRate = getTaxRate()
        if(!isNaN(taxRate)) {
            sum *= (1 + Number(getTaxRate()))
        }
        
        return Math.round((sum + Number.EPSILON) * 100) / 100
    }

    function getTaxRate() {
        var rate;
        for (var i = 0; i < taxesData.length; i++) {
            if (taxesData[i].ZipCode === shippingZipCode) {
                rate = taxesData[i].CombinedRate;
            }
        }
        return rate;
    }

    function checkPhoneNumber(phone) {
        const isValid = phone.length === 10 && !isNaN(phone)
        if(!isValid) setPhoneError("Phone numbers should contain 10 digits.")
        if(isValid && phoneError.length > 0) setPhoneError("")
        return isValid
    }

  function checkCreditCard(card) {
    const isValid = card.length === 16 && !isNaN(card);
    if (!isValid) setCardError("Credit card numbers should contain 16 digits.");
    if (isValid && cardError.length > 0) setCardError("");
    return isValid;
  }

  function checkEmail(email) {
    const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    if (!isValid) setEmailError("This email address is invalid.");
    if (isValid && emailError.length > 0) setEmailError("");
    return isValid;
  }

  const removeItem = async (id) => {
    await fetch(`http://localhost:4000/api/cart/remove/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
  };

    function checkEmail(email) {
        const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
        if(!isValid) setEmailError("This email address is invalid.")
        if(isValid && emailError.length > 0) setEmailError("")
        return isValid
    }

    function checkZipCode(zip) {
        let isValid = zip.length === 5 && !isNaN(zip)

        for(let i = 0; i < zipsData.length; ++i) {
            if (zipsData[i].zip === zip) {
                isValid = true;
                setShippingCity(zipsData[i].city)
                setShippingState(zipsData[i].state)
                break;
            }else {
                isValid = false;
            }
        }
        if(!isValid) setZipError("This zip code is invalid.")
        if (isValid && zipError.length > 0) setZipError("")
        return isValid
    }
    
    function processZips(){
        var xhttp= new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if (this.readyState === 4 && this.status === 200) {
                setZipcodeCSV(this.responseText);
                parseZipsCSV(this.responseText);
            }
        }
        xhttp.open("GET", ZipData, true);
        xhttp.send();
    }

    function parseZipsCSV(csvString) {
        Papa.parse(csvString, {
            worker: true,
            header: true,
            complete: (result) => {
                setZipsData((prev) => ([...prev, ...result.data]));
            }
        });
    }

    function processTaxes() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                setTaxesCSV(this.responseText);
                parseTaxesCSV(this.responseText);
            }
        }
        xhttp.open("GET", TaxesData, true);
        xhttp.send();
    }

    function parseTaxesCSV(csvString) {
        //console.log(csvString);
        Papa.parse(csvString, {
            worker: true,
            header: true,
            complete: (result) => {
                setTaxesData((prev) => ([...prev, ...result.data]));
            }
        });
    }


    const handleSubmit = async () => {
        if(cart.length === 0) {
            setError("Sorry, your cart is empty!")
            return
        }

        const isValidCard = checkCreditCard(creditCard)
        const isValidPhone = checkPhoneNumber(phoneNumber)
        const isValidEmail = checkEmail(email)
        const isValidZipCode = checkZipCode(shippingZipCode)

        if(firstName && lastName && isValidEmail && shippingStreet && shippingCity && shippingState && shippingZipCode && shippingMethod && isValidPhone && isValidCard) {
            const document = await fetch('http://localhost:4000/api/cart/checkout', {
                method: 'post',
                credentials: 'include',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    creditCardNo: creditCard,
                    phone: phoneNumber, 
                    address: shippingStreet + ", " + shippingCity + ", " + shippingState + ", " + shippingZipCode,
                    shippingMethod: shippingMethod
                })
            })
            const data = await document.json() 
            navigate(`/order/${data.result._id}`)
        }
        else {
            if(!firstName || !lastName || !email || !shippingStreet || !shippingCity || !shippingState || !shippingZipCode || !shippingMethod || !phoneNumber || !creditCard) {
                setError("One or more of the above fields are blank.")
            }

            if(error.length > 0 && firstName && lastName && email && shippingStreet && shippingMethod && phoneNumber && creditCard) {
                setError("")
            }
        }
    }


    function handleZip(zip) {
        setShippingZipCode(zip);
        checkZipCode(zip);
    }

    function handleZip(zip) {
        setShippingZipCode(zip);
        checkZipCode(zip);
    }

    return (
        <div>
            <Header title="Your Cart"/>
            &nbsp;
            <h1 className="cart-label">Cart ({cart.length} items)</h1>

            <div className="cart-screen-content">
                {cart.map((item, index) => (
                    <ProductCard id={item._id} key={index} name={item.name} brand={item.brand} price={item.price} image={item.imageURL} onRemove={() => {
                        removeItem(item._id)
                        setCart(prev => [...prev].filter((product) => product._id !== item._id))
                    }}/>
                ))}
            </div>
            <h2 className="subtotal">Subtotal: ${getSubtotalPrice()}</h2>
            <h2 className="total">Total: ${getTotalPrice()}</h2>
            &nbsp;
            <form className="form" autoComplete="off" onSubmit={handleSubmit}>
                        <h2>Place an Order Now!</h2>
                        <div className="form-item">
                            <label className="form-label">First Name:</label> <br></br>
                            <input value={firstName} onChange={(event) => setFirstName(event.target.value)} required></input>
                        </div>
                        <div className="form-item">  
                            <label className="form-label">Last Name:</label> <br></br>
                            <input value={lastName} onChange={(event) => setLastName(event.target.value)} required></input>
                        </div>
                        <div className="form-item">
                            <label className="form-label">Email Address:</label> <br></br>
                            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required></input>
                            <p className='cart-error'>{emailError}</p>
                        </div>
                        <div className="form-item">
                            <label className="form-label">Phone Number (only digits): </label> <br></br>
                            <input type="tel" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} required></input>
                            <p className='cart-error'>{phoneError}</p>
                        </div>
                        <div className="form-item">
                            <label className="form-label">Credit Card Number (only digits):</label> <br></br>
                            <input value={creditCard} onChange={(event) => setCreditCard(event.target.value)} required></input>
                            <p className='cart-error'>{cardError}</p>
                        </div>

                        <div>
                            <div className="form-item">
                                <label className="form-label">Shipping Address:</label> <br></br>
                                <input value={shippingStreet} onChange={(event) => setShippingStreet(event.target.value)} required></input>
                            </div>
                            <div>
                                <div className="form-item">
                                    <label className="form-label">Zip Code:</label> <br></br>
                                    <input value={shippingZipCode} onChange={(event) => handleZip(event.target.value)} required></input>
                                    <p className='cart-error'>{zipError}</p>
                                </div>
                                <div className="form-item">
                                    <label className="form-label">City:</label> <br></br>
                                    <input value={shippingCity} onChange={(event) => setShippingCity(event.target.value)} required></input>
                                </div>
                                <div className="form-item">
                                    <label className="form-label">State:</label> <br></br>
                                    <input value={shippingState} onChange={(event) => setShippingState(event.target.value)} required></input>
                                    <p className='cart-error'>{stateError}</p>
                                </div>
                            </div>
                        </div>

                        <div className="form-item">
                            <label className="form-label">Shipping Method: </label>
                            <div className="shippping-select">
                                <select value={shippingMethod} onChange={(event) => setShippingMethod(event.target.value)} required>
                                    <option value="overnight">Overnight</option>
                                    <option value="express">2-Days Expedited</option>
                                    <option value="standard">6-days Ground</option>
                                </select>
                            </div>
                        </div>
                        <button className="form-button" type="button" onClick={handleSubmit}>Purchase</button>
                        {error && <p className="cart-error">{error}</p>}
            </form>
        </div>
  );
};

export default CartScreen;
