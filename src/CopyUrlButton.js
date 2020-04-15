
const CopyUrlButton = () => {
    const [recentlyClicked, setRecentlyClicked] = React.useState(false)
    const handleCopyUrl = () => {
        setRecentlyClicked(true)
        let dummy = document.createElement('input'), text = window.location.href;
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
        setTimeout(()=> setRecentlyClicked(false), 5000)
    }
    
    return (
        <button 
            type='button' 
            className='btn btn-light copy-url-button'
            onClick={handleCopyUrl}
            disabled={recentlyClicked}
        >
            
            {recentlyClicked ?
                <div>
                    <i className="fas fa-check mr-1"></i> 
                    <span>Copied URL to Clipboard!</span>
                </div>
                :
                <div>
                    <i className="fas fa-copy mr-1"></i> 
                    <span>Share Your Search</span>
                </div>
            }
            
        </button>
    );
}

export default CopyUrlButton;