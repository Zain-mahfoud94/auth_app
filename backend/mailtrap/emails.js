import { mailtrapClient, sender } from "../mailtrap/mailtrap.config.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "../mailtrap/emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log("Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending verification`, error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "9cef8f99-09b5-40ab-a323-f8a364306e98",
      template_variables: {
        name: name,
        company_info_name: "Auth APP",
        company_info_address: "Mönchebergstr. 48",
        company_info_city: "Kassel",
        company_info_zip_code: "34125",
        company_info_country: "Germany",
      },
    });
    console.log("Welcome Email sent succfully", response);
  } catch (error) {
    console.error(`Error sending welcome Email`, error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendForgetPasswordEmail = async (email, resetURL) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
    console.log("Email sent successfully", response);
  } catch (error) {
    console.error(`Error sending verification`, error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset Successfully",
    });
    console.log("Password Reset Email sent succfully", response);
  } catch (error) {
    console.error(`Error sending Password Reset Email`, error);
    throw new Error(`Error sending Password Reset Email: ${error}`);
  }
};
