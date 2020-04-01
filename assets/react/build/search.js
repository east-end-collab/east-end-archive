var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ItemsJS = function (_React$Component) {
  _inherits(ItemsJS, _React$Component);

  function ItemsJS(props) {
    _classCallCheck(this, ItemsJS);

    var _this = _possibleConstructorReturn(this, (ItemsJS.__proto__ || Object.getPrototypeOf(ItemsJS)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = {
      configuration: {
        searchableFields: ['Last_Name[505602]', 'First_Name[505603]', 'Birth_Year[505610]', "Middle_Name[505604]", "Cemetery Name[532988]"],
        sortings: {
          name_asc: {
            field: 'Last_Name[505602]',
            order: 'asc'
          }
        },
        aggregations: {
          "Birth_Year[505610]": {
            title: 'Birth Year',
            size: 10
          },
          "Death_Year[505613]": {
            title: 'Death Year',
            size: 10
          },
          "Cemetery Name[532988]": {
            title: 'Cemetary',
            size: 10
          }
        }
      }
    };

    var newFilters = {};
    Object.keys(_this.state.configuration.aggregations).map(function (v) {
      newFilters[v] = [];
    });

    // const data = airtable.records.map(record => {
    //   return record.fields
    // });


    _this.state = Object.assign({}, _this.state, {
      itemsjs: itemsjs(airtable, _this.state.configuration),
      query: '',
      filters: newFilters
    });
    return _this;
  }

  _createClass(ItemsJS, [{
    key: 'changeQuery',
    value: function changeQuery(e) {
      this.setState({
        query: e.target.value
      });
    }
  }, {
    key: 'reset',
    value: function reset() {
      var newFilters = {};
      Object.keys(this.state.configuration.aggregations).map(function (v) {
        newFilters[v] = [];
      });
      this.setState({
        filters: newFilters,
        query: ''
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return React.createElement(
        'div',
        null,
        React.createElement(
          'nav',
          { className: 'navbar navbar-default', style: { marginBottom: 0 } },
          React.createElement(
            'div',
            { className: 'container' },
            React.createElement(
              'div',
              { id: 'navbar' },
              React.createElement(
                'form',
                { className: 'navbar-form navbar-left', style: { paddingLeft: 0 } },
                React.createElement(
                  'div',
                  { className: 'form-group' },
                  React.createElement(
                    'h1',
                    null,
                    'Search'
                  ),
                  React.createElement('input', { type: 'text', value: this.state.query, onChange: this.changeQuery.bind(this), className: 'form-control', placeholder: 'Search' })
                )
              )
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'container', style: { marginTop: 0 } },
          React.createElement(
            'h3',
            null,
            'Results (',
            this.searchResult.pagination.total,
            ')'
          ),
          React.createElement(
            'p',
            { className: 'text-muted' },
            'Search performed in ',
            this.searchResult.timings.search,
            ' ms, facets in ',
            this.searchResult.timings.facets,
            ' ms'
          ),
          React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
              'div',
              { className: 'col-md-2 col-xs-2' },
              Object.entries(this.searchResult.data.aggregations).map(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                    key = _ref2[0],
                    value = _ref2[1];

                return React.createElement(
                  'div',
                  { key: key },
                  React.createElement(
                    'h5',
                    { style: { marginBottom: '5px' } },
                    React.createElement(
                      'strong',
                      { style: { color: '#337ab7' } },
                      value.title
                    )
                  ),
                  React.createElement(
                    'ul',
                    { className: 'browse-list list-unstyled long-list', style: { marginBottom: '0px' } },
                    Object.entries(value.buckets).map(function (_ref3) {
                      var _ref4 = _slicedToArray(_ref3, 2),
                          keyB = _ref4[0],
                          valueB = _ref4[1];

                      return React.createElement(
                        'li',
                        { key: valueB.key },
                        React.createElement(
                          'div',
                          { className: 'checkbox block', style: { marginTop: '0px', marginBottom: '0px' } },
                          React.createElement(
                            'label',
                            null,
                            React.createElement('input', { className: 'checkbox', type: 'checkbox', checked: _this2.state.filters[value.name].indexOf(valueB.key) > -1 || false, onChange: _this2.handleCheckbox(value.name, valueB.key) }),
                            valueB.key,
                            ' (',
                            valueB.doc_count,
                            ')'
                          )
                        )
                      );
                    })
                  )
                );
              })
            ),
            React.createElement(
              'div',
              { className: 'col-md-10 col-xs-10' },
              React.createElement('div', { className: 'breadcrumbs' }),
              React.createElement('div', { className: 'clearfix' }),
              React.createElement(
                'table',
                { className: 'table table-striped' },
                React.createElement(
                  'tbody',
                  null,
                  React.createElement(
                    'tr',
                    null,
                    React.createElement(
                      'th',
                      null,
                      'image'
                    ),
                    React.createElement(
                      'th',
                      null,
                      'Find a Grave Link'
                    ),
                    React.createElement(
                      'th',
                      null,
                      'Name'
                    ),
                    React.createElement(
                      'th',
                      null,
                      'Birth - Death'
                    ),
                    React.createElement(
                      'th',
                      null,
                      'Cemetary Name'
                    )
                  ),
                  Object.entries(this.searchResult.data.items).map(function (_ref5) {
                    var _ref6 = _slicedToArray(_ref5, 2),
                        key = _ref6[0],
                        item = _ref6[1];

                    var birthYear = item["Birth_Year[505610]"] ? item["Birth_Year[505610]"] : "?";
                    var deathYear = item["Death_Year[505613]"] ? item["Death_Year[505613]"] : "?";
                    var findGraveUrl = item["FindGraveURL[505600]"] ? item["FindGraveURL[505600]"] : null;
                    var middleName = item["Middle_Name[505604]"] ? item["Middle_Name[505604]"] : "";
                    return React.createElement(
                      'tr',
                      { key: key },
                      React.createElement(
                        'td',
                        null,
                        React.createElement('img', { style: { width: '100px' }, src: item["Media URL"] })
                      ),
                      React.createElement(
                        'td',
                        null,
                        findGraveUrl ? React.createElement(
                          'a',
                          { target: '_blank', href: findGraveUrl },
                          'Find-A-Grave'
                        ) : ""
                      ),
                      React.createElement(
                        'td',
                        null,
                        React.createElement(
                          'b',
                          null,
                          item["First_Name[505603]"] + ' ' + middleName + ' ' + item["Last_Name[505602]"],
                          ' '
                        ),
                        React.createElement('br', null),
                        item.description
                      ),
                      React.createElement(
                        'td',
                        null,
                        React.createElement(
                          'span',
                          null,
                          birthYear + ' - ' + deathYear
                        )
                      ),
                      React.createElement(
                        'td',
                        null,
                        item["Cemetery Name[532988]"]
                      )
                    );
                  })
                )
              ),
              React.createElement('div', { className: 'clearfix' })
            )
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
        per_page: 50
      });
      // console.log(result);

      return result;
    }
  }]);

  return ItemsJS;
}(React.Component);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.handleCheckbox = function (filterName, filterValue) {
    return function (event) {
      var oldFilters = _this3.state.filters;
      var newFilters = oldFilters;
      var check = event.target.checked;
      if (check) {
        newFilters[filterName].push(filterValue);

        _this3.setState({
          filters: newFilters
        });
      } else {
        var index = newFilters[filterName].indexOf(filterValue);
        if (index > -1) {
          newFilters[filterName].splice(index, 1);
          _this3.setState({
            filters: newFilters
          });
        }
      }
    };
  };
};

ReactDOM.render(React.createElement(ItemsJS, null), document.getElementById('react_search_container'));