import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import Note from '../components/Note';
import NoteForm from '../components/NoteForm';
import { GET_NOTE, GET_ME } from '../qql/query';
import { EDIT_NOTE } from '../qql/mutation';
import { Redirect } from 'react-router-dom';

const EditNote = props => {
  const id = props.match.params.id;
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
  const { data: userdata } = useQuery(GET_ME);
  const [editNote] = useMutation(EDIT_NOTE, {
    variables: {
      id
    },
    onCompleted: () => {
      props.history.push(`/note/${id}`);
    }
  });
  if (loading) return 'Loading...';
  if (error) return <p>Error! Note not found</p>;
  if (userdata.me.id !== data.note.author.id) {
    return <p>You do not hava an access to edit this note!</p>;
  }
  return <NoteForm content={data.note.content} action={editNote} />;
};

export default EditNote;
