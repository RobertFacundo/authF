### Authentication WebSite

This project consists of a 

frontend => (https://github.com/RobertFacundo/authF) 

&

backend =>(https://github.com/RobertFacundo/authB) 

working together to provide a secure authentication solution. 

The frontend is deployed on Vercel and the backend on Render and the entire project uses environment variables to configure API URLs and services depending on the development or production environment.

---

## Deployment
-Frontend: Deployed to Vercel via the web interface, communicates with the backend API.

-Backend: Deployed to Render using the VSC CLI, handles authentication and data processing.

## Environment Variables
Set appropriate environment variables for both frontend and backend to define API URLs and other settings based on the deployment environment (development or production).

----

### Frontend

This project is built with React and utilizes React Router to handle the navigation. The application includes a authentication flow, where NavBar component provides links to Dashboard, Login, and Register.

## Dashboard 
The Dashboard serves as the main landing page of the application. It offers an overview of the authentication process and acts as a central point for users after completing certain actions such as email verification. On this page, users can:

- See the status of their account: A green check icon (initially displayed with low opacity) indicates whether the email verification has been successful.

- Review authentication details: The dashboard explains the registration flow, including data validation, the confirmation email process, and the password reset functionality.

- Access key features: It provides clear instructions on how to register with a valid, non-fictitious email address to ensure successful verification, and informs users about the option to reset their password if forgotten.

The dashboard is styled using Styled Components to create a clean and modern interface, using a "card" layout to present all relevant information in an organized manner. This design ensures that both new and returning users have a seamless, professional experience while navigating through the authentication process.

----
Created by Robert Facundo
--