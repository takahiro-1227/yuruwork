import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { EditArticle } from "../../components/dashboard/EditArticle";
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
// import List from '@editorjs/list';
const List = require('@editorjs/list');

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!, $slug: String!) {
    createPost(title: $title, content: $content, slug: $slug) {
      id
    }
  }
`;

const editor = new EditorJS({
  holder: 'editorjs',
  tools: {
    header: Header,
    list: List
  },
})

const NewArticle = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');

  const [createPost, { loading, error }] = useMutation(CREATE_POST);

  const handleChangeTitle = ({target}: React.ChangeEvent<HTMLInputElement>) => setTitle(target.value);
  const handleChangeContent = ({target}: React.ChangeEvent<HTMLInputElement>) => setContent(target.value);
  const handleChangeSlug = ({target}: React.ChangeEvent<HTMLInputElement>) => setSlug(target.value);
  const savePost = () => {
    createPost({
      variables: {
        title,
        content,
        slug
      }
    })
  }

  if (loading) return <p>loading...</p>;
  if (error) return <p>error</p>;
  
  return (
    <EditArticle title={title} content={content} slug={slug} handleChangeTitle={handleChangeTitle} handleChangeContent={handleChangeContent} handleChangeSlug={handleChangeSlug} savePost={savePost}/>
  )
}

export default NewArticle;