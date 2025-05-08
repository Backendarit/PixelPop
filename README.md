# wfp2025
Web Framework Project

## Pixel Pop

Pixel Pop is a Y2K-inspired web store created as part of a backend development course assignment (Spring 2025). The site features nostalgic visuals and includes dynamic product content, an admin panel, and accessible layout structures.

Live site: [https://pixelpop.azurewebsites.net](https://pixelpop.azurewebsites.net)

## Project Overview

Pixel Pop allows users to browse retro-themed tech items, view product details, and contact the store. Admin users can log in and manage the product catalog via a separate admin interface.

## Figma Layout

UI design and layout planning was done in Figma.  
[View Pixel Pop layout in Figma](https://www.figma.com/design/69GRyqOIXY44lL3cc8al9n/B%C3%A4ckenderit?node-id=0-1)

## Pages

- Home – Welcome page with featured products
- Shop – All products listed
- Contact – A contact form with email functionality
- Admin – Interface to create, update, and delete product data
- Login – Admin login page with authentication and session support
- 404 page - Custom error page for invalid routes

## Tech Details

- Backend: Node.js, Express
- Database: MongoDB Atlas, Mongoose
- Templating: Handlebars (server-side rendering)
- Styling: HTML + CSS (custom, Y2K-inspired)
- Authentication: Passport.js + express-session
- Validation: express-validator
- Version control: Git + GitHub
- Team coordination: Kanban board + daily Scrum notes

## Features

- Dynamic product listing from MongoDB
- Admin panel with product CRUD functionality
- Secure admin login with password hashing and session handling
- Input validation and sanitization with `express-validator`
- Contact form that sends email using Nodemailer
- Retro-styled visual theme using gradients, shadows, and custom fonts
- Keyboard-accessible navigation and skip links
- Screen reader support and proper semantic structure

## Accessibility

Accessibility principles have been considered throughout the design and development of the site.  
Details on heading structure, color contrast, keyboard navigation, and screen reader support can be found in the separate documentation file:

[Accessibility Documentation](./accessibility.md)


## Security and Validation

- Form inputs are validated and sanitized using `express-validator`
- Contact form uses Nodemailer to securely send email messages to the site owner
- Admin login is protected by Passport.js and server-side sessions
- Session cookies are secured using `httpOnly`, `secure`, and `sameSite`

By default, session cookies are configured to be secure, meaning they are only sent over HTTPS connections.

Note for local development:
If you need to test admin login on localhost (which uses HTTP),
you can temporarily disable the secure setting like this:

```js
cookie: {
  secure: false,
  httpOnly: true,
  sameSite: 'strict',
  maxAge: 30 * 60 * 1000
}
```

Remember to switch secure back to true before deployment or submission.

## How to use the project


### 1. Clone the repository

bash

git clone https://github.com/Backendarit/PixelPop.git
cd PixelPop

### 2. Install dependencies

bash

npm install

### 3. Create a .env file in the root folder and add the following:

PORT=3000

DBUSERNAME=yourMongoDBUsername

DBPASSWORD=yourMongoDBPassword

CLUSTER=your-cluster.mongodb.net

DB=webproject25

SESSION_SECRET = "yoursecretkey"

GMAIL_HOST = yourhost.gmail.com

GMAIL_USER = youremail@gmail.com

GMAIL_PASS = yourpassword

### 4. Run the server

bash

npm run dev

## Contributors

Heli Pyykkönen

Maisa Tuomenpuro 

Henna-Riina Anttila 
