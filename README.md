# GUITAR GEMS Catalogue project

Welcome to the **Guitar Gems** project! This is a web application created to help guitar enthusiasts explore, compare, and discover various guitar models. The application was developed as part of my education in web development and its primary purpose was to enhance my skills and knowledge.

Check out the live demo of the project here: [guitar-gems.vercel.app](https://guitar-gems.vercel.app).

<img width="70%" alt="Guitar Gems Catalogue screenshot" src="https://awesomescreenshot.s3.amazonaws.com/image/1650869/50147119-a87714acc37e29d3dc368fa57423156a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJSCJQ2NM3XLFPVKA%2F20240821%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240821T095245Z&X-Amz-Expires=28800&X-Amz-SignedHeaders=host&X-Amz-Signature=30eb642b341fa75f5558ca3fea903e8fa886774b376dc87a1c4e2ba9add607a7" />

## Table of Contents

- [Technology Stack](#technology-stack)
- [About the Project](#about-the-project)
- [Features](#features)
- [Installation](#installation)
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

The project began with careful planning of content and design, where I used Figma [Guitar Gems figma file](https://www.figma.com/design/pOIGMbvhDm5Fr0u32oRnJa/Guitar_Gems?node-id=31-102506&t=HAKZMztejVTvMzPD-1) to conceptualize the layout, user flow, and overall aesthetic of the application. This initial phase helped establish a clear vision and ensured a user-friendly interface.

For the backend and authentication, I chose Supabase, a powerful and scalable solution that integrates seamlessly with modern frontend frameworks. In Supabase, I designed a primary table to store all relevant information about each guitar, such as description, specifications and guitar features . Additionally, I created separate tables for brands, types of guitars, materials, and other information needed for filters. These tables are interconnected with the main guitar table through foreign keys, allowing for efficient data management and retrieval based on specific criteria (Like fetching only essential columns from the table that needed to be display on a particular page).

The frontend of the application was built using React, with Vite serving as the build tool to streamline development. For the UI components, I opted for unstyled React Aria components, which allowed for maximum flexibility in design while ensuring accessibility standards. Data fetching was handled using React Query, which provided a robust solution for managing data and caching. This approach allowed for the implementation of infinite scroll with scroll restoration.

To organize the codebase effectively, I implemented a lightweight version of the Feature-Sliced Design approach (with a huge help from my mentor). This methodology helped maintain a modular and scalable structure, making it easier to manage and extend the project as it grew. Additionally, I adhered to best practices by incorporating the Presentational and Container pattern, Composition Components pattern, all of which contributed to a clean and maintainable codebase.

## Features

- **User Roles:** Guitar Gems supports three distinct user roles:

    - **Non-authenticated users** can explore the guitar catalog, view detailed product pages, and add guitars to a comparison list and compare them.
    - **Authenticated users** have additional features, including the ability to add or remove guitars from their favorites (My Picks) and access a dedicated My Picks page where they can use the comparison feature.
    - **Editors** have full access to all features, including the ability to add new guitars to the catalog, edit existing entries, and delete guitars.

- **Authentication:** Users can <i>SIGN IN</i> or <i>SIGN UP</i> to access additional features, with secure authentication managed by Supabase. 

  **NOTE:** You can use fake emails for registration, you will NOT receive any emails from the app.

- **Catalogue page:** 

    - **Pagination with infinite scroll:** The catalogue page implements infinite scroll, allowing users to continuously browse through the guitar listings without needing to manually click through pages.
    - **Scroll restoration:** As users scroll, more guitars are loaded seamlessly, enhancing the browsing experience. Additionally, if a user navigates to a product page (or an editor clicks edit from the catalogue) and then returns, the page restores the previous scroll position, ensuring a smooth and intuitive user experience.
    - **Filters and Search in the catalogue:** Users can filter the catalogue by various criteria such as brand, type, and material, or use the search function to quickly find specific guitars. These tools make it easier to narrow down the options and find the perfect guitar.
    - **Product Card actions:** Authenticated users can add or remove a guitar from their favorites. Editors can also edit or delete a guitar. A non-authenticated users see an "add to favourites" heart but they will be redirected to sign in page by clicking on it.
    
- **Product page:** Each guitar in the catalogue has its own detailed product page, where users can view comprehensive information about the model with a stunning picture of the guitar. The product page also provides options for adding the guitar to the comparison list (they will appear in the Compare Bar at the bottom of the page) or to favorites for authenticated users.

- **My Picks page:** This page is exclusive to authenticated users, allowing them to view and manage their favorite guitars. Users can add guitars from the My Picks page to the comparison tool, making it easier to evaluate their top choices.

- **(Only for Editor role) Adding a new guitar:** Editors have the ability to add new guitars to the catalogue through a dedicated form and uploading a picture of a guitar.

- **(Only for Editor role) Editing guitars:** Editors can modify existing guitar entries to correct information or update specifications.

- **(Only for Editor role) Delete guitars:** Editors can remove guitars from the catalogue when they are no longer relevant.


- **Dark/Light Mode:** The application supports both dark and light themes. It initially respects the user's system preferences but also allows users to toggle the theme via a header control. Once set, the app remembers the user's theme preference.

- **Responsive Design:** Guitar Gems is fully responsive, offering an optimized experience across desktops, mobiles, and other screen sizes. The responsive design ensures that the application is accessible and functional on a wide range of devices.

- **BONUS feature: Compare guitars:** 
    - **Compare page:** The compare page displays detailed side-by-side comparisons of selected guitars (Max 3 guitars). This tool helps users make informed decisions by providing a clear overview of how each guitar stacks up against others.
    - **Compare bar:** The compare bar is a persistent feature that appears at the bottom of the screen, allowing users to quickly access and manage their comparison list as they browse the application. It provides an easy way to remove guitars and navigate to the full comparison page. The compare bar is closed by default (you will only see a small button with a compare arrows icon) but when you add a guitar to the empty comparison list, the bar will open to provide a little feedback to the action.

## Instalation 

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

or if you need to expose host for external devices:
    
    ```bash
    npm run dev -- --host

Once the development server is running, you can access the task board application in your browser at `http://localhost:5173/`

## Feedback and Contact

This project was developed for educational purposes and to demonstrate my front-end development skills. If you have any suggestions or feedback, please feel free to contact me via email at [mucanastasia@gmail.com](mailto:mucanastasia@gmail.com).

## Thank you

Thank you for taking the time to explore my Guitar Gems project.
This journey into front-end development has been both challenging and rewarding, and this project reflects my continuous dedication to honing my skills. I'm looking forward to continuing to learn and grow in the world of web development.

Happy coding! 🚀
