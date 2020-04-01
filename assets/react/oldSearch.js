class ItemsJS extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        configuration: {
          searchableFields: ['title', 'tags', 'actors'],
          sortings: {
            name_asc: {
              field: 'name',
              order: 'asc'
            }
          },
          aggregations: {
            tags: {
              title: 'Tags',
              size: 10
            },
            actors: {
              title: 'Actors',
              size: 10
            },
            genres: {
              title: 'Genres',
              size: 10
            }
          }
        }
      }
      const data = airtable.records.map(record => {
        return record.fields
      })
      
      
      var newFilters = {};
      Object.keys(this.state.configuration.aggregations).map(function (v) {
        newFilters[v] = [];
      })
  
      // Copying this.state using the spread op (...this.state)
      this.state = {
        ...this.state,
        // the rows comes from external resources
        // https://github.com/itemsapi/itemsapi-example-data/blob/master/jsfiddle/imdb.js
        
        // In React line below is:
        //itemsjs: require('itemsjs')(rows, this.state.configuration),
        itemsjs: itemsjs(rows, this.state.configuration),
  
        query: '',
        filters: newFilters,
      }
    }
  
    changeQuery(e) {
      this.setState({
        query: e.target.value
      });
    }
  
    reset() {
      var newFilters = {};
      Object.keys(this.state.configuration.aggregations).map(function (v) {
        newFilters[v] = [];
      })
      this.setState({
        filters: newFilters,
        query: '',
      })
    }
  
    handleCheckbox = (filterName, filterValue) => event => {
      const oldFilters = this.state.filters;
      let newFilters = oldFilters
      let check = event.target.checked;
  
      if (check) {
        newFilters[filterName].push(filterValue)
  
        this.setState({
          filters: newFilters
        })
      } else {
        var index = newFilters[filterName].indexOf(filterValue);
        if (index > -1) {
          newFilters[filterName].splice(index, 1);
          this.setState({
            filters: newFilters
          })
        }
      }
    }
  
    get searchResult() {
  
      var result = this.state.itemsjs.search({
        query: this.state.query,
        filters: this.state.filters
      })
      return result
    }
  
  
    render() {
      return (
        <div>
          <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container">
              <div className="navbar-header">
                <a className="navbar-brand" href="#" onClick={this.reset.bind(this)}>ItemsJS movies</a>
              </div>
              <div id="navbar">
                <form className="navbar-form navbar-left">
                  <div className="form-group">
                    <input type="text" value={this.state.query} onChange={this.changeQuery.bind(this)} className="form-control" placeholder="Search" />
  
                  </div>
                </form>
              </div>
            </div>
          </nav>
  
          <div className="container" style={{ marginTop: '50px' }}>
  
            <h1>List of items ({this.searchResult.pagination.total})</h1>
  
            <p className="text-muted">Search performed in {this.searchResult.timings.search} ms, facets in {this.searchResult.timings.facets} ms</p>
  
            <div className="row">
              <div className="col-md-2 col-xs-2">
                {
                  Object.entries(this.searchResult.data.aggregations).map(([key, value]) => {
                    return (
                      <div key={key}>
                        <h5 style={{ marginBottom: '5px' }}><strong style={{ color: '#337ab7' }}>{value.title}</strong></h5>
  
                        <ul className="browse-list list-unstyled long-list" style={{ marginBottom: '0px' }}>
                          {
                            Object.entries(value.buckets).map(([keyB, valueB]) => {
                              return (
                                <li key={valueB.key}>
                                  <div className="checkbox block" style={{ marginTop: '0px', marginBottom: '0px' }}>
                                    <label>
                                      <input className="checkbox" type="checkbox" checked={this.state.filters[value.name].indexOf(valueB.key)>-1 || false} onChange={this.handleCheckbox(value.name, valueB.key)} />
                                      {valueB.key} ({valueB.doc_count})
                                    </label>
                                  </div>
                                </li>
                              )
                            })
                          }
                        </ul>
                      </div>
                    )
                  })
                }
              </div>
              <div className="col-md-10 col-xs-10">
              <div className="breadcrumbs"></div>
              <div className="clearfix"></div>
              <table className="table table-striped">
                <tbody>
                {
                Object.entries(this.searchResult.data.items).map(([key, item]) => {
                  return (
                  <tr key={key}>
                    <td><img style={{width: '100px'}} src={item.image} /></td>
                    <td></td>
                    <td>
                      <b>{item.name}</b>
                      <br />
                      {item.description}
                    </td>
                    <td></td>
                    <td>
                    {
                      item.tags.map((tag, index) => {
                        return (
                          <span key={index}>{ tag }</span>
                        )})
                        }
                    </td>
                  </tr>)})
                }
                </tbody>
              </table>
              <div className="clearfix"></div>
            </div>
            </div>
          </div>
        </div>
      )
    }
  }
  
  ReactDOM.render(
    <ItemsJS />,
    document.getElementById('react_search_container')
  );