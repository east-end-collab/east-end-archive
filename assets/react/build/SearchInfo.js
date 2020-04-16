var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var SearchInfo = function SearchInfo() {
    var _React$useState = React.useState(true),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        isCollapsed = _React$useState2[0],
        setIsCollapsed = _React$useState2[1];

    var handleClick = function handleClick() {
        setIsCollapsed(!isCollapsed);
    };
    return React.createElement(
        "div",
        { id: "search-info-container" },
        React.createElement(
            "a",
            { "data-toggle": "collapse", href: "#collapseInfo", role: "button", onClick: handleClick },
            React.createElement(
                "span",
                { className: "search-info-link" },
                "What can you search by? "
            ),
            isCollapsed ? React.createElement("i", { className: "fas fa-chevron-left" }) : React.createElement("i", { className: "fas fa-chevron-down" })
        ),
        React.createElement(
            "div",
            { className: "collapse", id: "collapseInfo" },
            React.createElement(
                "div",
                { className: "card card-body text-white bg-dark" },
                "You can search by  first name, middle name, last name, birth year, death year, birth location, death location, address, cemetery name, church affiliation, funeral home, occupation, employer, fraternal & beneficial organizations, findagrave.com id#, notes & clarifications, military service, and gravemarker type."
            )
        )
    );
};

export default SearchInfo;