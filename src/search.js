import Pagination from './Pagination.js';
import ResultCard from './ResultCard.js';
import CopyUrlButton from './CopyUrlButton.js';

function getUrlVars() {
  let vars = {};
  let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = decodeURI(value).split(',');
  });
  return vars;
}
const encodeUrlVars = (vars) => {
  let varStr = Object.keys(vars).map(key => key + '=' + vars[key]).join('&');
  return varStr;
}
function getUrlParam(parameter, defaultvalue){
  let urlparameter = defaultvalue;
  if(window.location.href.indexOf(parameter) > -1) {
    urlparameter = getUrlVars()[parameter];
  }
  return urlparameter;
}

class Search extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      sort: 'Last_Name',
      page: 1,
      configuration: {
        searchableFields: [
          'Last_Name', 
          'First_Name', 
          'Birth_Year',
          'Death_Year',
          'Middle_Name', 
          'Cemetery Name',
          'Death_Location',
          'Birth_Location',
          'Occupation',
          'Find_A_Grave',
          'Inscription_Type',
          'Type',
          'Document_Type',
        ],
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
          },
        },
        aggregations: {
          Birth_Decade: {
            title: 'Decade of Birth',
            conjunction: true,
            size: 50,
            sort: 'term',
            order: 'asc',
          },
          Birth_Month: {
            title: 'Month of Birth',
            conjunction: false,
            size: 12,
            sort: 'term',
            order: 'asc',
          },
          Death_Decade: {
            title: 'Decade of Death',
            conjunction: false,
            size: 50,
            sort: 'term',
            order: 'asc',
          },
          Death_Month: {
            title: 'Month of Death',
            conjunction: false,
            size: 12,
          },
          Cemetery_Name: {
            title: 'Cemetery',
            conjunction: false,
            size: 10
          },
        },
      }
    }
    
    let newFilters = {};
    Object.keys(this.state.configuration.aggregations).map(function (v) {
      let urlVars = getUrlVars()
      newFilters[v] = [];
      if(urlVars.hasOwnProperty(v)){
        newFilters[v] = urlVars[v]
      };
    })
    
    this.state = {
      ...this.state,
      itemsjs: itemsjs(fullBioRecords, this.state.configuration),
      query: decodeURI(getUrlParam('query', '')),
      filters: newFilters,
    }
  }
  
  resetPageNumber = () => this.setState({page: 1})

  changeQuery(e) {
    this.resetPageNumber();
    let query = e.target.value;
    let urlVars = getUrlVars();
    if(query.match(/(\?|\=|\&|\/|\_|\:)/g)){
      return;
    }
    if(query !== ''){
      let newUrlVars = {...urlVars, query: query}
      let urlVarStr = encodeUrlVars(newUrlVars);  
      window.history.pushState('', '', `?${urlVarStr}`)
    } else {
      delete urlVars['query'];
      let urlVarStr = encodeUrlVars(urlVars);  
      window.history.pushState('', '', `?${urlVarStr}`)
    }
    this.setState({
      query: query
    });
  }

  resetFilters = () => {
    let urlVars = getUrlVars()
    // update url params
    Object.keys(urlVars).forEach((key) => {
      if (this.state.filters.hasOwnProperty(key)) {
        delete urlVars[key]
      }    
    })
    let urlVarStr = encodeUrlVars(urlVars);
    window.history.pushState('', '', `?${urlVarStr}`)
    // update state
    let newFilters = {};
    Object.keys(this.state.configuration.aggregations).map(function (v) {
      newFilters[v] = [];
    })
    this.setState({
      filters: newFilters,
    })    
  }

  handleCheckbox = (filterName, filterValue) => event => {
    this.resetPageNumber();
    const oldFilters = this.state.filters;
    let newFilters = oldFilters;
    let check = event.target.checked;
    let urlVars = getUrlVars();
    if (check) {
      // update url params
      if(urlVars[filterName]){
        urlVars[filterName] = [...urlVars[filterName], filterValue];
      } else {
        urlVars[filterName] = [filterValue];
      }
      let urlVarStr = encodeUrlVars(urlVars);  
      window.history.pushState('', '', `?${urlVarStr}`)
      // update state
      newFilters[filterName].push(filterValue)
      this.setState({
        filters: newFilters
      })
    } else {
        let index = newFilters[filterName].indexOf(filterValue);
        if (index > -1) {
        // update url params
        if(urlVars[filterName].length <= 1){
          delete urlVars[filterName];
        } else {
          urlVars[filterName].splice(index, 1);
        }
        let urlVarStr = encodeUrlVars(urlVars);  
        window.history.pushState('', '', `?${urlVarStr}`)
        // update state
        newFilters[filterName].splice(index, 1);
        this.setState({
          filters: newFilters
        })
      }
    }
  }

  handleSortToggle = (fieldName) => {
    let isCurrentSort = (this.state.sort === fieldName)
    if(!isCurrentSort){
      this.setState({sort: fieldName})
    }
    let currentOrder = this.state.configuration.sortings[fieldName].order;
    let oppositeOrder = (currentOrder === 'asc') ? 'desc' : 'asc';
    this.setState((prevState) => {
      prevState.configuration.sortings[fieldName].order = oppositeOrder
      return prevState;
    })
  }

  submitHandler(e) {
    e.preventDefault();
  }

  handleSetPage = (pageNumber) => {    
    this.setState({page: pageNumber})
  }

  get searchResult() {

    let result = this.state.itemsjs.search({
      query: this.state.query,
      filters: this.state.filters,
      sort: this.state.sort,
      per_page: 20,
      page: this.state.page,
      // TODO: Determine if we want to filter out anything
      // filter: (item) => item.Last_Name !== ''
    })
    // console.log(result);
    return result
  };

  render() {  
    console.log(`Search performed in ${this.searchResult.timings.search} ms, facets in ${this.searchResult.timings.facets} ms`);  
    let isFiltered = Object.values(this.state.filters).map(filter => filter.length).reduce((a, b) => a + b, 0) ? true : false;
    return (
        <div className='container' style={{ marginTop: 0 }}>
          <div className='row mt-5 main-content'>
            <div className='col-md-4' id='sidebar'>
              <h1>Search</h1>
              <div className="search-field-section">
                <form onSubmit={this.submitHandler} className='navbar-form navbar-left'>
                  <input type='text' value={this.state.query} onChange={this.changeQuery.bind(this)} className='form-control' placeholder='Search' />
                </form>
                <CopyUrlButton/>
              </div>
              <h3>
                Results
                <span className='badge badge-secondary ml-2'>{this.searchResult.pagination.total}</span>
              </h3>
              <div className='sort-section'>
                <h4><strong>Sort</strong></h4>
                {Object.entries(this.state.configuration.sortings).map((sorting, i) => {
                  let currentSort = this.state.sort;
                  let field_name = sorting[0];
                  let options = sorting[1];
                  let isActive = (this.state.sort === field_name);                
                  let isChecked = isActive && (options.order === 'asc')
                  
                  return(
                    <label key={i} className={`${isActive ? 'selected' : 'btn-light'} btn m-1 facet`}>
                      <input 
                        type='checkbox' 
                        checked={isChecked}
                        onChange={() => this.handleSortToggle(field_name)} 
                      />
                      <span className='pr-2' >{options.title}</span>
                      {isActive &&
                        <span className='badge badge-secondary'>{isChecked ? '↑' : '↓'}</span> 
                      }
                    </label>
                  )
                })}
              </div>
                <div className='filter-header'>
                  <h4><strong>Filter</strong></h4>
                  {isFiltered && 
                  <button type='button' className='btn btn-light clear-filters-btn' onClick={this.resetFilters} >Clear Filters</button>
                  }
                </div>
                {
                  Object.entries(this.searchResult.data.aggregations).map(([key, value]) => {
                    return (
                      <div key={key} className='facet-section'>
                        <h5><strong>{value.title}</strong></h5>

                        <div className='facet-grouping'>
                          {
                            Object.entries(value.buckets).map(([keyB, valueB]) => {
                              let isChecked = this.state.filters[value.name].indexOf(valueB.key)>-1 || false
                              
                              return (
                                <label key={valueB.key} className={`${isChecked ? 'selected' : 'btn-light'} btn m-1 facet`}>
                                  <input 
                                    type='checkbox' 
                                    checked={isChecked}
                                    onChange={this.handleCheckbox(value.name, valueB.key)} />
                                  <span className='pr-2' >{valueB.key}</span>
                                  <span className='badge badge-secondary'>{valueB.doc_count}</span>
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
            <div className='col-md-6' id='result-card-container'>
              <Pagination paginationData={this.searchResult.pagination} onSetPage={this.handleSetPage}/>
              <div>
                {Object.entries(this.searchResult.data.items).map(([key, item]) => {
                  return (
                    <ResultCard result={item} key={key} />
                  )
                })}
              </div>
              <Pagination paginationData={this.searchResult.pagination} onSetPage={this.handleSetPage}/>

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