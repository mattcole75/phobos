import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { riskLikelihoodImpactConfig } from '../../../../../configuration/riskLikelihoodImpactConfig';
import Autosave from '../../../../ui/autosave/autosave';

const Projects = (props) => {

    const { riskItem, save } = props;

    const defaultValues = {
        unmitigated: (riskItem.projectsScore && riskItem.projectsScore.unmitigated.score) || '',
        mitigated: (riskItem.projectsScore && riskItem.projectsScore.mitigated.score) || ''    
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
            projectsScore: {
                unmitigated: {
                    score: data.unmitigated,
                    description: riskLikelihoodImpactConfig.project[data.unmitigated].description
                },
                mitigated: {
                    score: data.mitigated,
                    description: riskLikelihoodImpactConfig.project[data.mitigated].description
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
                    <h3 className='mb-2'>Projects</h3>
                    <div className='form-floating mb-3'>
                        <select className='form-select' id='unmitigated' required
                            disabled={false}
                            {...register('unmitigated', { required: true })}>
                            <option value=''>Choose...</option>
                            <option value='1'>{riskLikelihoodImpactConfig.project[1].description}</option>
                            <option value='2'>{riskLikelihoodImpactConfig.project[2].description}</option>
                            <option value='3'>{riskLikelihoodImpactConfig.project[3].description}</option>
                            <option value='4'>{riskLikelihoodImpactConfig.project[4].description}</option>
                            <option value='5'>{riskLikelihoodImpactConfig.project[5].description}</option>
                            <option value='6'>{riskLikelihoodImpactConfig.project[6].description}</option>
                        </select>
                        <label htmlFor='unmitigated'>Unmitigated Likelihood</label>
                    </div>
                    <div className='form-floating mb-3'>
                        <select className='form-select' id='mitigated' required
                            disabled={false}
                            {...register('mitigated', { required: true })}>
                            <option value=''>Choose...</option>
                            <option value='1'>{riskLikelihoodImpactConfig.project[1].description}</option>
                            <option value='2'>{riskLikelihoodImpactConfig.project[2].description}</option>
                            <option value='3'>{riskLikelihoodImpactConfig.project[3].description}</option>
                            <option value='4'>{riskLikelihoodImpactConfig.project[4].description}</option>
                            <option value='5'>{riskLikelihoodImpactConfig.project[5].description}</option>
                            <option value='6'>{riskLikelihoodImpactConfig.project[6].description}</option>
                        </select>
                        <label htmlFor='mitigated'>Mitigated Likelihood</label>
                    </div>
                </div>
                <Autosave defaultValues={defaultValues} onSubmit={onSubmit} />
            </form>
        </FormProvider>
        
    )
}

export default Projects;