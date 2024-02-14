import React, {useReducer, useMemo, useEffect} from 'react';
import Store from '../config/Store';
const createAction = (type, payload) => {
  return {
    type,
    payload,
  };
};
export function useRadio() {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'SET_RADIO':
          return {
            status: action.payload,
          };
          break;
        default:
          return state;
          break;
      }
    },
    {
      status: false,
    },
  );
  const radioAct = useMemo(() => ({
    setRadio: async payload => {
      Store.set('ARDANRADIOPLAYER', payload);
      dispatch(createAction('SET_RADIO', payload));
    },
  }));
  const checkRadio = async () => {
    let radio = await Store.get('ARDANRADIOPLAYER');
    if (radio) {
      dispatch(createAction('SET_RADIO', radio));
    }
  };
  useEffect(() => {
    checkRadio();
  }, []);
  return {radioAct, state};
}
