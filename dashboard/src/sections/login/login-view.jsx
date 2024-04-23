import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';


export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();

  // fetch data
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = async () => {
    try {
      setIsLoading(true);
  
      const response = await fetch('http://localhost:8000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email, // Thay userEmail bằng biến chứa email từ form
          password, // Thay userPassword bằng biến chứa password từ form
        }),
      });
  
      if (!response.ok) {
        throw new Error('Invalid email or password');
      }
      
      // Lấy token từ response
      const { jwt } = await response.json();

      alert(jwt);
  
      // Lưu token vào localStorage hoặc có thể lưu vào state nếu cần
      localStorage.setItem('token', jwt);
  
      setIsLoading(false);
  
      // Chuyển hướng đến trang blog sau khi đăng nhập thành công
      router.push('/blog');
    } catch (e) {
      setError('Đăng nhập thất bại');
      setIsLoading(false);
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField onChange={(e) => {
          setEmail(e.target.value);
          setError(null);
        }} value={email} name="email" label="Địa chỉ email" />

        <TextField
          value={password}
          name="Mật khẩu"
          onChange={(e) => {
            setPassword(e.target.value);
            setError(null);
          
          }}
          label="Mật khẩu"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {/* show error color red and center element */}
      {error && (
        <Typography variant="body2" sx={{ color: 'error.main', textAlign: 'center', mt: 2 }}>
          {error}
        </Typography>
      )}
      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Quên mật khẩu?
        </Link>
      </Stack>

      <LoadingButton
        disabled={isLoading}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Đăng nhập trang quản lý</Typography>
          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            nếu chưa có tài khoản vui lòng liên hệ ban quản lý
            <br/>
            <Link variant="subtitle2" sx={{ ml: 0.5 }}>
              07891662002
            </Link>
          </Typography>
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
