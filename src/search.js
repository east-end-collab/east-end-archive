
class Search extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      configuration: {
        searchableFields: [
          'Last_Name', 
          'First_Name', 
          'Birth_Year', 
          'Middle_Name', 
          'Cemetery Name',
        ],
        sortings: {
          name_asc: {
            field: 'Last_Name',
            order: 'asc'
          }
        },
        aggregations: {
          "Birth_Year": {
            title: 'Birth Year',
            size: 10
          },
          "Death_Year": {
            title: 'Death Year',
            size: 10
          },
          "Cemetery_Name": {
            title: 'Cemetary',
            size: 10
          },
          "Fraternal_Organization": {
            title: 'Fraternal Organization',
            size: 10
          },
          "Church_Affiliation": {
            title: 'Fraternal Organization',
            size: 10
          },
        },
      }
    }
    
    var newFilters = {};
    Object.keys(this.state.configuration.aggregations).map(function (v) {
      newFilters[v] = [];
    })
    
    this.state = {
      ...this.state,
      itemsjs: itemsjs(allRecords, this.state.configuration),
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
      sort: 'name_asc',
      per_page: 10,
      filter: (item) => item.Last_Name !== ""
    })
    // console.log(result);
    return result
  }
;
  
  render() {

    console.log(`Search performed in ${this.searchResult.timings.search} ms, facets in ${this.searchResult.timings.facets} ms`);
    
    return (


        <div className="container" style={{ marginTop: 0 }}>


          <div className="row mt-5">
            <div className="col-md-4 col-xs-4" id="facet-sidebar">
              <nav className="navbar navbar-default pl-0" style={{marginBottom: 0}}>
                <div id="navbar">
                  <form className="navbar-form navbar-left" style={{paddingLeft: 0}}>
                    <div className="form-group">
                      <h1>Search</h1>
                      <input type="text" value={this.state.query} onChange={this.changeQuery.bind(this)} className="form-control" placeholder="Search" />
                    </div>
                  </form>
                </div>
            </nav>
            <h3>
              Results
              <span className="badge badge-secondary ml-2">{this.searchResult.pagination.total}</span>
            </h3>
              {
                Object.entries(this.searchResult.data.aggregations).map(([key, value]) => {
                  return (
                    <div key={key} className="facet-section">
                      <h5><strong>{value.title}</strong></h5>

                      <div className="facet-grouping">
                        {
                          Object.entries(value.buckets).map(([keyB, valueB]) => {
                            let isChecked = this.state.filters[value.name].indexOf(valueB.key)>-1 || false
                            
                            return (
                              <label key={valueB.key} className={`${isChecked ? "selected" : "btn-light"} btn m-1 facet`}>
                                <input 
                                  type="checkbox" 
                                  checked={isChecked}
                                  onChange={this.handleCheckbox(value.name, valueB.key)} />
                                <span className="pr-2" >{valueB.key}</span>
                                <span className="badge badge-secondary">{valueB.doc_count}</span>
                              </label>
                            )
                          })
                        }
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className="col-md-8 col-xs-8" id="result-card-container">
              {
              Object.entries(this.searchResult.data.items).map(([key, item]) => {
                
                const {
                  Birth_Year, Death_Year,
                  Prefix, First_Name, Middle_Name, Last_Name, Suffix,
                  Media_URL,
                  Cemetery_Name,
                  FindGraveURL, Find_A_Grave,
                } = item
                let birthYear = Birth_Year ? Birth_Year : "?";
                let deathYear = Death_Year ? Death_Year : "?";
                let findGraveUrl = FindGraveURL ? 
                  FindGraveURL : 
                  (Find_A_Grave ? `https://www.findagrave.com/memorial/${Find_A_Grave.trim()}` : null);
                let cemetaryName = Cemetery_Name ? Cemetery_Name : null;
                // TODO: Change placeholder image
                const placeholderImg = "/assets/img/placeholder.jpg"
                let mediaUrl = Media_URL ? Media_URL : placeholderImg;
                const addDefaultSrc = e => {
                  e.target.src = placeholderImg
                }
                return (
                  <div className="row rounded-lg mb-4 shadow-lg p-4 result-card" key={key}>
                    <div className="col-sm-4 p-0 portrait-container">
                        <img src={mediaUrl} onError={addDefaultSrc}/>
                    </div>
                    <div className="col-sm-8 pl-4 pr-0 info-container">
                      <h4>{`${Prefix} ${First_Name} ${Middle_Name} ${Last_Name} ${Suffix}`}</h4>
                      <p className="life-span">
                        {`${birthYear} - ${deathYear}`}
                      </p>
                      <p>
                      {cemetaryName ? <small className="sub-text">{`(${cemetaryName})`}</small> : ""}
                      </p>
                      <div className="rounded-lg p-2 shadow fact-container">
                        <div className="col-sm-6 p-0">
                          <table className="table table-sm table-borderless">
                            <tbody>
                              <tr>
                                <td style={{textAlign: 'right'}}>
                                  <strong>Marital Status</strong>
                                </td>
                                <td>
                                  Married
                                </td>
                              </tr>
                              <tr>
                                <td style={{textAlign: 'right'}}>
                                  <strong>Occupation</strong>
                                </td>
                                <td>
                                  Physician
                                </td>
                              </tr>
                              <tr>
                                <td style={{textAlign: 'right'}}>
                                  <strong>Birth Place</strong>
                                </td>
                                <td>
                                  Richmond, Virginia
                                </td>
                              </tr>
                              <tr>
                                <td style={{textAlign: 'right'}}>
                                  <strong>Spouce Name</strong>
                                </td>
                                <td>
                                  Alex Ipsum
                                </td>
                              </tr>
                              <tr>
                                <td style={{textAlign: 'right'}}>
                                  <strong>Frat. Org.</strong>
                                </td>
                                <td>
                                  Lorem Ipsum Dolor
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="col-sm-6 p-0" >
                          <table className="table table-sm table-borderless">
                            <tbody>
                              <tr>
                                <td style={{textAlign: 'right'}}>
                                  <strong>Military Service</strong>
                                </td>
                                <td>
                                  WWII
                                </td>
                              </tr>
                              <tr>
                                <td style={{textAlign: 'right'}}>
                                  <strong>Service Info</strong>
                                </td>
                                <td>
                                  Co. G, 24th Infantry
                                </td>
                              </tr>
                              <tr>
                                <td style={{textAlign: 'right'}}>
                                  <strong>Church Affiliation</strong>
                                </td>
                                <td>
                                  Lorem Ipsum Baptist Church
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="mt-3 link-container">
                        <a target="_blank" href={findGraveUrl}>View on Findagrave.com</a>
                        <a target="_blank" href="/">View on Cemetary Map</a>
                      </div>

                    </div>
                  </div>
                )
              })
              }
          </div>
          </div>
        </div>
    )
  }
}

ReactDOM.render(
  <Search />,
  document.getElementById('react_search_container')
);