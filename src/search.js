class ItemsJS extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      configuration: {
        searchableFields: [
          'Last_Name[505602]', 
          'First_Name[505603]', 
          'Birth_Year[505610]', 
          'Middle_Name[505604]', 
          'Cemetery Name[532988]',
        ],
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
          },
        }
      }
    }
    
    var newFilters = {};
    Object.keys(this.state.configuration.aggregations).map(function (v) {
      newFilters[v] = [];
    })
    
    this.state = {
      ...this.state,
      itemsjs: itemsjs(airtable, this.state.configuration),
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
    let newFilters = oldFilters;
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
      filters: this.state.filters,
      per_page: 20
    })
    console.log(result);
    return result
  }
;
  
  render() {
    return (
      <div>
        <nav className="navbar navbar-default" style={{marginBottom: 0}}>
            <div id="navbar">
              <form className="navbar-form navbar-left" style={{paddingLeft: 0}}>
                <div className="form-group">
                  <h1>Search</h1>
                  <input type="text" value={this.state.query} onChange={this.changeQuery.bind(this)} className="form-control" placeholder="Search" />
                </div>
              </form>
            </div>
        </nav>

        <div className="container" style={{ marginTop: 0 }}>

          <h3>Results ({this.searchResult.pagination.total})</h3>

          <p className="text-muted">Search performed in {this.searchResult.timings.search} ms, facets in {this.searchResult.timings.facets} ms</p>

          <div className="row">
            <div className="col-md-4 col-xs-4">
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
            <div className="col-md-8 col-xs-8">
              {
              Object.entries(this.searchResult.data.items).map(([key, item]) => {
                let birthYear = item["Birth_Year[505610]"] ? item["Birth_Year[505610]"] : "?";
                let deathYear = item["Death_Year[505613]"] ? item["Death_Year[505613]"] : "?";
                let findGraveUrl = item["FindGraveURL[505600]"] ? item["FindGraveURL[505600]"] : null;
                let cemetaryName = item["Cemetery Name[532988]"] ? item["Cemetery Name[532988]"] : null;
                let middleName = item["Middle_Name[505604]"] ? item["Middle_Name[505604]"] : "";
                let mediaUrl = "/assets/img/placeholder.jpg";
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
                  <div className="row rounded-lg mb-3 shadow-sm p-3 result-card" key={key}>
                    <div className="col-sm-4 p-0 portrait-container">
                        <img src={mediaUrl} />
                    </div>
                    <div className="col-sm-8 info-container">
                      <h3>{`${item["First_Name[505603]"]} ${middleName} ${item["Last_Name[505602]"]}`}</h3>
                      <p className="life-span">
                        {`${birthYear} - ${deathYear}`}
                      </p>
                      <p>
                      {cemetaryName ? <small className="sub-text">{`(${cemetaryName})`}</small> : ""}
                      </p>
                      <div className="link-container">
                        <a href="/">Find-A-Grave</a>
                        <a href="/">See on Cemetary Map</a>
                      </div>
                      <div className="row rounded-lg fact-container">
                        <div className="col-sm-6">
                          <table className="table table-sm table-borderless">
                            <tbody>
                              <tr>
                                <td style={{textAlign: 'right'}}>
                                  <strong>Factoid:</strong>
                                </td>
                                <td>
                                  Lorem Ipsum
                                </td>
                              </tr>
                              <tr>
                                <td style={{textAlign: 'right'}}>
                                  <strong>Factoid:</strong>
                                </td>
                                <td>
                                  Lorem Ipsum
                                </td>
                              </tr>
                              <tr>
                                <td style={{textAlign: 'right'}}>
                                  <strong>Factoid:</strong>
                                </td>
                                <td>
                                  Lorem Ipsum
                                </td>
                              </tr>
                              <tr>
                                <td style={{textAlign: 'right'}}>
                                  <strong>Factoid:</strong>
                                </td>
                                <td>
                                  Lorem Ipsum
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="col-sm-6" >
                          <table className="table table-sm table-borderless">
                            <tbody>
                              <tr>
                                <td style={{textAlign: 'right'}}>
                                  <strong>Factoid:</strong>
                                </td>
                                <td>
                                  Lorem Ipsum
                                </td>
                              </tr>
                              <tr>
                                <td style={{textAlign: 'right'}}>
                                  <strong>Factoid:</strong>
                                </td>
                                <td>
                                  Lorem Ipsum
                                </td>
                              </tr>
                              <tr>
                                <td style={{textAlign: 'right'}}>
                                  <strong>Factoid:</strong>
                                </td>
                                <td>
                                  Lorem Ipsum
                                </td>
                              </tr>
                              <tr>
                                <td style={{textAlign: 'right'}}>
                                  <strong>Factoid:</strong>
                                </td>
                                <td>
                                  Lorem Ipsum
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                    </div>
                  </div>
                )
              })
              }
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