
A web site for students to share imagery and emotive sentence (verbatim quotes) they've come across in their reading so as to improve their descriptive writing at schools.

Major features to include:
- authenfication: need register and sign-in  with username and password, a verified user can submit and edit their own quotes 
- mongo data: to store all quotes and users
- Next.js to run the frontend UI as well as the backend server
- Major components/pages:
 -- navigation: logo, title, create-quote button button, sign-in/sign-out button, user profile link
 -- profile page: title, instruction, own quotes listed (in card format)
 -- create quote page: title, instruction, form(including two labels and input fields for quotes and tags respectively), cancel and create buttons
 -- card component: title, user info (image, name), quotes, tags, copy button for the public, user info(image, name), quotes, tags, copy button, edit and delete buttons for logged-in users


//Original Readme file:


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
