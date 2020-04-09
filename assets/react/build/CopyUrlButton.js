var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var CopyUrlButton = function CopyUrlButton() {
    var _React$useState = React.useState(false),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        recentlyClicked = _React$useState2[0],
        setRecentlyClicked = _React$useState2[1];

    var handleCopyUrl = function handleCopyUrl() {
        setRecentlyClicked(true);
        var dummy = document.createElement('input'),
            text = window.location.href;
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        setTimeout(function () {
            return setRecentlyClicked(false);
        }, 5000);
    };

    return React.createElement(
        'button',
        {
            type: 'button',
            className: 'btn btn-light copy-url-button',
            onClick: handleCopyUrl,
            disabled: recentlyClicked
        },
        recentlyClicked ? React.createElement(
            'div',
            null,
            React.createElement('i', { className: 'fas fa-check mr-1' }),
            React.createElement(
                'span',
                null,
                'Copied URL to Clipboard!'
            )
        ) : React.createElement(
            'div',
            null,
            React.createElement('i', { className: 'fas fa-copy mr-1' }),
            React.createElement(
                'span',
                null,
                'Share Your Search'
            )
        )
    );
};

export default CopyUrlButton;