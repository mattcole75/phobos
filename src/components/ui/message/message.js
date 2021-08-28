import React from 'react';

const message = React.memo(props => {

    return (

        <div className="alert alert-danger">
            <h2>There is a problem</h2>
            <p>{props.children}</p>
            <button className="alert-btn alert-btn--alert-danger" type="button" onClick={props.close}>OK</button>
        </div>
    )

    // <div class="alert alert-danger">

    // </div>
    // if(isset($_SESSION['msg'])) {
    // echo '<div class="alert alert-success">'.$_SESSION['msg'].'</div>';

});

export default message;