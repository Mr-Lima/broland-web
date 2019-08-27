import styled from 'styled-components';
import { Grid, Button, Card } from '@material-ui/core';
import { DirtBackground, MineBtnBackground } from 'assets/images';

export const Container = styled(Grid)`
  && {
    height: 100vh;
    background: url(${DirtBackground});
  }
`;

export const Header = styled(Grid)`
  && {
    height: 20%;
  }
`;

export const Main = styled(Grid)`
  && {
    height: 50%;
  }
`;
export const Footer = styled(Grid)`
  && {
    height: 30%;
  }
`;

export const Status = styled(Card)`
  && {
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

export const MineBtn = styled(Button)`
  && {
    text-transform: capitalize;
    font-size: 130%;
    font-weight: 300;
    color: #fff;
    background-image: url(${MineBtnBackground});
    background-size: 100% 100%;
    min-width: 20%;
    min-height: 50px;
  }
`;
