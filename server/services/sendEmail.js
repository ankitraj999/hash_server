const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const generateOTP = require("./generateOTP");
dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = expressAsyncHandler(async (req, res) => {
 try{
  const { email } = req.body;
  console.log(email);

  const otp = generateOTP();
//   const record={
//     "email":email,
//     "otp":otp
//   }
//   console.log(JSON.stringify({ record }))
  const url='http://localhost:8000/api/customers/otp/'+email;
  console.log(url)
  const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email:email,
        otp:otp
       }),
    });

    if (response.ok) {
        const data = await response.json();
        console.log('Response from the server:', data);
   
        
      } else {
        console.error('Error:', response.statusText);
        
      }
  var mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: "OTP from Security verification",
    text: `Your OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully!");
    }
  });
  res.status(200).json("success");
}catch(error){
    res.status(500).json({message: error.message});
}
});

module.exports = { sendEmail };