import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import User from "@/models/Registration";
import dotenv from "dotenv";

dotenv.config();

interface SendEmailParams {
    email: string;
    emailType: 'VERIFY' | 'RESET' | 'SENDDETAILS';
    userId: string;
}

export async function sendmail({ email, emailType, userId }: SendEmailParams) {
    let details;

    try {
        const hashedId = await bcrypt.hash(userId.toString(), 10);

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: hashedId,
                    verifyTokenExpiry: new Date(Date.now() + 3600000) // 1 hour expiry
                }
            });
        } else if (emailType === 'RESET') {
                await User.findByIdAndUpdate(userId, {
                    $set: {
                        forgetPasswordToken: hashedId,
                        forgetPasswordTokenExpiry: new Date(Date.now() + 3600000) // 1 hour expiry
                    }
                });
            
        } else if (emailType === 'SENDDETAILS') {
            details = await User.findOne({ email });
            if (!details) {
                throw new Error("User details not found for SENDDETAILS email type");
            }
        } else {
            throw new Error("Invalid email type");
        }

        const transport = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        let subject = '';
        let htmlContent = '';

        switch (emailType) {
            case 'VERIFY':
                subject = "Verification Email";
                htmlContent = `<p>Please click the link below to verify your email:</p>
                               <a href="${process.env.SENDURL}/verifyemail?token=${hashedId}">Verify Email</a>
                               <p> or go manually to ${process.env.SENDURL}/verifyemail?token=${hashedId}</p>`;
                break;
            case 'RESET':
                subject = "Reset Your Password";
                htmlContent = `<p>Please click the link below to reset your password:</p>
                               <a href="${process.env.SENDURL}/reset-password?token=${hashedId}">Reset Password</a>`;
                break;
            case 'SENDDETAILS':
                subject = "Your Account Details";
                htmlContent = `<p>Here are your account details:</p>
                               <p>Name: ${details?.name}</p>
                               <p>Email: ${details?.email}</p>`;
                break;
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            html: htmlContent
        };

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;

    } catch (e: any) {
        throw new Error(e.message);
    }
}
