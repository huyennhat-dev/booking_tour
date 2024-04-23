/* eslint-disable react/self-closing-comp */
import { useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Iconify from 'src/components/iconify';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TableContainer from '@mui/material/TableContainer';




// ----------------------------------------------------------------------

export default function UserPage() {
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
        <Typography variant="h4"></Typography>

        <Button variant="contained" color="inherit" onClick={handleOpenDialog} startIcon={<Iconify icon="eva:plus-fill" />}>
          Thêm Hướng dẫn viên
        </Button>

          <Dialog  open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>Thêm Hướng dẫn viên</DialogTitle>
            <DialogContent >
              <Typography variant="body2">Tạo mới một hướng dẫn viên mới cho đoàn</Typography>
              <Typography fullWidth sx={{ width: '400px' }} variant="body2">*sau khi tạo thành công vui lòng thông báo với nhân viên kiểm tra mail để đăng nhập hệ thống</Typography>
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

      <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Số Điện Thoại</TableCell>
              <TableCell>Chức Năng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow >
              <TableCell>Nguyễn Đức Bảo</TableCell>
              <TableCell>nguyenducbao166@gmail.com</TableCell>
              <TableCell>07891662002</TableCell>
              <TableCell>
                <Button onClick={handleOpenEditDialog}>Edit</Button>
                <Button onClick={handleOpenDeleteDialog}>Delete</Button>
              </TableCell>
            </TableRow>
            <TableRow >
              <TableCell>Nguyễn Đức Bảo</TableCell>
              <TableCell>nguyenducbao166@gmail.com</TableCell>
              <TableCell>07891662002</TableCell>
              <TableCell>
                <Button onClick={handleOpenEditDialog}>Edit</Button>
                <Button onClick={handleOpenDeleteDialog}>Delete</Button>
              </TableCell>
            </TableRow>
            <TableRow >
              <TableCell>Nguyễn Đức Bảo</TableCell>
              <TableCell>nguyenducbao166@gmail.com</TableCell>
              <TableCell>07891662002</TableCell>
              <TableCell>
                <Button onClick={handleOpenEditDialog}>Edit</Button>
                <Button onClick={handleOpenDeleteDialog}>Delete</Button>
              </TableCell>
            </TableRow>
            <TableRow >
              <TableCell>Nguyễn Đức Bảo</TableCell>
              <TableCell>nguyenducbao166@gmail.com</TableCell>
              <TableCell>07891662002</TableCell>
              <TableCell>
                <Button onClick={handleOpenEditDialog}>Edit</Button>
                <Button onClick={handleOpenDeleteDialog}>Delete</Button>
              </TableCell>
            </TableRow>
            <TableRow >
              <TableCell>Nguyễn Đức Bảo</TableCell>
              <TableCell>nguyenducbao166@gmail.com</TableCell>
              <TableCell>07891662002</TableCell>
              <TableCell>
                <Button onClick={handleOpenEditDialog}>Edit</Button>
                <Button onClick={handleOpenDeleteDialog}>Delete</Button>
              </TableCell>
            </TableRow>
            <TableRow >
              <TableCell>Nguyễn Đức Bảo</TableCell>
              <TableCell>nguyenducbao166@gmail.com</TableCell>
              <TableCell>07891662002</TableCell>
              <TableCell>
                <Button onClick={handleOpenEditDialog}>Edit</Button>
                <Button onClick={handleOpenDeleteDialog}>Delete</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      </Card>
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
      >
          <DialogTitle>Sửa thông tin</DialogTitle>
          <DialogContent>
            <Typography variant="body2">Thông tin của người dùng</Typography>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Họ và tên"
                defaultValue=""
                sx={{ width: '400px' }}
              />
              <TextField
                fullWidth
                label="Số điện thoại"
                defaultValue=""
                sx={{ width: '400px' }}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
            <Button onClick={() => setOpenEditDialog(false)}>Save</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        >
          <DialogTitle>Xác nhận xóa</DialogTitle>
          <DialogContent>
            <Typography variant="body2">Bạn có chắc chắn muốn xóa?</Typography>
            <Typography variant="body2">(vui lòng xóa staff này ra các tour đang booking trước khi xóa)</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
            <Button onClick={() => setOpenDeleteDialog(false)}>Delete</Button>
          </DialogActions>
        </Dialog>
    </Container>
  );
}
