import React, {useRef, useState, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as action from '../../../store/actions/index';
import ErrorModal from '../../ui/errorModal/errorModal';
// import Backdrop from '../../ui/backdrop/backdrop';
import Spinner from '../../ui/spinner/spinner';


const search = React.memo((props) => {

    const {loadRisk} = props;
    const [enteredFilter, setEnteredFilter] = useState('');
    const inputRef = useRef();

    const loading = useSelector(state => state.risk.loading);
    const error = useSelector(state => state.risk.error);
    // const identifier = useSelector(state => state.risk.identifier);
    const data = useSelector(state => state.risk.data);

    // const userId = useSelector(state => state.auth.localId);
    const idToken = useSelector(state => state.auth.idToken);

    const dispatch = useDispatch();

    const onLoadRisk = useCallback((filter) => dispatch(action.riskSendRequest(`/risk.json?auth=${idToken}${filter}`,'GET', null, null, 'LOAD_RISK')),[dispatch, idToken]);
    const onClearError = useCallback(() => dispatch(action.riskErrorReset()),[dispatch]);

    useEffect(() => {
        const timer = setTimeout(() => {
          if(enteredFilter === inputRef.current.value || props.reloadRiskList) {
            const query = 
                enteredFilter.length === 0 
                ? '' 
                : `&orderBy="keyWordPhrase"&startAt="${enteredFilter}"&endAt="${enteredFilter}~"`;
            onLoadRisk(query)
          }
        }, 500);
        return () => {
          clearTimeout(timer);
        };
      }, [enteredFilter, inputRef, props.reloadStockList, props.reloadRiskList, onLoadRisk]);
      
      useEffect(() => {
        if(!loading && !error && data) {
            const loadedRisks = [];
            for(const key in data) {
                loadedRisks.push({
                    id: key,
                    title: data[key].title,
                    score: data[key].score,
                    status: data[key].status
                })
            }

            loadRisk(loadedRisks);
        }

      }, [data, error, loading, props, loadRisk]);


    return (
        <div className="risk">
          {error && <ErrorModal onClose={onClearError}>{error}</ErrorModal>}
          {loading && <Spinner />}
          
            <div className="">                
              <input
                className="form__input"
                ref={inputRef}
                placeholder="Search key words and phrases..."
                type="text"
                value={enteredFilter}
                onChange={event => setEnteredFilter(event.target.value)}
              />
            </div>
          
        </div>
      );

});

export default search;