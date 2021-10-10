import React from 'react';
import LikelihoodImpactHeaderItem from './likelihoodImpactHeaderItem';

const likelihoodImpactHeader = React.memo(props => {

    const {likelihood, appetite, healthSafety, financial, compliance, publicity, reputation, service, humanResource, objective, project} = props;

    return (
        <div className="register-risk__panel-item">
            <label className="form__label">Likeihood & Impact Dashboard</label>
            <div className="register-risk__dashboard-container">
                <LikelihoodImpactHeaderItem value={healthSafety} likelihood={likelihood} appetite={appetite} />
                <LikelihoodImpactHeaderItem value={humanResource} likelihood={likelihood} appetite={appetite} />
                <LikelihoodImpactHeaderItem value={compliance} likelihood={likelihood} appetite={appetite} />
                <LikelihoodImpactHeaderItem value={financial} likelihood={likelihood} appetite={appetite} />
                <LikelihoodImpactHeaderItem value={project} likelihood={likelihood} appetite={appetite} />
                <LikelihoodImpactHeaderItem value={objective} likelihood={likelihood} appetite={appetite} />
                <LikelihoodImpactHeaderItem value={service} likelihood={likelihood} appetite={appetite} />
                <LikelihoodImpactHeaderItem value={reputation} likelihood={likelihood} appetite={appetite} />
                <LikelihoodImpactHeaderItem value={publicity} likelihood={likelihood} appetite={appetite} />
            </div>
        </div>
    )
});

export default likelihoodImpactHeader;