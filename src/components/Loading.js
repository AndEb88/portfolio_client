function Loading() {

    return(
        <>
        <div className='row' style={{ height: '10vh' }}></div>
        <div className='row d-flex justify-content-center align-items-center'>
            <div className='spinner-border highlight-color' role='status'>
                <span className='visually-hidden'>Loading...</span>
            </div>
        </div>
        </>
    );
}

export default Loading;