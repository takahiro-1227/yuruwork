import { TextField, Button } from '@mui/material';
// import { post } from '../api/post';
// require('dotenv').config();

const Dashboard = () => {
  return (
    <>
      <TextField label="タイトル" fullWidth={true} multiline={true}></TextField>
      <TextField label="本文" fullWidth={true} multiline={true} minRows={10}></TextField>
      <TextField label="スラッグ"></TextField>
      <Button>保存</Button>
      {/* <Button onClick={() => post()}>test</Button> */}
    </>
  )
}

export default Dashboard;