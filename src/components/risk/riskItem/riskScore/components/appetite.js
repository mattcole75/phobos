import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { riskLikelihoodImpactConfig } from '../../../../../configuration/riskLikelihoodImpactConfig';
import Autosave from '../../../../ui/autosave/autosave';

const Appetite = (props) => {

    const { riskItem, save } = props;

    const defaultValues = {
        appetite: (riskItem.appetiteScore && riskItem.appetiteScore.score) || ''   
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
                        <select className='form-select' id='appetite' required
                            disabled={false}
                            {...register('appetite', { required: true })}>
                            <option value=''>Choose...</option>
                            <option value='1'>{riskLikelihoodImpactConfig.appetite[1].description}</option>
                            <option value='2'>{riskLikelihoodImpactConfig.appetite[2].description}</option>
                            <option value='3'>{riskLikelihoodImpactConfig.appetite[3].description}</option>
                            <option value='4'>{riskLikelihoodImpactConfig.appetite[4].description}</option>
                            <option value='5'>{riskLikelihoodImpactConfig.appetite[5].description}</option>
                            <option value='6'>{riskLikelihoodImpactConfig.appetite[6].description}</option>
                        </select>
                        <label htmlFor='appetite'>Risk appetite</label>
                    </div>
                </div>
                <Autosave defaultValues={defaultValues} onSubmit={onSubmit} />
            </form>
        </FormProvider>
        
    )
}

export default Appetite;