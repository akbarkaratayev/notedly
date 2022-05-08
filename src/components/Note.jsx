import React from 'react';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import NoteUser from './NoteUser';
import { IS_LOGGED_IN } from '../gql/query';

const { markdownToTxt } = require('markdown-to-txt');

const StyledNote = styled.article`
  max-width: 800px;
  margin: 0 auto;
  overflow: scroll;

  ${ReactMarkdown} {
    img {
      width: 100%;
    }
  }
`;

const PlainTextWrapper = styled.p`
  word-wrap: break-word;
  word-break: break-all;
`;

const MetaData = styled.div`
  @media (min-width: 500px) {
    display: flex;
    align-items: top;
  }
`;

const MetaInfo = styled.div`
  padding-right: 1em;
`;

const UserActions = styled.div`
  margin-left: auto;
  text-align: right;
`;
const Note = ({ note }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;
  let plain =
    markdownToTxt(note.content).length <= 70
      ? markdownToTxt(note.content)
      : markdownToTxt(note.content).substring(0, 70) + '...';
  return (
    <StyledNote>
      <MetaData>
        <MetaInfo>
          <img
            src={note.author.avatar}
            // alt={`${note.author.username} avatar`}
            height="50px"
          />
        </MetaInfo>
        <MetaInfo>
          <em>
            by <strong>{note.author.username}</strong>
          </em>{' '}
          <br />
          {format(note.createdAt, 'MMM Do YYYY')}
        </MetaInfo>
        {data.isLoggedIn ? (
          <UserActions>
            <NoteUser note={note} />
          </UserActions>
        ) : (
          <UserActions>
            <em>Favorites: </em> {note.favoriteCount}
          </UserActions>
        )}
      </MetaData>
      {window.location.pathname === `/note/${note.id}` ? (
        <ReactMarkdown source={note.content} />
      ) : (
        <p>{plain}</p>
      )}
    </StyledNote>
  );
};

export default Note;
