import React from 'react';

import Likelihood from './components/likelihood';
import Appetite from './components/appetite';
import HealthSafety from './components/healthSafety';
import Finance from './components/finance';
import Service from './components/service';
import HumanResource from './components/humanResource';
import Projects from './components/projects';
import Reputation from './components/reputation';
import Compliance from './components/compliance';
import Objectives from './components/objectives';
import Publicity from './components/publicity';

const RiskScore = (props) => {

    const { riskItem, save } = props;

    return (
        
        <div className='mb-3 border-bottom'>
            <div className=''>
                <h2 className='text-start'>Risk Scores:</h2>
            </div>

            <div className='row align-items-md-stretch'>
                <div className='col-md-6 mb-3'>
                    <Likelihood riskItem={riskItem} save={save} />
                </div>
                <div className='col-md-6 mb-3'>
                    <Appetite riskItem={riskItem} save={save} />
                </div>
            </div>

            <div className='row align-items-md-stretch'>
                <div className='col-md-4 mb-2'>
                    <HealthSafety riskItem={riskItem} save={save} />
                </div>
                <div className='col-md-4 mb-2'>
                    <Finance riskItem={riskItem} save={save} />
                </div>
                <div className='col-md-4 mb-2'>
                    <Service riskItem={riskItem} save={save} />
                </div>
            </div>

            <div className='row align-items-md-stretch'>
                <div className='col-md-4 mb-2'>
                    <HumanResource riskItem={riskItem} save={save} />
                </div>
                <div className='col-md-4 mb-2'>
                    <Projects riskItem={riskItem} save={save} />
                </div>
                <div className='col-md-4 mb-2'>
                    <Reputation riskItem={riskItem} save={save} />
                </div>
            </div>

            <div className='row align-items-md-stretch'>
                <div className='col-md-4 mb-2'>
                    <Compliance riskItem={riskItem} save={save} />
                </div>
                <div className='col-md-4 mb-2'>
                    <Objectives riskItem={riskItem} save={save} />
                </div>
                <div className='col-md-4 mb-2'>
                    <Publicity riskItem={riskItem} save={save} />
                </div>
            </div>
        </div>
    )
}

export default RiskScore;