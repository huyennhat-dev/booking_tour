const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'live.smtp.mailtrap.io',
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: 'api',
    pass: '55a6171208fec0db6dfdfc92a8bb6971'
  }
})

// async..await is not allowed in global scope, must use a wrapper
async function sendMailWithHtml(html , email_customer) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'mailtrap@demomailtrap.com', // sender address
    to: email_customer, // list of receivers
    subject: 'Thông báo', // Subject line
    text: 'Thông Báo', // plain text body
    html: html // html body
  })

  console.log('Message sent: %s', info.messageId)
}

export default sendMailWithHtml