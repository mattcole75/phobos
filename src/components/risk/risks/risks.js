import React from 'react';

const risks = (props) => (
    <div className="risk-item u-margin-bottom-big">
        <div>
            <div className="risk-item__cell">
                <h2 className="heading-tertiary">
                    Risk List
                </h2>
            </div>
            <div className="risk-item__cell">
                <button
                    className="btn"
                    type="button"
                    onClick={props.onAddRisk}>Add new risk</button>
            </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Score</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {props.riskItems && props.riskItems.map(rsk => (
                <tr key={rsk.id}>
                    <td>{rsk.title}</td>
                    <td>{rsk.score}</td>
                    <td>{rsk.status}</td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
)

export default risks;