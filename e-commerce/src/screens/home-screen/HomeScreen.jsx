import { useEffect } from 'react';
import {Link} from 'react-router-dom'
import './HomeScreen.css'
import Header from '../../components/header/Header';
import BioData from "../../data/Bios.json"
import BioSection from '../../components/bio-section/BioSection';


function HomeScreen () {
    useEffect(() => {
        fetch('http://localhost:4000', {
            method: 'get',
            credentials: 'include',
        })
        .then((res) => console.log(res))
        .catch((error) => console.log(error))
    }, [])

    return (
        <div className='home-screen'>
            <Header title="Team 25 Store"/>

            <div className="homeMain">
                <div className="overview-container">
                    <h1>Welcome to Our Store!</h1>
                    <p className="overview-text"> 
                        Here at Team 25, we do monthy staff picks of our favorite fashion pieces. 
                    </p>
                    <p className="overview-text"> 
                        Click below to view and shop our favorites!
                    </p>
                    <Link className='home-screen-button' to="products">Shop</Link>
                </div>
                &nbsp;
                <hr></hr>
                &nbsp;
                <div className="team-container">
                    <h1>Meet the Team!</h1>
                    {BioData.map((bio, index) => (
                        <BioSection key={index} name={bio.name} description={bio.bio} isReversed={index % 2 === 1} image={bio.image}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomeScreen;