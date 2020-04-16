const SearchInfo = () => {
    const [isCollapsed, setIsCollapsed] = React.useState(true)
    const handleClick = () => {
        setIsCollapsed(!isCollapsed)
    }
    return (
        <div id="search-info-container">
            <a data-toggle="collapse" href="#collapseInfo" role="button" onClick={handleClick}>
                <span className="search-info-link">What can you search by? </span>
                {isCollapsed ? <i className="fas fa-chevron-left"></i> : <i className="fas fa-chevron-down"></i>}
            </a>
            <div className="collapse" id="collapseInfo">
                <div className="card card-body text-white bg-dark">
                    You can search by  first name, middle name, last name,
                    birth year, death year, birth location, death location,
                    address, cemetery name, church affiliation, funeral home, 
                    occupation, employer, fraternal &amp; beneficial organizations,
                    findagrave.com id#, notes &amp; clarifications, military service, 
                    and gravemarker type.
                </div>
            </div>
        </div>

    );
}

export default SearchInfo;