import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

const RecoveryForm = (props) => {

    const { riskItem, index, save, toggle } = props;

    const { register, handleSubmit, formState } = useForm({ 
        mode: 'onChange', 
        defaultValues: riskItem.recoveryItems && riskItem.recoveryItems[index]
        
    });

    const onSave = useCallback((data) => {

        if(riskItem.recoveryItems && index === null) {
            // add new item to the array
            let updatedRecoveryItems = [...riskItem.recoveryItems];
            updatedRecoveryItems.push({ ...data });
            save({ recoveryItems: updatedRecoveryItems });
        } else if (riskItem && index !== null) {
            // edit existing item in the array
            let updatedRecoveryItems = [...riskItem.recoveryItems];
            updatedRecoveryItems[index] = { ...data };
            save({ recoveryItems: updatedRecoveryItems });
        } else {
            // add first item and create the array
            save({ recoveryItems: [{...data }] });
        }
        toggle();
    }, [index, riskItem, save, toggle]);

    const onDelete = useCallback(() => {
        let updatedRecoveryItems = [...riskItem.recoveryItems];
        updatedRecoveryItems.splice(index, 1);
        save({recoveryItems: updatedRecoveryItems});
        toggle();
    }, [index, riskItem, save, toggle]);

    return (
        <div className="form-auth my-5">
            
            <form className="was-validated">
                <h1 className="h3 mb-3 fw-normal">Recovery Item</h1>

                <div className='form-floating mb-3'>
                    <select className='form-select' id='category' required
                        disabled={false}
                        {...register('category', { required: true })}>
                        <option value="">Choose...</option>
                        <option>Health & Safety</option>
                        <option>Finance</option>
                        <option>Service</option>
                        <option>Human resource</option>
                        <option>Projects</option>
                        <option>Reputation</option>
                        <option>Compiance</option>
                        <option>Objectives</option>
                        <option>Publicity</option>
                    </select>
                    <label htmlFor='category'>Category</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="title" placeholder="Mitigation title" required minLength={3} maxLength={32} 
                        disabled={false}
                        {...register("title", { required: true, minLength: 3, maxLength: 32 })} />
                    <label htmlFor="title" className="form-label">Title</label>
                </div>

                <div className="form-floating mb-3">
                    <textarea className="form-control" id="description"  rows="3" style={{height:"auto"}} placeholder="Mitigation description" required 
                        disabled={false}
                        {...register("description", { required: true, minLength: 5 })} />
                    <label htmlFor="description" className="form-label">Description</label>
                </div>

                <div className='form-floating mb-3'>
                    <select className='form-select' id='status' required
                        disabled={false}
                        {...register('status', { required: true })}>
                        <option value="">Choose...</option>
                        <option>Ready</option>
                        <option>In progress</option>
                        <option>Not started</option>
                    </select>
                    <label htmlFor='status'>Status</label>  
                </div>

                <div className="form-floating mb-3">
                    <button className="w-100 btn btn-lg btn-primary" type="button" disabled={!formState.isValid} onClick={handleSubmit(onSave)}>Save changes</button>
                </div>
                
                <div className="form-floating mb-5">
                    <button className="w-100 btn btn-lg btn-secondary" type="button" onClick={toggle}>Close</button>
                </div>
                <div className="form-floating">
                    <button className="w-100 btn btn-lg btn-danger" type="button" onClick={handleSubmit(onDelete)}>Delete</button>
                </div>
                    
            </form>
        </div>
    )
}

export default RecoveryForm;