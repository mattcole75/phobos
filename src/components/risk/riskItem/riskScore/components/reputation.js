import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { riskLikelihoodImpactConfig } from '../../../../../configuration/riskLikelihoodImpactConfig';
import Autosave from '../../../../ui/autosave/autosave';

const Reputation = (props) => {

    const { riskItem, save } = props;

    const defaultValues = {
        unmitigated: (riskItem && riskItem.reputationScore) ? riskItem.reputationScore.unmitigated.score : '1',
        mitigated: (riskItem && riskItem.reputationScore) ? riskItem.reputationScore.mitigated.score : '1'    
    }

    const methods = useForm({
        mode: 'onBlur',
        defaultValues
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitSuccessful }
    } = methods;

    const [submittedData, setSubmittedData] = useState({});

    useEffect(() => {
        if(isSubmitSuccessful)
            reset({ ...submittedData })
    }, [ reset, isSubmitSuccessful, submittedData ])

    const onSubmit = (data) => {
        const req = {
            reputationScore: {
                unmitigated: {
                    score: data.unmitigated,
                    description: riskLikelihoodImpactConfig.reputation[data.unmitigated].description
                },
                mitigated: {
                    score: data.mitigated,
                    description: riskLikelihoodImpactConfig.reputation[data.mitigated].description
                }
            }
        };
        save(req);
        setSubmittedData({data});
    }

    return (
        <FormProvider {...methods}>
            <form className='h-100 p-4 bg-light border rounded-3' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h3 className='mb-2'>Reputation</h3>
                    <h6 htmlFor='mitigated'>Unmitigated Reputation</h6>
                    <div className='form-floating mb-3 border-bottom'>
                        <div className='range'>
                            <input
                                type="range" 
                                { ...register('unmitigated')}
                                min={riskLikelihoodImpactConfig.reputation.min} 
                                max={riskLikelihoodImpactConfig.reputation.max}
                                step={riskLikelihoodImpactConfig.reputation.step}
                            />
                            <p>{(riskItem && riskItem.reputationScore)
                                    ? riskItem.reputationScore.unmitigated.description
                                    : riskLikelihoodImpactConfig.reputation[1].description}
                            </p>
                        </div>
                    </div>

                    <h6 htmlFor='mitigated'>Mitigated Reputation</h6>
                    <div className='form-floating mb-3'>
                        <div className='range'>
                            <input
                                type="range" 
                                {...register('mitigated')}
                                min={riskLikelihoodImpactConfig.reputation.min} 
                                max={riskLikelihoodImpactConfig.reputation.max}
                                step={riskLikelihoodImpactConfig.reputation.step}
                            />
                            <p>{(riskItem && riskItem.reputationScore)
                                    ? riskItem.reputationScore.mitigated.description
                                    : riskLikelihoodImpactConfig.reputation[1].description}
                            </p>
                        </div>
                    </div>
                </div>
                <Autosave defaultValues={defaultValues} onSubmit={onSubmit} delay={250} />
            </form>
        </FormProvider>
        
    )
}

export default Reputation;