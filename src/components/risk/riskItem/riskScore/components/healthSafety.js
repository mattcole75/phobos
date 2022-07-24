import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { riskLikelihoodImpactConfig } from '../../../../../configuration/riskLikelihoodImpactConfig';
import Autosave from '../../../../ui/autosave/autosave';

const HealthSafety = (props) => {

    const { riskItem, save } = props;

    const defaultValues = {
        unmitigated: (riskItem && riskItem.healthSafetyScore) ? riskItem.healthSafetyScore.unmitigated.score : '1',
        mitigated: (riskItem && riskItem.healthSafetyScore) ?  riskItem.healthSafetyScore.mitigated.score : '1'    
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
            healthSafetyScore: {
                unmitigated: {
                    score: data.unmitigated,
                    description: riskLikelihoodImpactConfig.healthSafety[data.unmitigated].description
                },
                mitigated: {
                    score: data.mitigated,
                    description: riskLikelihoodImpactConfig.healthSafety[data.mitigated].description
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
                    <h3 className='mb-2'>Health & Safety</h3>
                        <h6 htmlFor='mitigated'>Unmitigated Health & Safety</h6>
                        <div className='form-floating mb-3 border-bottom'>
                            <div className='range'>
                                <input
                                    type="range" 
                                    { ...register('unmitigated')}
                                    min={riskLikelihoodImpactConfig.healthSafety.min} 
                                    max={riskLikelihoodImpactConfig.healthSafety.max}
                                    step={riskLikelihoodImpactConfig.healthSafety.step}
                                />
                                <p>{(riskItem && riskItem.healthSafetyScore)
                                        ? riskItem.healthSafetyScore.unmitigated.description
                                        : riskLikelihoodImpactConfig.healthSafety[1].description}
                                </p>
                            </div>
                        </div>
                        <div className='form-floating mb-3'>

                        <h6 htmlFor='mitigated'>Mitigated Health & Safety</h6>
                        <div className='form-floating mb-3'>
                            <div className='range'>
                                <input
                                    type="range" 
                                    {...register('mitigated')}
                                    min={riskLikelihoodImpactConfig.healthSafety.min} 
                                    max={riskLikelihoodImpactConfig.healthSafety.max}
                                    step={riskLikelihoodImpactConfig.healthSafety.step}
                                    />
                                <p>{(riskItem && riskItem.healthSafetyScore)
                                        ? riskItem.healthSafetyScore.mitigated.description
                                        : riskLikelihoodImpactConfig.healthSafety[1].description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Autosave defaultValues={defaultValues} onSubmit={onSubmit} delay={250} />
            </form>
        </FormProvider>
        
    )
}

export default HealthSafety;