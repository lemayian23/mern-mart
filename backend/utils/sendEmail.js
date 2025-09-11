const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

const sendWelcomeEmail = async (email, name) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to MERN Mart!',
      html: `
        <h2>Welcome to MERN Mart, ${name}!</h2>
        <p>Thank you for registering with us. We're excited to have you on board.</p>
        <p>Start shopping now and discover amazing products!</p>
        <br>
        <p>Best regards,<br>The MERN Mart Team</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent to:', email);
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
};

const sendOrderConfirmation = async (email, name, orderDetails) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your Order Confirmation - MERN Mart',
      html: `
        <h2>Thank you for your order, ${name}!</h2>
        <p>Order ID: ${orderDetails.orderId}</p>
        <p>Total Amount: $${orderDetails.total}</p>
        <p>We'll notify you when your order ships.</p>
        <br>
        <p>Best regards,<br>The MERN Mart Team</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent to:', email);
  } catch (error) {
    console.error('Error sending order confirmation:', error);
  }
};

module.exports = {
  sendWelcomeEmail,
  sendOrderConfirmation
};