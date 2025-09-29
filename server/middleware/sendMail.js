import {createTransport} from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendMail = async (email, subject , data)=>{


    try {
        const transporter = createTransport({
            host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465
            auth: {
              user: process.env.GMAIL,
              pass: process.env.PASSWORD,
            },
          });
          const htmlFormat = `<!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>OTP Verification</title>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                      margin: 0;
                      padding: 0;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      height: 100vh;
                  }
                  .container {
                      background-color: #fff;
                      padding: 20px;
                      border-radius: 8px;
                      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                      text-align: center;
                  }
                  h1 {
                      color: red;
                  }
                  p {
                      margin-bottom: 20px;
                      color: #666;
                  }
                  .otp {
                      font-size: 36px;
                      color: #7b68ee; /* Purple text */
                      margin-bottom: 30px;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <h1>OTP Verification</h1>
                  <p>Hello ${data.username} your (One-Time Password) for your account verification code is.</p>
                  <p class="otp">${data.otp}</p> 
              </div>
          </body>
          </html>
          `;
          console.log(process.env.GMAIL,process.env.PASSWORD,"CHECK::::::s")

        const info =  await transporter.sendMail({
            from: process.env.GMAIL, // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
          
            html: htmlFormat, // html body
          });

          console.log(info ,"RUBYYYYYY");
          return info;

    } catch (error) {
        console.log(error ,"ERROR OCCUSRS::::::")  
    }
   
     
}



export const sendForgotMail = async (subject, data) => {
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.GMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f3f3f3;
      margin: 0;
      padding: 0;
    }
    .container {
      background-color: #ffffff;
      padding: 20px;
      margin: 20px auto;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      max-width: 600px;
    }
    h1 {
      color: #5a2d82;
    }
    p {
      color: #666666;
    }
    .button {
      display: inline-block;
      padding: 15px 25px;
      margin: 20px 0;
      background-color: #5a2d82;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-size: 16px;
    }
    .footer {
      margin-top: 20px;
      color: #999999;
      text-align: center;
    }
    .footer a {
      color: #5a2d82;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Reset Your Password</h1>
    <p>Hello,</p>
    <p>You have requested to reset your password. Please click the button below to reset your password.</p>
    <a href="${process.env.frontendurl}/reset-password/${data.token}" class="button">Reset Password</a>
    <p>If you did not request this, please ignore this email.</p>
    <div class="footer">
      <p>Thank you,<br>Your Website Team</p>
      <p><a href="https://yourwebsite.com">yourwebsite.com</a></p>
    </div>
  </div>
</body>
</html>
`;

  await transport.sendMail({
    from: process.env.GMAIL,
    to: data.email,
    subject,
    html,
  });
};



export const sendEnquiryMail = async (subject, data) => {
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // required for port 465
    auth: {
      user: process.env.GMAIL, // your institute Gmail (sender)
      pass: process.env.PASSWORD,
    },
  });

  // Build enquiry email template
   const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        font-family: "Segoe UI", Arial, sans-serif;
        background-color: #f4f6f9;
        margin: 0;
        padding: 20px;
      }
      .container {
        max-width: 650px;
        margin: auto;
        background: #ffffff;
        border-radius: 8px;
        padding: 25px 30px;
        border: 1px solid #e0e0e0;
      }
      h2 {
        color: #2c3e50;
        margin-bottom: 15px;
        text-align: center;
      }
      .info {
        margin: 12px 0;
        padding: 12px;
        background: #f9fafb;
        border-left: 4px solid #5a2d82;
        border-radius: 4px;
      }
      .info strong {
        color: #333333;
        display: inline-block;
        width: 120px;
      }
      .message {
        margin-top: 20px;
        padding: 15px;
        background: #fafafa;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 15px;
        color: #444;
        line-height: 1.5;
      }
      .footer {
        margin-top: 30px;
        text-align: center;
        font-size: 13px;
        color: #888;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>📩 New Enquiry from Student</h2>

      <div class="info">
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phoneNumber || "N/A"}</p>
      </div>

      <div class="message">
        <strong>Message:</strong><br/>
        ${data.message}
      </div>

      <div class="footer">
        <p>This enquiry was submitted through the Institute’s Enquiry Form.</p>
      </div>
    </div>
  </body>
  </html>
  `;

  await transport.sendMail({
    from: `"${data.name}" <${process.env.GMAIL}>`, 
    // "from" must still be your authenticated Gmail (not student mail),
    // but you can display student's name
    replyTo: data.email, // ensures institute can reply directly to student
    to: process.env.GMAIL, // your institute’s email address
    subject: subject || "New Student Enquiry",
    html,
  });
};