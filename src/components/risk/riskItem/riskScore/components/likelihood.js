import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { riskLikelihoodImpactConfig } from '../../../../../configuration/riskLikelihoodImpactConfig';
import Autosave from '../../../../ui/autosave/autosave';

const Likelihood = (props) => {

    const { riskItem, save } = props;

    const defaultValues = {
        unmitigated: (riskItem && riskItem.likelihoodScore) ? riskItem.likelihoodScore.unmitigated.score : '1',
        mitigated: (riskItem && riskItem.likelihoodScore) ? riskItem.likelihoodScore.mitigated.score : '1' 
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
    }, [reset, isSubmitSuccessful, submittedData])

    const onSubmit = (data) => {
        const req = {
            likelihoodScore: {
                unmitigated: {
                    score: data.unmitigated,
                    description: riskLikelihoodImpactConfig.likelihood[data.unmitigated].description
                },
                mitigated: {
                    score: data.mitigated,
                    description: riskLikelihoodImpactConfig.likelihood[data.mitigated].description
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
                    <h3 className='mb-2'>Likelihood</h3>
                    <h6 htmlFor='mitigated'>Unmitigated Likelihood</h6>
                    <div className='form-floating mb-3 border-bottom'>
                        <div className='range'>
                            <input
                                type="range" 
                                { ...register('unmitigated')}
                                min={riskLikelihoodImpactConfig.likelihood.min} 
                                max={riskLikelihoodImpactConfig.likelihood.max}
                                step={riskLikelihoodImpactConfig.likelihood.step}
                            />
                            <p>{(riskItem && riskItem.likelihoodScore) 
                                    ? riskItem.likelihoodScore.unmitigated.description 
                                    : riskLikelihoodImpactConfig.likelihood[1].description}
                            </p>
                        </div>
                    </div>
                
                    <h6 htmlFor='mitigated'>Mitigated Likelihood</h6>
                    <div className='form-floating mb-3'>
                        <div className='range'>
                            <input
                                type="range" 
                                {...register('mitigated')}
                                min={riskLikelihoodImpactConfig.likelihood.min} 
                                max={riskLikelihoodImpactConfig.likelihood.max}
                                step={riskLikelihoodImpactConfig.likelihood.step}
                            />
                            <p>{(riskItem && riskItem.likelihoodScore)
                                    ? riskItem.likelihoodScore.mitigated.description 
                                    : riskLikelihoodImpactConfig.likelihood[1].description}
                            </p>
                        </div>
                    </div>
                </div>
                <Autosave defaultValues={defaultValues} onSubmit={onSubmit} delay={250} />
            </form>
        </FormProvider>
        
    )
}

export default Likelihood;