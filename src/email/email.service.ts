import * as SibApiV3Sdk from '@getbrevo/brevo';
import AppError from '../utils/appError';
import { EmailTemplate } from '../domain/email';

export class EmailService {
  public static async sendEmail(
    subject: string,
    template: EmailTemplate,
    to: string | string[],
    params: Record<string, string>,
  ) {
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    if (!process.env.BREVO_API_KEY) {
      throw new AppError(
        'Failed to send email because the BREVO_API_KEY is not provided',
        500,
      );
    }

    apiInstance.setApiKey(
      SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY,
    );

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.to = Array.isArray(to)
      ? to.map((email) => ({ email: email }))
      : [
          {
            email: to,
          },
        ];

    sendSmtpEmail.templateId = this.getBrevoTemplateId(template);
    sendSmtpEmail.subject = subject.trim();
    sendSmtpEmail.params = { ...params };

    const messageId = await apiInstance
      .sendTransacEmail(sendSmtpEmail)
      .then((data) => {
        return data.body.messageId;
      });

    return messageId;
  }

  //   Value from Brevo dashBoard
  public static getBrevoTemplateId(emailTemplate: EmailTemplate) {
    if (emailTemplate === EmailTemplate.PASSWORD_RESET) {
      return 1;
    }
  }
}
