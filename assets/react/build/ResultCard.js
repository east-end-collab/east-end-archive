var ResultCard = function ResultCard(props) {
    var result = props.result;
    var Media_URL = result.Media_URL,
        Prefix = result.Prefix,
        First_Name = result.First_Name,
        Middle_Name = result.Middle_Name,
        Last_Name = result.Last_Name,
        Suffix = result.Suffix,
        Birth_Year = result.Birth_Year,
        Death_Year = result.Death_Year,
        Birth_Location = result.Birth_Location,
        Death_Location = result.Death_Location,
        SSID = result.SSID;

    var Unknown = function Unknown() {
        return React.createElement(
            'span',
            { className: 'sub-text' },
            '[unknown]'
        );
    };
    var isUnknown = function isUnknown(field) {
        return field === '' || field.toLowerCase() === 'unknown';
    };
    var protocol = window.location.protocol;
    var host = window.location.host;
    var firstName = isUnknown(First_Name) ? React.createElement(Unknown, null) : First_Name;
    var lastName = isUnknown(Last_Name) ? React.createElement(Unknown, null) : Last_Name;
    var birthYear = isUnknown(Birth_Year) ? React.createElement(Unknown, null) : Birth_Year;
    var deathYear = isUnknown(Death_Year) ? React.createElement(Unknown, null) : Death_Year;
    // TODO: Change placeholder image (JK to provide)
    var placeholderImg = "/assets/img/placeholder.jpg";
    var mediaUrl = Media_URL ? Media_URL : placeholderImg;
    var addDefaultSrc = function addDefaultSrc(e) {
        e.target.src = placeholderImg;
    };
    return React.createElement(
        'div',
        { href: '', className: 'row rounded-lg mb-4 shadow-lg p-4 result-card' },
        React.createElement('a', { href: protocol + '//' + host + '/people/' + SSID, className: 'card-link' }),
        React.createElement(
            'div',
            { className: 'col-sm-3 p-0 portrait-container' },
            React.createElement('img', { src: mediaUrl, onError: addDefaultSrc })
        ),
        React.createElement(
            'div',
            { className: 'col-sm-9 pl-4 pr-0 info-container' },
            React.createElement(
                'div',
                null,
                React.createElement(
                    'h4',
                    null,
                    Prefix,
                    ' ',
                    firstName,
                    ' ',
                    Middle_Name,
                    ' ',
                    lastName,
                    ' ',
                    Suffix
                ),
                React.createElement(
                    'p',
                    { className: 'life-span' },
                    'ca. ',
                    birthYear,
                    ' - ',
                    deathYear
                )
            ),
            React.createElement(
                'div',
                null,
                !isUnknown(Birth_Location) && React.createElement(
                    'p',
                    null,
                    'Born in ',
                    Birth_Location,
                    '.'
                ),
                !isUnknown(Death_Location) && React.createElement(
                    'p',
                    null,
                    'Died in ',
                    Death_Location,
                    '.'
                )
            )
        )
    );
};

export default ResultCard;