import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { posts } from 'src/_mock/blog';

import Iconify from 'src/components/iconify';

import PostCard from '../post-card';
import PostSort from '../post-sort';
import PostSearch from '../post-search';

// ----------------------------------------------------------------------

export default function BlogView() {

  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);


  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Blog</Typography>

        <Button onClick={handleOpenDialog} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Post
        </Button>
        <Dialog  open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>Thêm tour</DialogTitle>
            <DialogContent >
              <Stack  spacing={3} mt={3}>
                <Stack   direction={{ xs: 'column', sm: 'column' }} spacing={2}>
                <TextField fullWidth label="Username" sx={{ width: '400px' }} />
                <TextField fullWidth label="Email" sx={{ width: '400px' }} />
                <TextField fullWidth label="Số điện thoại" sx={{ width: '400px' }} />
                <TextField fullWidth label="Họ và tên" sx={{ width: '400px' }} />
                </Stack>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button onClick={() => setOpenDialog(false)}>Create</Button>
            </DialogActions>
          </Dialog>
      </Stack>

      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
        <PostSearch posts={posts} />
        <PostSort
          options={[
            { value: 'latest', label: 'Latest' },
            { value: 'popular', label: 'Popular' },
            { value: 'oldest', label: 'Oldest' },
          ]}
        />
      </Stack>

      <Grid container spacing={3}>
        {posts.map((post, index) => (
          <PostCard onClick={() => alert("alo")} key={post.id} post={post} index={index} />
        ))}
      </Grid>
      
    </Container>
  );
}
