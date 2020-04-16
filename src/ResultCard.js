const ResultCard = (props) => {
    const {result} = props
    const {
        Media_URL,
        Prefix, First_Name, Middle_Name, Last_Name, Suffix,
        Birth_Year, Death_Year,
        Birth_Location, Death_Location,
        SSID,
      } = result
    const Unknown = () => <span className="sub-text">[unknown]</span>
    const isUnknown = (field) => (field === '' || field.toLowerCase() === 'unknown')
    const protocol = window.location.protocol;
    const host = window.location.host;
    let firstName = isUnknown(First_Name) ? <Unknown/> : First_Name;
    let lastName = isUnknown(Last_Name) ? <Unknown/> : Last_Name;
    let birthYear = isUnknown(Birth_Year) ? <Unknown/> : Birth_Year;
    let deathYear = isUnknown(Death_Year) ? <Unknown/> : Death_Year;

    return (
        <div className="row rounded-lg mb-4 shadow-lg p-4 result-card">
            <a href={`${protocol}//${host}/people/${SSID}`} className="card-link"></a>
            {Media_URL &&
            <div className='portrait-container'>
                <img src={Media_URL}/>
            </div>
            }
            <div className='info-container'>
                <div>
                    <h4>
                        {Prefix} {firstName} {Middle_Name} {lastName} {Suffix}
                    </h4>
                    <p className="life-span">
                        ca. {birthYear} - {deathYear}
                    </p>
                </div>
                <div>
                    {!isUnknown(Birth_Location) &&
                    <p>
                        Born in {Birth_Location}.
                    </p>
                    }
                    {!isUnknown(Death_Location) &&
                    <p>
                        Died in {Death_Location}.
                    </p>
                    }
                </div>
            </div>
        </div>

    );
}

export default ResultCard;