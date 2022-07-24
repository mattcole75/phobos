import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { getKeyWords } from '../../../../shared/utility';
import Autosave from '../../../ui/autosave/autosave';

const RiskHeader = (props) => {

    const { riskItem, save } = props;

    const [formStatus, setFormStatus] = useState(null);
    const [formStatusStyle, setFormStatusStyle] = useState(null);

    const defaultValues = {
        title: riskItem && riskItem.title,
        description: riskItem && riskItem.description
    }

    const methods = useForm({ 
        mode: 'onBlur', 
        defaultValues 
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitSuccessful, isDirty }
    } = methods;

    const [submittedData, setSubmittedData] = useState({});

    const onSubmit = async (data) => {
        save({ ...data, keyWords: await getKeyWords(data.description) }, 'PATCH_RISK_ITEM');
        setSubmittedData({ ...data, keyWords: await getKeyWords(data.description) });
    };

    useEffect(() => {
        
        if(isSubmitSuccessful) {
            reset({ ...submittedData });
        }
        
        if(isDirty) {
            setFormStatus('pending');
            setFormStatusStyle('fs-6 badge rounded-pill bg-warning text-bg-warning');
        } else {
            setFormStatus('saved');
            setFormStatusStyle('fs-6 badge rounded-pill bg-success text-bg-success');
        }
        
    }, [isSubmitSuccessful, reset, submittedData, isDirty]);

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3 border-bottom">
                    <h2 className="text-start">Risk Details: { formStatus ? <div className={formStatusStyle}>{formStatus}</div> : null }</h2>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="title" placeholder="Title" autoComplete="off" required minLength={3} maxLength={32}
                            disabled={false}
                            {...register("title", { required: true, minLength: 3, maxLength: 32 })} />
                        <label htmlFor="title" className="form-label">Title</label>
                    </div>
                    <div className="form-floating mb-3">
                        <textarea className="form-control" id="description"  rows="5" style={{height:"auto"}} placeholder="Request description" required 
                            minLength={10} maxLength={512} disabled={false}
                            {...register("description", { required: true, minLength: 10, maxLength: 512 })} />
                        <label htmlFor="description" className="form-label">Description</label>
                    </div>
                </div>
                <Autosave defaultValues={defaultValues} onSubmit={onSubmit} delay={2000} />
            </form>
        </FormProvider>
    );
}

export default RiskHeader;