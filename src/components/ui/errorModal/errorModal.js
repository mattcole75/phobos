import React from 'react';

const errorModal = React.memo(props => {

    return (

        <React.Fragment>

            <div className="" onClick={props.close} />

            <div className="">

                <div className="" aria-labelledby="error-summary-title" role="alert" tabIndex="-1" data-module="govuk-error-summary">
                    <h2 className="" id="error-summary-title">
                        There is a problem
                    </h2>

                    <div className="">
                        <ul className="">
                            <li>
                                <p>{props.children}</p>
                            </li>
                        </ul>
                    </div>
                    <div className="">

                        <button className="" type="button" onClick={props.close}>OK</button>

                    </div>

                </div>

            </div>

        </React.Fragment>
    )
});

export default errorModal;