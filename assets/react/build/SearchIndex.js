var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Pagination from './Pagination.js';
import ResultCard from './ResultCard.js';
import CopyUrlButton from './CopyUrlButton.js';
import SearchInfo from './SearchInfo.js';

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = decodeURI(value).split(',');
  });
  return vars;
}
var encodeUrlVars = function encodeUrlVars(vars) {
  var varStr = Object.keys(vars).map(function (key) {
    return key + '=' + vars[key];
  }).join('&');
  return varStr;
};
function getUrlParam(parameter, defaultvalue) {
  var urlparameter = defaultvalue;
  if (window.location.href.indexOf(parameter) > -1) {
    urlparameter = getUrlVars()[parameter];
  }
  return urlparameter;
}

var Search = function (_React$Component) {
  _inherits(Search, _React$Component);

  function Search(props) {
    _classCallCheck(this, Search);

    var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = {
      sort: 'Last_Name',
      page: 1,
      configuration: {
        searchableFields: ['First_Name', 'Middle_Name', 'Last_Name', 'Birth_Year', 'Death_Year', 'Birth_Location', 'Death_Location', 'Address', 'Cemetery Name', 'Church_affiliation', 'Funeral_Home', 'Occupation', 'Employer', 'Fraternal_and_Beneficial_Organizations', 'FindGrave_ID', 'Notes_and_Clarifications', 'Military_Service', 'Type'],
        sortings: {
          Last_Name: {
            field: 'Last_Name',
            order: 'asc',
            title: 'Last Name'
          },
          Birth_Year: {
            field: 'Birth_Year',
            order: 'asc',
            title: 'Year of Birth'
          },
          Death_Year: {
            field: 'Death_Year',
            order: 'asc',
            title: 'Year of Death'
          }
        },
        aggregations: {
          Birth_Decade: {
            title: 'Decade of Birth',
            conjunction: false,
            size: 50,
            sort: 'term',
            order: 'asc'
          },
          Death_Decade: {
            title: 'Decade of Death',
            conjunction: false,
            size: 50,
            sort: 'term',
            order: 'asc'
          },
          Birth_Location: {
            title: 'Birth Location',
            conjunction: false,
            size: 10
          },
          Death_Location: {
            title: 'Death Location',
            conjunction: false,
            size: 10
          },
          Employer: {
            title: 'Employer',
            conjunction: false,
            size: 10
          },
          Fraternal_and_Beneficial_Organizations: {
            title: 'Fraternal & Beneficial Orgs.',
            conjunction: false,
            size: 10
          },
          Church_affiliation: {
            title: 'Church Affiliation',
            conjunction: false,
            size: 10
          },
          Military_Service: {
            title: 'Military Service',
            conjunction: false,
            size: 10
          },
          Funeral_Home: {
            title: 'Funeral Home',
            conjunction: false,
            size: 10
          },
          Cemetery_Name: {
            title: 'Cemetery',
            conjunction: false,
            size: 10
          }
        }
      }
    };

    var newFilters = {};
    Object.keys(_this.state.configuration.aggregations).map(function (v) {
      var urlVars = getUrlVars();
      newFilters[v] = [];
      if (urlVars.hasOwnProperty(v)) {
        newFilters[v] = urlVars[v];
      };
    });

    _this.state = Object.assign({}, _this.state, {
      itemsjs: itemsjs(fullBioRecords, _this.state.configuration),
      query: decodeURI(getUrlParam('query', '')),
      filters: newFilters
    });
    return _this;
  }

  _createClass(Search, [{
    key: 'changeQuery',
    value: function changeQuery(e) {
      this.resetPageNumber();
      var query = e.target.value;
      var urlVars = getUrlVars();
      if (query.match(/(\?|\=|\&|\/|\_|\:)/g)) {
        return;
      }
      if (query !== '') {
        var newUrlVars = Object.assign({}, urlVars, { query: query });
        var urlVarStr = encodeUrlVars(newUrlVars);
        window.history.pushState('', '', '?' + urlVarStr);
      } else {
        delete urlVars['query'];
        var _urlVarStr = encodeUrlVars(urlVars);
        window.history.pushState('', '', '?' + _urlVarStr);
      }
      this.setState({
        query: query
      });
    }
  }, {
    key: 'submitHandler',
    value: function submitHandler(e) {
      e.preventDefault();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      console.log('Search performed in ' + this.searchResult.timings.search + ' ms, facets in ' + this.searchResult.timings.facets + ' ms');
      var isFiltered = Object.values(this.state.filters).map(function (filter) {
        return filter.length;
      }).reduce(function (a, b) {
        return a + b;
      }, 0) ? true : false;
      return React.createElement(
        'div',
        { className: 'container', style: { marginTop: 0 } },
        React.createElement(
          'div',
          { className: 'row mt-5 main-content' },
          React.createElement(
            'div',
            { className: 'col-md-4', id: 'sidebar' },
            React.createElement(
              'h1',
              { className: 'page-title' },
              'SEARCH'
            ),
            React.createElement(
              'div',
              { className: 'search-field-section' },
              React.createElement(
                'form',
                { onSubmit: this.submitHandler, className: 'navbar-form navbar-left' },
                React.createElement('input', { type: 'text', value: this.state.query, onChange: this.changeQuery.bind(this), className: 'form-control', placeholder: 'Search' })
              ),
              React.createElement(CopyUrlButton, null)
            ),
            React.createElement(SearchInfo, null),
            React.createElement(
              'h3',
              null,
              'Results',
              React.createElement(
                'span',
                { className: 'badge badge-secondary ml-2' },
                this.searchResult.pagination.total
              )
            ),
            React.createElement(
              'div',
              { className: 'sort-section' },
              React.createElement(
                'h4',
                null,
                React.createElement(
                  'strong',
                  null,
                  'Sort'
                )
              ),
              Object.entries(this.state.configuration.sortings).map(function (sorting, i) {
                var currentSort = _this2.state.sort;
                var field_name = sorting[0];
                var options = sorting[1];
                var isActive = _this2.state.sort === field_name;
                var isChecked = isActive && options.order === 'asc';

                return React.createElement(
                  'label',
                  { key: i, className: (isActive ? 'selected' : 'btn-light') + ' btn m-1 facet' },
                  React.createElement('input', {
                    type: 'checkbox',
                    checked: isChecked,
                    onChange: function onChange() {
                      return _this2.handleSortToggle(field_name);
                    }
                  }),
                  React.createElement(
                    'span',
                    { className: 'pr-2' },
                    options.title
                  ),
                  isActive && React.createElement(
                    'span',
                    { className: 'badge badge-secondary' },
                    isChecked ? '↑' : '↓'
                  )
                );
              })
            ),
            React.createElement(
              'div',
              { className: 'filter-header' },
              React.createElement(
                'h4',
                null,
                React.createElement(
                  'strong',
                  null,
                  'Filter'
                )
              ),
              isFiltered && React.createElement(
                'button',
                { type: 'button', className: 'btn btn-light clear-filters-btn', onClick: this.resetFilters },
                'Clear Filters'
              )
            ),
            Object.entries(this.searchResult.data.aggregations).map(function (_ref) {
              var _ref2 = _slicedToArray(_ref, 2),
                  key = _ref2[0],
                  value = _ref2[1];

              return React.createElement(
                'div',
                { key: key, className: 'facet-section' },
                React.createElement(
                  'h5',
                  null,
                  React.createElement(
                    'strong',
                    null,
                    value.title
                  )
                ),
                React.createElement(
                  'div',
                  { className: 'facet-grouping' },
                  Object.entries(value.buckets).map(function (_ref3) {
                    var _ref4 = _slicedToArray(_ref3, 2),
                        keyB = _ref4[0],
                        valueB = _ref4[1];

                    var isChecked = _this2.state.filters[value.name].indexOf(valueB.key) > -1 || false;

                    return React.createElement(
                      'label',
                      { key: valueB.key, className: (isChecked ? 'selected' : 'btn-light') + ' btn m-1 facet' },
                      React.createElement('input', {
                        type: 'checkbox',
                        checked: isChecked,
                        onChange: _this2.handleCheckbox(value.name, valueB.key) }),
                      React.createElement(
                        'span',
                        { className: 'pr-2' },
                        valueB.key
                      ),
                      React.createElement(
                        'span',
                        { className: 'badge badge-secondary' },
                        valueB.doc_count
                      )
                    );
                  })
                )
              );
            })
          ),
          React.createElement(
            'div',
            { className: 'col-md-6', id: 'result-card-container' },
            React.createElement(Pagination, { paginationData: this.searchResult.pagination, onSetPage: this.handleSetPage }),
            React.createElement(
              'div',
              null,
              Object.entries(this.searchResult.data.items).map(function (_ref5) {
                var _ref6 = _slicedToArray(_ref5, 2),
                    key = _ref6[0],
                    item = _ref6[1];

                return React.createElement(ResultCard, { result: item, key: key });
              })
            ),
            React.createElement(Pagination, { paginationData: this.searchResult.pagination, onSetPage: this.handleSetPage })
          )
        )
      );
    }
  }, {
    key: 'searchResult',
    get: function get() {

      var result = this.state.itemsjs.search({
        query: this.state.query,
        filters: this.state.filters,
        sort: this.state.sort,
        per_page: 20,
        page: this.state.page
        // filter: (item) => item.Last_Name !== ''
      });
      return result;
    }
  }]);

  return Search;
}(React.Component);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.resetPageNumber = function () {
    return _this3.setState({ page: 1 });
  };

  this.resetFilters = function () {
    var urlVars = getUrlVars();
    // update url params
    Object.keys(urlVars).forEach(function (key) {
      if (_this3.state.filters.hasOwnProperty(key)) {
        delete urlVars[key];
      }
    });
    var urlVarStr = encodeUrlVars(urlVars);
    window.history.pushState('', '', '?' + urlVarStr);
    // update state
    var newFilters = {};
    Object.keys(_this3.state.configuration.aggregations).map(function (v) {
      newFilters[v] = [];
    });
    _this3.setState({
      filters: newFilters
    });
  };

  this.handleCheckbox = function (filterName, filterValue) {
    return function (event) {
      _this3.resetPageNumber();
      var oldFilters = _this3.state.filters;
      var newFilters = oldFilters;
      var check = event.target.checked;
      var urlVars = getUrlVars();
      if (check) {
        // update url params
        if (urlVars[filterName]) {
          urlVars[filterName] = [].concat(_toConsumableArray(urlVars[filterName]), [filterValue]);
        } else {
          urlVars[filterName] = [filterValue];
        }
        var urlVarStr = encodeUrlVars(urlVars);
        window.history.pushState('', '', '?' + urlVarStr);
        // update state
        newFilters[filterName].push(filterValue);
        _this3.setState({
          filters: newFilters
        });
      } else {
        var index = newFilters[filterName].indexOf(filterValue);
        if (index > -1) {
          // update url params
          if (urlVars[filterName].length <= 1) {
            delete urlVars[filterName];
          } else {
            urlVars[filterName].splice(index, 1);
          }
          var _urlVarStr2 = encodeUrlVars(urlVars);
          window.history.pushState('', '', '?' + _urlVarStr2);
          // update state
          newFilters[filterName].splice(index, 1);
          _this3.setState({
            filters: newFilters
          });
        }
      }
    };
  };

  this.handleSortToggle = function (fieldName) {
    var isCurrentSort = _this3.state.sort === fieldName;
    if (!isCurrentSort) {
      _this3.setState({ sort: fieldName });
    }
    var currentOrder = _this3.state.configuration.sortings[fieldName].order;
    var oppositeOrder = currentOrder === 'asc' ? 'desc' : 'asc';
    _this3.setState(function (prevState) {
      prevState.configuration.sortings[fieldName].order = oppositeOrder;
      return prevState;
    });
  };

  this.handleSetPage = function (pageNumber) {
    _this3.setState({ page: pageNumber });
  };
};

ReactDOM.render(React.createElement(Search, null), document.getElementById('react_search_container'));