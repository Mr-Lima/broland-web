import React, { useReducer, useEffect } from 'react';
import { Grid, CardHeader, CardContent } from '@material-ui/core';
import { BrolandName } from 'assets/images';
import { getStatus } from 'requests';
import { Container, Main, MineBtn, Header, Footer, Status } from './styles';

const INITIAL_STATE = {
  status: {
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
          data: action.payload.response,
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
    default:
      return { ...state };
  }
}

export default function Mine() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

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

  return (
    <Container container justify="center" alignItems="center">
      <Header item md={12} container justify="center" alignItems="center">
        <img src={BrolandName} alt="caller" />
      </Header>
      <Main item md={12} container spacing={0} alignContent="center">
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
            disabled={state.status.data.status === 'Unknown'}
          >
            Start Server
          </MineBtn>
        </Grid>
      </Main>
      <Footer item md={12} container justify="center">
        <Status>
          <CardHeader title="Server status" />
          <CardContent>
            <p>
              {state.status.loading ? 'Loading' : state.status.data.status}
              <br />
              ip: <br />
              port: <br />
            </p>
          </CardContent>
        </Status>
      </Footer>
    </Container>
  );
}
