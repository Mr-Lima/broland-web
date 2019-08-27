import React from 'react';
import { Grid, CardHeader, CardContent } from '@material-ui/core';
import { BrolandName } from 'assets/images';
import { Container, Main, MineBtn, Header, Footer, Status } from './styles';

export default function Mine() {
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
          <MineBtn variant="contained">Start Server</MineBtn>
        </Grid>
      </Main>
      <Footer item md={12} container justify="center">
        <Status>
          <CardHeader title="Server status" />
          <CardContent>
            <p>
              ip: <br />
              port: <br />
            </p>
          </CardContent>
        </Status>
      </Footer>
    </Container>
  );
}
