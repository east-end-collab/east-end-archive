var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var Pagination = function Pagination(props) {
    var paginationData = props.paginationData,
        onSetPage = props.onSetPage;

    var itemsPerPage = paginationData.per_page;
    var totalItems = paginationData.total;
    var currentPage = paginationData.page;
    var pageNumbers = [];
    for (var i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    var totalPageNumber = pageNumbers.length;

    var _React$useState = React.useState({
        error: false,
        isBlank: false
    }),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        state = _React$useState2[0],
        setState = _React$useState2[1];

    var handleSetPageInput = function handleSetPageInput(e) {
        var value = e.target.value;

        if (value <= 0 || value > totalPageNumber) {
            if (value === '') {
                setState({ isBlank: true });
            } else {
                setState({ error: true, isBlank: false });
            }
        } else {
            setState({ error: false, isBlank: false });
            onSetPage(parseInt(value));
        }
    };

    var isFirstPage = currentPage === 1 ? true : false;
    var isLastPage = currentPage === totalPageNumber ? true : false;

    var handleSetPageButton = function handleSetPageButton(value) {
        setState({ error: false });
        onSetPage(value);
    };

    return React.createElement(
        'div',
        { id: 'pagination_container', className: 'input-group mb-3' },
        React.createElement(
            'div',
            { className: 'button-group' },
            React.createElement(
                'button',
                {
                    className: 'btn btn-light border-dark',
                    disabled: isFirstPage,
                    style: isFirstPage ? { color: 'lightgray' } : { color: 'black' },
                    onClick: function onClick() {
                        return handleSetPageButton(1);
                    }
                },
                React.createElement('i', { className: 'fas fa-fast-backward' })
            ),
            React.createElement(
                'button',
                {
                    className: 'btn btn-light border-dark',
                    disabled: isFirstPage,
                    style: isFirstPage ? { color: 'lightgray' } : { color: 'black' },
                    onClick: function onClick() {
                        return handleSetPageButton(currentPage - 1);
                    }
                },
                React.createElement('i', { className: 'fas fa-step-backward' })
            )
        ),
        React.createElement(
            'div',
            { className: 'input-page-container mx-1' },
            React.createElement(
                'span',
                null,
                'Page'
            ),
            React.createElement('input', {
                style: state.error ? { color: 'red' } : { color: 'inherit' },
                type: 'number',
                value: state.isBlank ? '' : currentPage,
                onChange: handleSetPageInput
            }),
            React.createElement(
                'span',
                null,
                'of ',
                totalPageNumber
            )
        ),
        React.createElement(
            'div',
            { className: 'button-group' },
            React.createElement(
                'button',
                {
                    className: 'btn btn-light border-dark',
                    disabled: isLastPage,
                    style: isLastPage ? { color: 'lightgray' } : { color: 'black' },
                    onClick: function onClick() {
                        return handleSetPageButton(currentPage + 1);
                    }
                },
                React.createElement('i', { className: 'fas fa-step-forward' })
            ),
            React.createElement(
                'button',
                {
                    className: 'btn btn-light border-dark',
                    disabled: isLastPage,
                    style: isLastPage ? { color: 'lightgray' } : { color: 'black' },
                    onClick: function onClick() {
                        return handleSetPageButton(totalPageNumber);
                    }
                },
                React.createElement('i', { className: 'fas fa-fast-forward' })
            )
        )
    );
};

export default Pagination;