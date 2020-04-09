const Pagination = (props) => {
        const {paginationData, onSetPage} = props
        const itemsPerPage = paginationData.per_page;
        const totalItems = paginationData.total;
        const currentPage = paginationData.page;
        let pageNumbers = [];
        for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
            pageNumbers.push(i);            
        }
        let totalPageNumber = pageNumbers.length

        const [state, setState] = React.useState({
            error: false, 
            isBlank: false,
        })
        
        const handleSetPageInput = (e) => {
            let value = e.target.value;

            if(value <= 0 || value > totalPageNumber){
                if(value === ''){
                    setState({isBlank: true})
                } else {
                    setState({error: true, isBlank: false})
                }
            } else {
                setState({error: false, isBlank: false})                
                onSetPage(parseInt(value))
            }
        }

        let isFirstPage = (currentPage === 1) ? true : false
        let isLastPage = (currentPage === totalPageNumber) ? true : false

        const handleSetPageButton = (value) => {
            setState({error: false})
            onSetPage(value)
        }


        
        return (
                <div id='pagination_container' className='input-group mb-3'>
                    <div className='button-group'>
                        <button  
                            className="btn btn-light border-dark"
                            disabled={isFirstPage}
                            style={isFirstPage ? {color: 'lightgray'} : {color: 'black'}}
                            onClick={() => handleSetPageButton(1)}
                        >
                            <i className="fas fa-fast-backward"></i>
                        </button>  
                        <button  
                            className="btn btn-light border-dark"
                            disabled={isFirstPage}
                            style={isFirstPage ? {color: 'lightgray'} : {color: 'black'}}
                            onClick={() => handleSetPageButton(currentPage - 1)}
                        >
                            <i className="fas fa-step-backward"></i>
                        </button>
                  
                    </div>
    
                    <div className='input-page-container mx-1'>
                        <span>Page</span>
                        <input 
                            style={state.error ? {color: 'red'} : {color: 'inherit'}}
                            type="number" 
                            value={state.isBlank ? '' : currentPage}
                            onChange={handleSetPageInput}
                        />
                        <span>of {totalPageNumber}</span>
                    </div>

                    <div className='button-group'>
                        <button  
                            className="btn btn-light border-dark"
                            disabled={isLastPage}
                            style={isLastPage ? {color: 'lightgray'} : {color: 'black'}}
                            onClick={() => handleSetPageButton(currentPage + 1)}
                        >
                            <i className="fas fa-step-forward"></i>
                        </button>
                        <button  
                            className="btn btn-light border-dark"
                            disabled={isLastPage}
                            style={isLastPage ? {color: 'lightgray'} : {color: 'black'}}
                            onClick={() => handleSetPageButton(totalPageNumber)}
                        >
                            <i className="fas fa-fast-forward"></i>
                        </button>
                    </div>
                </div>

        );
}

export default Pagination;