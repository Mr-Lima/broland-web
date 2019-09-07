import api from 'services/api';

export async function getStatus(dispatch = null) {
  try {
    if (dispatch) dispatch({ type: '@status/request' });

    const res = await api.get('/server/status');

    if (dispatch) {
      dispatch({
        type: '@status/success',
        payload: res.data,
      });
      return res.data;
    }
    return res.data;
  } catch (e) {
    if (dispatch) {
      dispatch({
        type: '@status/failure',
        payload: { error: e },
      });
      throw e;
    }
    throw e;
  }
}

export async function toggleServer(user, password, dispatch = null) {
  try {
    if (dispatch) dispatch({ type: '@toggle/request' });

    const res = await api.post('/server/toggle', { user, password });

    if (dispatch) {
      dispatch({
        type: '@toggle/success',
        payload: res.data,
      });
      return res.data;
    }
    return res.data;
  } catch (e) {
    if (dispatch) {
      dispatch({
        type: '@toggle/failure',
        payload: { error: e },
      });
      throw e;
    }
    throw e;
  }
}
