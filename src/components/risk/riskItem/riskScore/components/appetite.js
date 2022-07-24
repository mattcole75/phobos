import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { riskLikelihoodImpactConfig } from '../../../../../configuration/riskLikelihoodImpactConfig';
import Autosave from '../../../../ui/autosave/autosave';

const Appetite = (props) => {

    const { riskItem, save } = props;

    const defaultValues = {
        appetite: (riskItem && riskItem.appetiteScore) ? riskItem.appetiteScore.score : '1'   
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
            appetiteScore: {
                score: data.appetite,
                description: riskLikelihoodImpactConfig.appetite[data.appetite].description
            }
        };
        save(req);
        setSubmittedData({data});
    }

    return (
        <FormProvider {...methods}>
            <form className='h-100 p-4 bg-light border rounded-3' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h3 className='mb-2'>Risk Appetite</h3>
                    <div className='form-floating mb-3'>
                    <div className='range'>
                            <input
                                type="range" 
                                { ...register('appetite')}
                                min={riskLikelihoodImpactConfig.appetite.min} 
                                max={riskLikelihoodImpactConfig.appetite.max}
                                step={riskLikelihoodImpactConfig.appetite.step}
                                />
                            <p>{(riskItem && riskItem.appetiteScore)
                                    ? riskItem.appetiteScore.description 
                                    : riskLikelihoodImpactConfig.appetite[1].description}</p>
                        </div>
                    </div>
                </div>
                <Autosave defaultValues={defaultValues} onSubmit={onSubmit} delay={250} />
            </form>
        </FormProvider>
        
    )
}

export default Appetite;