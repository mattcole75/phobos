import React, {useCallback, useEffect, useState} from 'react';
import LocationHeader from './location/locationHeader';
import LocationSelector from './location/locationSelector';
import KeyWordsPhrasesHeader from './keyWordsPhrases/keyWordsPhrasesHeader';
import KeyWordsPhrasesSelector from './keyWordsPhrases/keyWordPhraseSelector';
import AffectedAreasHeader from './affectedAreas/affectedAreasHeader';
import AffectedAreasSelector from './affectedAreas/affectedAreasSelector';
import LikelihoodImpactHeader from './likelihoodImpact/likelihoodImpactHeader';
import useKeyWordsPhrases from '../../../hooks/useKeyWordsPhrases';
import useLocations from '../../../hooks/useLocations';
import useOrganisationAreas from '../../../hooks/useOrganisationAreas';
import {useSelector} from 'react-redux';
import Range from '../../ui/range/range';
import config from '../../../configuration/riskLikelihoodImpactConfig';
import Input from '../../ui/input/input';
import {riskRegisterTextForm} from '../../ui/input/forms/risk';
import {checkValidity} from '../../../shared/utility';
import useForms from '../../../hooks/useForm';
// import * as action from '../../../store/actions/index';
// import ErrorModal from '../../ui/errorModal/errorModal';
// import Spinner from '../../ui/spinner/spinner';


const registerRisk = React.memo((props) => {

    // const loading = useSelector(state => state.risk.loading);
    // const error = useSelector(state => state.risk.error);
    // const identifier = useSelector(state => state.risk.identifier);
    // const riskData = useSelector(state => state.risk.data);

    // const dispatch = useDispatch;

    //const onPostRisk = useCallback((riskData, identifier) => dispatch(action.riskSendRequest('/risk.json?auth=' + idToken,'POST', riskData, null, identifier, null)),[dispatch, idToken]);
    //const onSetRisk = useCallback((riskData, identifier) => dispatch(action.riskSendRequest('/risk.json?auth=' + idToken,'SET', riskData, null, identifier, null)), [dispatch, idToken]);
    
    const {keyWordsPhrases, suggestKeyWordsPhrases, addKeyWordPhrase, removeKeyWordPhrase, setSuggestKeyWordsPhrases} = useKeyWordsPhrases();
    const {locations, suggestLocations, addLocation, removeLocation, setSuggestLocation} = useLocations();
    const {areas, suggestAreas, addArea, removeArea, setSuggestAreas} = useOrganisationAreas();

    const intelliVerse = useSelector(state => state.intelliVerse.data);
    const intelliVerseIdentifier = useSelector(state => state.intelliVerse.identifier);

    const organisationAreas = useSelector(state => state.organisation.data);
    const organisationIdentifier = useSelector(state => state.organisation.identifier);

    const location = useSelector(state => state.location.data);
    const locationIdentifier = useSelector(state => state.location.identifier);

    const [wordPhraseSearchText, setWordPhraseSearchText] = useState('');
    const [locationSearchText, setLocationSearchText] = useState('');
    const [areaSearchText, setAreaSearchText] = useState('');

    const [likelihood, setLikelihood] = useState(config.get('likelihoodImpact.likelihood'));
    const [appetite, setAppetite] = useState(config.get('likelihoodImpact.appetite'));
    const [healthSafety, setHealthSafety] = useState(config.get('likelihoodImpact.healthSafety'));
    const [financial, setFinancial] = useState(config.get('likelihoodImpact.financial'));
    const [compliance, setCompliance] = useState(config.get('likelihoodImpact.compliance'));
    const [publicity, setPublicity] = useState(config.get('likelihoodImpact.publicity'));
    const [reputation, setReputation] = useState(config.get('likelihoodImpact.reputation'));
    const [service, setService] = useState(config.get('likelihoodImpact.service'));
    const [humanResource, setHumanResource] = useState(config.get('likelihoodImpact.humanResource'));
    const [objective, setObjective] = useState(config.get('likelihoodImpact.objective'));
    const [project, setProject] = useState(config.get('likelihoodImpact.project'));

    const {status, formConfig, setFormConfig} = useForms();
    const [form, setForm] = useState(<p>spinner</p>);

    const wordPhraseSearchTextHandler = useCallback((wordPhrase) => {
        setWordPhraseSearchText(wordPhrase);
    }, []);

    const locationTextHandler = useCallback((wordPhrase) => {
        setLocationSearchText(wordPhrase);
    }, []);

    const areaTextHandler = useCallback((area) => {
        setAreaSearchText(area);
    }, []);

    const addKeyWordPhraseHandler = useCallback((wordPhrase) => {
        addKeyWordPhrase(wordPhrase);
        setWordPhraseSearchText('');
    }, [addKeyWordPhrase]);

    const removeKeyWordPhraseHandler = useCallback((wordPhrase) => {
        removeKeyWordPhrase(wordPhrase);
    }, [removeKeyWordPhrase]);

    const addLocationHandler = useCallback((location) => {
        addLocation(location);
        setLocationSearchText('');
    }, [addLocation]);

    const removeLocationHandler = useCallback((location) => {
        removeLocation(location);
    }, [removeLocation]);

    const inputChangedHandler = useCallback((event, controlName) => {

        const updatedControls = {
            controls: {
                ...formConfig.controls,
                [controlName]: {
                    ...formConfig.controls[controlName],
                    value: event.target.value,
                    valid: checkValidity(event.target.value, formConfig.controls[controlName].validation),
                    touched: true
                }
            }
        };

        let formIsValid = true;
        for (let inputIdentifier in updatedControls.controls) {
            formIsValid = updatedControls.controls[inputIdentifier].valid && formIsValid;
        }

        updatedControls["formIsValid"] = formIsValid;

        setFormConfig(updatedControls);
        

    }, [formConfig, setFormConfig]);

    useEffect(() => {

        if(!formConfig)
            setFormConfig(riskRegisterTextForm);
            
    }, [formConfig, setFormConfig]);

    useEffect(() => {

        if(status === 'set' || status === 'update') {
            
            const formElementsArray = [];
            for (let key in formConfig.controls) {
                formElementsArray.push({
                    id: key,
                    config: formConfig.controls[key]
                });
            }

            setForm(formElementsArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => inputChangedHandler(event, formElement.id)}
                    // clicked={() => registerAccountHandler({
                    //     displayName: formConfig.controls.displayName.value,
                    //     email: formConfig.controls.email.value,
                    //     password: hashPassword(formConfig.controls.password.value),
                    //     returnSecureToken: true
                    // })}
                    formIsValid={formConfig.formIsValid}/>
            )));
        }
        
    }, [status, formConfig, inputChangedHandler]);

    useEffect(() => {
        if(intelliVerse && intelliVerseIdentifier === 'GET_RECOMMENDED_KEY_WORDS_PHRASES'){
            setSuggestKeyWordsPhrases([...intelliVerse.intelliSuggest]);
        }

        if(location && locationIdentifier === 'GET_LOCATIONS'){
            setSuggestLocation(location.locations);
        }

        if(organisationAreas && organisationIdentifier === 'GET_ORGANISATION_AREAS'){
            setSuggestAreas(organisationAreas.organisationAreas);
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[intelliVerse, keyWordsPhrases, intelliVerseIdentifier, location, locationIdentifier, organisationAreas, organisationIdentifier]);
        
    return (

        <section className="section-registerRisk">
            <div className="u-margin-bottom-medium u-centre-text">
                <h2 className="heading-secondary">
                    Raising a risk?
                </h2>
            </div>

            <div className="row register-risk">
                <div className="col-one-third ">
                    <div className="register-risk__panel u-margin-bottom-small">
                        <LocationHeader locationTextHandler={locationTextHandler} locations={locations}/>
                    </div>
                    <div className="register-risk__panel u-margin-bottom-small">
                        <LocationSelector
                            locationSearchText={locationSearchText}
                            locations={locations}
                            suggestLocations={suggestLocations} 
                            addLocationHandler={addLocationHandler}
                            removeLocationHandler={removeLocationHandler} 
                        />
                    </div>
                </div>

                <div className="col-one-third">
                    <div className="register-risk__panel u-margin-bottom-small">
                        <KeyWordsPhrasesHeader wordPhraseSearchTextHandler={wordPhraseSearchTextHandler} />
                    </div>
                    <div className="register-risk__panel u-margin-bottom-small">
                        <KeyWordsPhrasesSelector
                            wordPhraseSearchText={wordPhraseSearchText}
                            keyWordsPhrases={keyWordsPhrases}
                            suggestKeyWordsPhrases={suggestKeyWordsPhrases} 
                            addKeyWordPhraseHandler={addKeyWordPhraseHandler}
                            removeKeyWordPhraseHandler={removeKeyWordPhraseHandler} />
                    </div>
                </div>

                <div className="col-one-third ">
                    <div className="register-risk__panel u-margin-bottom-small">
                        <AffectedAreasHeader areaTextHandler={areaTextHandler}/>
                    </div>
                    <div className="register-risk__panel u-margin-bottom-small">
                        <AffectedAreasSelector 
                            areaSearchText={areaSearchText} 
                            areas={areas}
                            suggestAreas={suggestAreas}
                            addAreaHandler={addArea}
                            removeAreaHandler={removeArea} />
                    </div>
                </div>
            </div>

            <div className="row register-risk">
                <div className="register-risk__panel u-margin-bottom-small">
                    <LikelihoodImpactHeader 
                        likelihood={likelihood}
                        appetite={appetite}
                        healthSafety={healthSafety}
                        financial={financial}
                        compliance={compliance}
                        publicity={publicity}
                        reputation={reputation}
                        service={service}
                        humanResource={humanResource}
                        objective={objective}
                        project={project} />
                </div>  
            </div>

            <div className="row register-risk">

                <div className="col-half">
                    <div className="register-risk__panel u-margin-bottom-small">
                        <Range config={likelihood} setConfig={setLikelihood} />
                    </div>
                </div>

                <div className="col-half">
                    <div className="register-risk__panel u-margin-bottom-small">
                        <Range config={appetite} setConfig={setAppetite} />
                    </div>
                </div>

            </div>

            <div className="row register-risk">

                <div className="col-one-third">
                    <div className="register-risk__panel u-margin-bottom-small">
                        <Range config={healthSafety} setConfig={setHealthSafety} />
                    </div>
                    <div className="register-risk__panel u-margin-bottom-small">
                        <Range config={humanResource} setConfig={setHumanResource} />
                    </div>
                    <div className="register-risk__panel u-margin-bottom-small">
                        <Range config={compliance} setConfig={setCompliance} />
                    </div>
                </div>

                <div className="col-one-third">
                    <div className="register-risk__panel u-margin-bottom-small">
                        <Range config={financial} setConfig={setFinancial} />
                    </div>
                    <div className="register-risk__panel u-margin-bottom-small">
                        <Range config={project} setConfig={setProject} />
                    </div>
                    <div className="register-risk__panel u-margin-bottom-small">
                        <Range config={objective} setConfig={setObjective} />
                    </div>
                </div>

                <div className="col-one-third">
                    <div className="register-risk__panel u-margin-bottom-small">
                        <Range config={service} setConfig={setService} />
                    </div>
                    <div className="register-risk__panel u-margin-bottom-small">
                        <Range config={reputation} setConfig={setReputation} />
                    </div>
                    <div className="register-risk__panel u-margin-bottom-small">
                        <Range config={publicity} setConfig={setPublicity} />
                    </div>
                </div>
                
            </div>

            <div className="row register-risk">
                <div className="register-risk__panel u-margin-bottom-small">
                    <div className="register-risk__panel-item">
                        {form}
                    </div>
                </div>
            </div>

            <div className="row register-risk">
                <div className="register-risk__panel u-margin-bottom-small">
                    <div className="register-risk__panel-item">
                        {/* <button className="btn" disabled={!formConfig.formIsValid}>Save</button> */}
                        <button className="btn">Save</button>
                        <button className="btn btn--orange">Cancel</button>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default registerRisk;;