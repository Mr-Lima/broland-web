import api from 'services/api';

export async function getStatus(dispatch = null) {
  try {
    if (dispatch) dispatch({ type: '@status/request' });

    const res = await api.get('/server/status');

    if (dispatch) {
      dispatch({
        type: '@status/success',
        payload: { response: res },
      });
      return res;
    }
    return res;
  } catch (e) {
    if (dispatch) {
      dispatch({
        type: '@status/failure',
        payload: { error: e },
      });
      return e;
    }
    return e;
  }
}
