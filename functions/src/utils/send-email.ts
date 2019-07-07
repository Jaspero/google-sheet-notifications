import * as sgMail from "@sendgrid/mail";
import { readFile } from "fs";
import { compile } from "handlebars";
import { promisify } from "util";
import { ENV_CONFIG } from "../consts/env-config.const";

export async function sendEmail(
  to: string,
  subject: string,
  template: string,
  context: any
) {
  const templateFile = await promisify(readFile)(
    `./email-templates/${template}.hbs`
  );
  const html = compile(templateFile.toString())(context);

  sgMail.setApiKey(ENV_CONFIG.sendgrid.token);

  await sgMail.send({
    to,
    from: ENV_CONFIG.email.from,
    subject,
    text: "Please use an HTML enabled client to view this email.",
    html
  });

  return true;
}
