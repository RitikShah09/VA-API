const nodemailer = require("nodemailer");
const ErrorHandler = require("./errorHandler");

exports.sendMail = (req, res, next, html ,subject ) => {
    const transport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    const mailoptions = {
      from: "Vaidik Anushthanam",
      to: process.env.RECIEVER_EMAIL,
      subject: subject,
      text: subject,
      html: html,
    };
    transport.sendMail(mailoptions, (err, info) => {
          console.log(err);
          if (err) {
            return next(new ErrorHandler(err, 500));
          }
        console.log(info);
        return res.status(200).json({
            message: "Mail Sent Successfully",
            url
        })
    });
};