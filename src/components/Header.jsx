import React from 'react';
import styled from 'styled-components';
import logo from '../img/logo.svg';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Link, withRouter } from 'react-router-dom';
import ButtonAsLink from './ButtonAsLink';
import { IS_LOGGED_IN } from '../gql/query';

const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

const SignOptions = styled(Link)`
  width: 150px;
  padding: 7px 10px;
  text-decoration: none;
  color: #fff !important;
  font-weight: 700;
  background: #5916d6;
`;

const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`;

const UserState = styled.div`
  margin-left: auto;
`;

const Header = props => {
  const { data, client, refetch } = useQuery(IS_LOGGED_IN);
  // const [ logOut, {loading, error} ] = useMutation(LOG_OUT, {
  //   variables: {
  //     email: 'email'
  //   },
  //   refetchQueries: [{ query: IS_LOGGED_IN }],
  //   onCompleted: () => {
  //     localStorage.removeItem('token');
  //     client.resetStore();
  //     client.writeData({ data: { isLoggedIn: false } });
  //     props.history.push('/');
  //     location.reload()
  //   }
  // });
  return (
    <HeaderBar>
      <img src={logo} alt="Notedly Logo" height="40" />
      <LogoText>Notedly</LogoText>
      <UserState>
        {data.isLoggedIn ? (
          <ButtonAsLink
            onClick={() => {
              localStorage.removeItem('token');
              client.writeData({ data: { isLoggedIn: false } });
              props.history.push('/');
              refetch();
            }}
          >
            Log Out
          </ButtonAsLink>
        ) : (
          <p>
            <SignOptions to={'/signin'}>Sign In</SignOptions>{' '}
            <SignOptions to={'/signup'}>Sign Up</SignOptions>
          </p>
        )}
      </UserState>
    </HeaderBar>
  );
};
export default withRouter(Header);
