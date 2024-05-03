const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'hoangdz00123@gmail.com',
    pass: 'wxlpewvnqdypysvu'
  }
})

// async..await is not allowed in global scope, must use a wrapper
async function sendMailWithHtml(html, email_customer) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'hoangdz00123@gmail.com', // sender address
    to: email_customer, // list of receiverss
    subject: 'Thông báo', // Subject line
    text: 'Thông Báo', // plain text body
    html: html // html body
  })

  console.log('Message sent: %s', info.messageId)
}

async function sendMailWithPassword(email_customer, password) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'hoangdz00123@gmail.com', // sender address
    to: email_customer, // list of receivers
    subject: 'Mật Khẩu đăng nhập', // Subject line
    text: `Email Đăng nhập ${email_customer} password : ${password} `, // plain text body
    html: `Email Đăng nhập ${email_customer} password : ${password} ` // html body
  })

  console.log('Message sent: %s', info.messageId)
}

const emailService = {
  sendMailWithHtml,
  sendMailWithPassword
}

export default emailService