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
        searchableFields: ['Last_Name[505602]', 'First_Name[505603]', 'Birth_Year[505610]', 'Middle_Name[505604]', 'Cemetery Name[532988]'],
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
              { className: 'col-md-4 col-xs-4' },
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
              { className: 'col-md-8 col-xs-8' },
              Object.entries(this.searchResult.data.items).map(function (_ref5) {
                var _ref6 = _slicedToArray(_ref5, 2),
                    key = _ref6[0],
                    item = _ref6[1];

                var birthYear = item["Birth_Year[505610]"] ? item["Birth_Year[505610]"] : "?";
                var deathYear = item["Death_Year[505613]"] ? item["Death_Year[505613]"] : "?";
                var findGraveUrl = item["FindGraveURL[505600]"] ? item["FindGraveURL[505600]"] : null;
                var cemetaryName = item["Cemetery Name[532988]"] ? item["Cemetery Name[532988]"] : null;
                var middleName = item["Middle_Name[505604]"] ? item["Middle_Name[505604]"] : "";
                var mediaUrl = "/assets/img/placeholder.jpg";
                return (
                  // <tr key={key}>
                  //   <td><img style={{width: '100px'}} src={item["Media URL"]} /></td>
                  //   <td>{findGraveUrl ? <a target="_blank" href={findGraveUrl}>Find-A-Grave</a> : "" }</td>
                  //   <td>
                  //     <b>{`${item["First_Name[505603]"]} ${middleName} ${item["Last_Name[505602]"]}`} </b>
                  //     <br />
                  //     {item.description}
                  //   </td>
                  //   <td>
                  //     <span >{ `${birthYear} - ${deathYear}` }</span>
                  //   </td>
                  //   <td>
                  //     
                  //   </td>
                  // </tr>
                  React.createElement(
                    'div',
                    { className: 'row rounded-lg mb-3 shadow-sm p-3 result-card', key: key },
                    React.createElement(
                      'div',
                      { className: 'col-sm-4 p-0 portrait-container' },
                      React.createElement('img', { src: mediaUrl })
                    ),
                    React.createElement(
                      'div',
                      { className: 'col-sm-8 info-container' },
                      React.createElement(
                        'h3',
                        null,
                        item["First_Name[505603]"] + ' ' + middleName + ' ' + item["Last_Name[505602]"]
                      ),
                      React.createElement(
                        'p',
                        { className: 'life-span' },
                        birthYear + ' - ' + deathYear
                      ),
                      React.createElement(
                        'p',
                        null,
                        cemetaryName ? React.createElement(
                          'small',
                          { className: 'sub-text' },
                          '(' + cemetaryName + ')'
                        ) : ""
                      ),
                      React.createElement(
                        'div',
                        { className: 'link-container' },
                        React.createElement(
                          'a',
                          { href: '/' },
                          'Find-A-Grave'
                        ),
                        React.createElement(
                          'a',
                          { href: '/' },
                          'See on Cemetary Map'
                        )
                      ),
                      React.createElement(
                        'div',
                        { className: 'row rounded-lg fact-container' },
                        React.createElement(
                          'div',
                          { className: 'col-sm-6' },
                          React.createElement(
                            'table',
                            { className: 'table table-sm table-borderless' },
                            React.createElement(
                              'tbody',
                              null,
                              React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                  'td',
                                  { style: { textAlign: 'right' } },
                                  React.createElement(
                                    'strong',
                                    null,
                                    'Factoid:'
                                  )
                                ),
                                React.createElement(
                                  'td',
                                  null,
                                  'Lorem Ipsum'
                                )
                              ),
                              React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                  'td',
                                  { style: { textAlign: 'right' } },
                                  React.createElement(
                                    'strong',
                                    null,
                                    'Factoid:'
                                  )
                                ),
                                React.createElement(
                                  'td',
                                  null,
                                  'Lorem Ipsum'
                                )
                              ),
                              React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                  'td',
                                  { style: { textAlign: 'right' } },
                                  React.createElement(
                                    'strong',
                                    null,
                                    'Factoid:'
                                  )
                                ),
                                React.createElement(
                                  'td',
                                  null,
                                  'Lorem Ipsum'
                                )
                              ),
                              React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                  'td',
                                  { style: { textAlign: 'right' } },
                                  React.createElement(
                                    'strong',
                                    null,
                                    'Factoid:'
                                  )
                                ),
                                React.createElement(
                                  'td',
                                  null,
                                  'Lorem Ipsum'
                                )
                              )
                            )
                          )
                        ),
                        React.createElement(
                          'div',
                          { className: 'col-sm-6' },
                          React.createElement(
                            'table',
                            { className: 'table table-sm table-borderless' },
                            React.createElement(
                              'tbody',
                              null,
                              React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                  'td',
                                  { style: { textAlign: 'right' } },
                                  React.createElement(
                                    'strong',
                                    null,
                                    'Factoid:'
                                  )
                                ),
                                React.createElement(
                                  'td',
                                  null,
                                  'Lorem Ipsum'
                                )
                              ),
                              React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                  'td',
                                  { style: { textAlign: 'right' } },
                                  React.createElement(
                                    'strong',
                                    null,
                                    'Factoid:'
                                  )
                                ),
                                React.createElement(
                                  'td',
                                  null,
                                  'Lorem Ipsum'
                                )
                              ),
                              React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                  'td',
                                  { style: { textAlign: 'right' } },
                                  React.createElement(
                                    'strong',
                                    null,
                                    'Factoid:'
                                  )
                                ),
                                React.createElement(
                                  'td',
                                  null,
                                  'Lorem Ipsum'
                                )
                              ),
                              React.createElement(
                                'tr',
                                null,
                                React.createElement(
                                  'td',
                                  { style: { textAlign: 'right' } },
                                  React.createElement(
                                    'strong',
                                    null,
                                    'Factoid:'
                                  )
                                ),
                                React.createElement(
                                  'td',
                                  null,
                                  'Lorem Ipsum'
                                )
                              )
                            )
                          )
                        )
                      )
                    )
                  )
                );
              })
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
        per_page: 20
      });
      console.log(result);
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