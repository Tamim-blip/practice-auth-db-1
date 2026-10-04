import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL!);

const db = client.db("practice-better-auth-db");

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
     requireEmailVerification: true, 
     sendResetPassword : async({user, url, token}, request) =>{

      void resend.emails.send({
        from : 'Acme <onboarding@resend.dev>',
        to : user.email,
        subject: "Reset your password",
        html: `
        <h3>Reset password requesst</h3>
        Click the link to reset your password: ${url}
        <p>Ignore this link if you haven't sent this to reset your password</p>
        `,
      })

     }
  },

  socialProviders: {
    google :{
      clientId : process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret : process.env.BETTER_AUTH_GOOGLE_CLIENT_SICRET as string
    }

  },

  emailVerification :{
    sendVerificationEmail : async ({user, url}) => {

      void resend.emails.send({
        from : 'Acme <onboarding@resend.dev>',
        to : user.email,
        subject: 'Verify your email address',
        html: `Click <a href="${url}">here</a> to verify your email.`,
      
      })
    },
     sendOnSignUp: true,
		autoSignInAfterVerification: true,
		expiresIn: 24*3600 // 1 hour


  },


  database: mongodbAdapter(db, {
    client,
  }),
});