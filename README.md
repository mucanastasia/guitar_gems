# GUITAR GEMS Catalogue project

Hey there, welcome to the **Guitar Gems** project! This web app lets guitar lovers explore, and compare different guitars. I developed it as part of my web development education, primarily to boost my skills and knowledge.

## Demo
Check out the live demo of the project here: [guitar-gems.vercel.app](https://guitar-gems.vercel.app).

<img width="70%" alt="Guitar Gems Catalogue screenshot" src="https://github.com/mucanastasia/mucanastasia/blob/949a757bf41b53da368ad56ccb5abd88b64ababd/50147119-a87714acc37e29d3dc368fa57423156a.png" />

## Table of Contents

- [Demo](#demo)
- [Technology Stack](#technology-stack)
- [About the Project](#about-the-project)
- [Features](#features)
- [Installation](#installation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Feedback and Contact](#feedback-and-contact)

## Technology Stack

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Context-API](https://img.shields.io/badge/Context--Api-000000?style=for-the-badge&logo=react)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)


## About the Project

The project kicked off with a planning phase where I mapped out the design and user flow using Figma[Guitar Gems figma file](https://www.figma.com/design/pOIGMbvhDm5Fr0u32oRnJa/Guitar_Gems?node-id=31-102506&t=HAKZMztejVTvMzPD-1). This step was crucial to clarify the application's structure, minimize future design decisions, and determine which UI components were necessary and reusable.

I went with Supabase for the backend and authentification. The primary table `guitars` was designed to store all relevant information about each guitar and separate tables for brands, types of guitars, materials etc. to handle filters. Also, the Supabase client made it easy to write queries for fetching just the necessary data for a specific page, which was straightforward to read and understand.

The frontend is powered by React, and I used Vite to speed up development. I chose unstyled React Aria components for the UI to keep things flexible and accessible. Data fetching is handled by React Query, which smooths interactions on the site, such as using caching to implement infinite scrolling and scroll restoration.

The code is organized following the Feature-Sliced Design (lightweight version), which was a game-changer recommended by my mentor. This setup, combined with solid coding patterns like Presentational and Container components, along with Composition Components, really helps in keeping the code clean and scalable — super handy as the project grows.

## Features

- **User Roles:**

    - **Non-authenticated users** can browse the guitar catalogue, check out guitar details, and compare guitars.
    - **Authenticated users** get extra perks like adding or removing guitars from their favourites and accessing the 'My Picks'(favourites) page where they can use the comparison feature.
    - **Editors**  can do it all: add, edit, and delete guitars in the catalogue (from the catalogue and the guitar page)

- **Authentication:** <i>SIGN IN</i> or <i>SIGN UP</i> for extra features, with all the security handled by Supabase. 

  **NOTE:** Feel free to use fake emails for signing up; NO emails will be sent.

- **Catalogue page:** 

    - **Infinite scroll:** Just keep scrolling to see more guitars—no need to click through pages.
    - **Scroll restoration:** If you leave a page and come back, it remembers where you were.
    - **Filters and Search in the catalogue:** Easily find guitars by brand, type, or material, you can even combine search and filters. That will help to find the perfect guitar.
    - **Product Card actions:** Authenticated users can add or remove a guitar from their favourites. Editors can also edit or delete a guitar. Non-authenticated users see an "add to favourites" heart but they will be redirected to the sign-in page by clicking on it.
    
- **Product page:** Each guitar has a detailed page with all the info you need with a stunning picture of the guitar and options to add it to your favourites (for authenticated users) or comparison list(they will appear in the Compare Bar at the bottom of the page). And <i>Editors</i> can edit or delete a guitar directly from the product page.

- **My Picks page:** A place for logged-in users to keep tabs on their favourite guitars and easily compare them.

- **Editor-Only Features:**

   - **Adding a new guitar:** Add guitars by filling out a form and uploading a photo.
   - **Editing guitars:** Update guitar details.
   - **Delete guitars:** Remove guitars from the catalogue when they are no longer needed.


- **Responsive Design:** Looks great on both desktop and mobile, ensuring everyone gets a smooth experience.

- **Dark/Light Mode:**  Switch between dark and light mode. The app initially respects your system preferences but you can easily toggle the theme via a header control. Once set, the app remembers your theme preference.

- **BONUS feature: Compare guitars:** 
    - **Compare page:** View side-by-side comparisons of up to three guitars to help make your choice easier.
    - **Compare bar:** A handy tool at the bottom of your screen for managing comparisons. It pops open when you start comparing guitars.

## Installation 

To run the project locally, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/mucanastasia/guitar_gems.git
    ```
2. **Navigate to the project directory:**
    ```bash
    cd guitar_gems
    ```
3. **Install dependencies:**
    ```bash
    npm install
    ```
4. **Start the development server:**
    ```bash
    npm run dev

(Optional) Start the development server with a host exposed for external devices:
    
    npm run dev -- --host

Once the development server is running, you can access the task board application in your browser at `http://localhost:5173/`

## Testing

This project uses Cypress for end-to-end testing.
To run the tests, follow these steps:

**Run all tests in headless mode:**
```bash
npm test
```

**Open the Cypress Test Runner:**
```bash
npm run cy:open  
```

## Deployment

This project uses GitHub Actions to run tests and trigger deployments to Vercel in two environments: Staging (Vercel Preview) and Production.

### Workflow
- **Staging (Vercel Preview):**
    - Deploys automatically on every branch push.
    - Cypress tests run, but deployment proceeds even if tests fail.

- **Production:**
    - Deploys automatically on merges to the `master` branch.
    - Cypress tests must pass for deployment to proceed. Failing tests block the deployment.


## Feedback and Contact

This project is just a showcase of my front-end skills and was made for learning, so I’d love to hear from you! Shoot at [mucanastasia@gmail.com](mailto:mucanastasia@gmail.com) or send me a DM on [Twitter](https://x.com/mucanastasia).

## Thank you

Thanks for checking out my Guitar Gems project! It’s been a fun and challenging ride, and it really shows how much I'm committed to levelling up my frontend skills. Can’t wait to keep learning and growing in the web development world!

Happy coding! 🚀
