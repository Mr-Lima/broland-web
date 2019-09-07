import React, { useReducer, useEffect, useState } from 'react';
import {
  Grid,
  CardHeader,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { BrolandName } from 'assets/images';
import { getStatus, toggleServer } from 'requests';
import useInterval from 'hooks/useInterval';
import { Container, Main, MineBtn, Header, Footer, Status } from './styles';

const INITIAL_STATE = {
  status: {
    loading: false,
    data: {
      status: 'Unknown',
    },
    error: null,
  },
  toggle: {
    loading: false,
    data: {
      status: 'Unknown',
    },
    error: null,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case '@status/request':
      return {
        ...state,
        status: {
          ...state.status,
          loading: true,
        },
      };
    case '@status/success':
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          data: action.payload,
          error: null,
        },
      };
    case '@status/failure':
      return {
        ...state,
        status: {
          ...state.status,
          loading: false,
          error: action.payload.error,
        },
      };
    case '@toggle/request':
      return {
        ...state,
        toggle: {
          ...state.toggle,
          loading: true,
        },
      };
    case '@toggle/success':
      return {
        ...state,
        toggle: {
          ...state.toggle,
          loading: false,
          data: action.payload,
          error: null,
        },
      };
    case '@toggle/failure':
      return {
        ...state,
        toggle: {
          ...state.toggle,
          loading: false,
          error: action.payload.error,
        },
      };
    default:
      return { ...state };
  }
}

export default function Mine() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [auth, setAuth] = useState({ user: '', password: '' });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let didUnmount = false;

    const fetchData = () => {
      getStatus(dispatch);
    };
    if (!didUnmount) fetchData();
    return () => {
      didUnmount = true;
    };
  }, []);

  useInterval(() => {
    getStatus(dispatch);
  }, 60000);

  async function submit() {
    try {
      await toggleServer(auth.user, auth.password, dispatch);
      setIsOpen(false);
      getStatus(dispatch);
    } catch (err) {
      setIsOpen(true);
    }
  }

  return (
    <Container container justify="center" alignItems="center">
      <Header item md={12} container justify="center" alignItems="center">
        <img src={BrolandName} alt="caller" />
      </Header>
      <Main item md={12} container spacing={0} alignContent="center">
        <Dialog open={isOpen} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Authentication</DialogTitle>
          <form
            onSubmit={evt => {
              evt.preventDefault();
              submit();
            }}
          >
            <DialogContent>
              <TextField
                required
                autoFocus
                margin="dense"
                id="user"
                label="User"
                fullWidth
                value={auth.user}
                onChange={evt => setAuth({ ...auth, user: evt.target.value })}
              />
              <TextField
                required
                margin="dense"
                id="password"
                label="Password"
                type="password"
                fullWidth
                value={auth.password}
                onChange={evt =>
                  setAuth({ ...auth, password: evt.target.value })
                }
              />
              {state.toggle.error ? (
                <span style={{ color: 'red' }}>
                  {state.toggle.error.response.data.error}
                </span>
              ) : (
                ''
              )}
            </DialogContent>
            <DialogActions>
              <Button
                disabled={state.toggle.loading}
                onClick={() => setIsOpen(false)}
                color="secondary"
              >
                Cancel
              </Button>
              {!state.toggle.loading ? (
                <Button type="submit" color="primary">
                  Submit
                </Button>
              ) : (
                <CircularProgress />
              )}
            </DialogActions>
          </form>
        </Dialog>
        <Grid item md={12} container justify="center">
          <MineBtn
            variant="contained"
            onClick={() =>
              window.open(
                'https://furi-mc-server.s3-sa-east-1.amazonaws.com/setup/mods.zip',
                '_blank',
              )
            }
          >
            Download mods
          </MineBtn>
        </Grid>
        <Grid item md={12} container justify="center">
          <MineBtn
            variant="contained"
            disabled={
              state.status.data.status !== 'running' &&
              state.status.data.status !== 'stopped'
            }
            onClick={() => setIsOpen(true)}
          >
            {state.status.data.status === 'running' ? 'Stop' : 'Start'} Server
          </MineBtn>
        </Grid>
      </Main>
      <Footer item md={12} container justify="center">
        <Status>
          <CardHeader title="Server status" />
          <CardContent>
            <p>
              status:{' '}
              {state.status.loading ? 'Loading' : state.status.data.status}
              <br />
              <br />
              ip: {state.status.loading ? 'Loading' : state.status.data.ip}
              <br />
              forge: 14.23.5.2838
            </p>
          </CardContent>
        </Status>
      </Footer>
    </Container>
  );
}
