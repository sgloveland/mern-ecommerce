import "./BioSection.css"

function BioSection(props) {
    const {name, description, image, isReversed} = props
    return (
        <>
        {isReversed ? (
            <div className="bio-container">
                <div className="bio-content-container">
                    <h3>{name}</h3>
                    <p>{description}</p>
                </div>

                <div className="bio-image-container">
                    <img src={image}/>
                </div>
            </div>
            ) : (
            <div className="bio-container">
                <div className="bio-image-container">
                    <img src={image}/>
                </div>

                <div className="bio-content-container">
                    <h3>{name}</h3>
                    <p>{description}</p>
                </div>

            </div>
            )}
        </>
    )
}

export default BioSection;