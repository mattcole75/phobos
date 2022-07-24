import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { riskLikelihoodImpactConfig } from '../../../../../configuration/riskLikelihoodImpactConfig';
import Autosave from '../../../../ui/autosave/autosave';

const Objectives = (props) => {

    const { riskItem, save } = props;

    const defaultValues = {
        unmitigated: (riskItem && riskItem.objectivesScore) ? riskItem.objectivesScore.unmitigated.score : '1',
        mitigated: (riskItem && riskItem.objectivesScore) ? riskItem.objectivesScore.mitigated.score : '1'    
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
            objectivesScore: {
                unmitigated: {
                    score: data.unmitigated,
                    description: riskLikelihoodImpactConfig.objective[data.unmitigated].description
                },
                mitigated: {
                    score: data.mitigated,
                    description: riskLikelihoodImpactConfig.objective[data.mitigated].description
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
                    <h3 className='mb-2'>Objectives</h3>
                    <h6 htmlFor='mitigated'>Unmitigated Objectives</h6>
                    <div className='form-floating mb-3 border-bottom'>
                        <div className='range'>
                            <input
                                type="range" 
                                { ...register('unmitigated')}
                                min={riskLikelihoodImpactConfig.objective.min} 
                                max={riskLikelihoodImpactConfig.objective.max}
                                step={riskLikelihoodImpactConfig.objective.step}
                            />
                            <p>{(riskItem && riskItem.objectivesScore)
                                    ? riskItem.objectivesScore.unmitigated.description
                                    : riskLikelihoodImpactConfig.objective[1].description}
                            </p>
                        </div>
                    </div>

                    <h6 htmlFor='mitigated'>Mitigated Objectives</h6>
                    <div className='form-floating mb-3'>
                        <div className='range'>
                            <input
                                type="range" 
                                {...register('mitigated')}
                                min={riskLikelihoodImpactConfig.objective.min} 
                                max={riskLikelihoodImpactConfig.objective.max}
                                step={riskLikelihoodImpactConfig.objective.step}
                            />
                            <p>{(riskItem && riskItem.objectivesScore)
                                    ? riskItem.objectivesScore.mitigated.description
                                    : riskLikelihoodImpactConfig.objective[1].description}
                            </p>
                        </div>
                    </div>
                </div>
                <Autosave defaultValues={defaultValues} onSubmit={onSubmit} delay={250} />
            </form>
        </FormProvider>
        
    )
}

export default Objectives;