export default function generateStrongPassword(length = 8) {
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numericChars = '0123456789'
 

  const allChars = lowercaseChars + uppercaseChars + numericChars 

  let password = ''

  // Chắc chắn ít nhất một ký tự từ mỗi loại được sử dụng
  password += lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)]
  password += uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)]
  password += numericChars[Math.floor(Math.random() * numericChars.length)]

  // Đảm bảo mật khẩu có độ dài mong muốn bằng cách thêm các ký tự ngẫu nhiên
  for (let i = 0; i < length - 4; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)]
  }

  // Trộn các ký tự để tạo ra một mật khẩu ngẫu nhiên
  password = password.split('').sort(() => Math.random() - 0.5).join('')

  return password
}


