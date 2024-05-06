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
  const htmlMail = `
  <div
  style="
    width: 100%;
    display: flex;
    justify-content: center;
    "
  >
  <table
    border="0"
    cellspacing="0"
    cellpadding="0"
    style="padding-bottom: 20px; max-width: 516px; min-width: 220px;margin: auto;"
  >
    <tbody>
      <tr>
        <td width="8" style="width: 8px"></td>
        <td>
          <div
            style="
              border-style: solid;
              border-width: thin;
              border-color: #dadce0;
              border-radius: 8px;
              padding: 40px 20px;
            "
            align="center"
            class="m_-8637567960615630360mdv2rw"
          >
           <div
           style="
                font-family: 'Google Sans', Roboto, RobotoDraft, Helvetica, Arial,
                  sans-serif;
                  font-size: 40px;
                  font-weight: 900;
                color: #FF6C37;
                line-height: 32px;
                padding-bottom: 24px;
                text-align: center;
                word-break: break-word;
              "
           >TourZ</div>
            <div
              style="
                font-family: 'Google Sans', Roboto, RobotoDraft, Helvetica, Arial,
                  sans-serif;
                border-bottom: thin solid #dadce0;
                color: rgba(0, 0, 0, 0.87);
                line-height: 32px;
                padding-bottom: 24px;
                text-align: center;
                word-break: break-word;
              "
            >
              <div style="font-size: 24px">Xác nhận mật khẩu của bạn!</div>
            </div>
            <div
              style="
                font-family: Roboto-Regular, Helvetica, Arial, sans-serif;
                font-size: 14px;
                color: rgba(0, 0, 0, 0.87);
                line-height: 20px;
                padding-top: 20px;
                text-align: left;
              "
            >
              Mật khẩu cho tài khoản quản trị 
              <a style="font-weight: bold">${email_customer}</a> trên TourZ của bạn là:
             <br />
              <div
                style="
                  text-align: center;
                  font-size: 36px;
                  margin-top: 20px;
                  line-height: 44px;
                "
              >
                ${password}
              </div>
            <br />Nếu không nhận ra <a style="font-weight: bold">${email_customer}</a>,
              bạn có thể bỏ qua email này.
            </div>
          </div>

        </td>
        <td width="8" style="width: 8px"></td>
      </tr>
    </tbody>
  </table>
  </div>
  `
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'hoangdz00123@gmail.com', // sender address
    to: email_customer,
    subject: 'Mật Khẩu đăng nhập Tourz', // Subject line
    html: htmlMail
  })

  console.log('Message sent: %s', info.messageId)
}

const emailService = {
  sendMailWithHtml,
  sendMailWithPassword
}

export default emailService
