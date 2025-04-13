import nodemailer from "nodemailer"


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

/**
 * Sends an email using the configured nodemailer transporter.
 * 
 * @param {string} email - The recipient's email address.
 * @param {string} title - The subject of the email.
 * @param {string} message - The HTML content of the email.
 */
export default async function sendEmail(email,title,message){
    console.log("sending email with user:", process.env.EMAIL_USER ? "****" : "undefined");
    console.log(email,title, message);
    const mailOptions={
        from:`"Teacher_bomba" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: title,
        html: `<p>${message}</p>`
    };
try{
    const info = await transporter.sendMail(mailOptions);
    
    console.log("Email sent successfully: " + info.response);
    } catch(err){
      console.log(`Error sending email to ${email} with title "${title}": ${err.message}`);
    }
    
}
