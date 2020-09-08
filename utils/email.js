const nodemailer = require("nodemailer");

module.exports = class Email {
  constructor(user, resetToken) {
    console.log(user.user);
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.from = `jhaharsh920@gmail.com`;
    this.resetToken = resetToken;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      // Sendgrid
      return nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(subject, passReset) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: passReset
        ? `Here is your password reset token: ${this.resetToken}. Copy this token and past it in the website form`
        : null,
      html: passReset ? null : { path: `./welcome.html` },
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("Welcome to the TACOS & LOVE Family!");
  }

  async sendPasswordReset() {
    await this.send("Your password reset token", true);
  }
};
