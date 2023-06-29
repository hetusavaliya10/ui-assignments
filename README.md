# ui-assignments

# Pet Store React App

This project is a Single Page Application (SPA) built using React and Vite, and it integrates with the Pet Store API. It allows users to view, add, edit, and delete pet information, as well as perform login and logout operations. The landing page displays pets based on their status, and sorting and filtering options are available. Additionally, if the user is idle for 2 minutes, they will be automatically logged out.

## Getting Started

## Version

This project was built with the following versions of Node and npm:

- Node 16.13.0
- npm 8.1.0

## Installation

Follow the instructions below to set up and run the project locally:

1. Clone the repository:

```
git clone https://github.com/hetusavaliya10/ui-assignments.git
```

2. Navigate to the project directory:

```
cd ui-assignments
```

3. Install the dependencies:

```
yarn install
```

## Technologies Used

The following technologies were used to build this project:

- [React](https://reactjs.org/): A JavaScript library for building user interfaces.

- [Vite](https://vitejs.dev/): A build tool that focuses on speed and simplicity.

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript): The programming language used to build the application's logic.

- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML): The markup language used to build the application's UI.

- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS): The style sheet language used to style the application's UI.

- [Sass](https://sass-lang.com/): A CSS preprocessor that enables the use of variables, mixins, and more.

## Libraries Used

- axios: Version 1.4.0. A popular HTTP client library for making API requests.

- jotai: Version 2.2.1. A simple and scalable state management library for React applications.

- react: Version 18.2.0. A JavaScript library for building user interfaces.

- react-cookie: Version 4.1.1. A library for handling cookies in React applications.

- react-dom: Version 18.2.0. A package that provides DOM-specific methods for React components.

- react-hot-toast: Version 2.4.1. A lightweight toast notification library for React applications.

- react-router-dom: Version 6.6.1. A routing library for React applications.

- sass: Version 1.32.5. A CSS preprocessor that enables the use of variables, mixins, and more.

- sass-lint: Version 1.7.0. A linter for Sass/SCSS stylesheets.

- react-loading-skeleton: Version 3.3.1. A library that provides an easy way to create skeleton loading screens for React applications.

## Configuration

Before running the application, you need to configure the API endpoint. Follow the steps below:

1. Open the .env file in the project root directory.
2. Replace the value of the VITE_API_URL variable with the desired Pet Store API URL. For example:

```
VITE_APP_API=https://petstore.swagger.io/v2/
```

3. Save the file.

## Usage

To start the application, run the following command:

```
yarn dev
```

This will launch the development server and open the application in your default browser. If it doesn't open automatically, you can visit http://localhost:3000 in your browser.

## Features

This Pet Store React app includes the following features:

- Viewing Pets: The landing page displays pets based on their status, allowing users to see available pets, sold pets, and pending pets.

- Adding Pets: Users can add new pets to the store by providing information such as pet name, category, and image upload.

- Editing Pets: Users can edit the information of existing pets, including their name, category, and image.

- Deleting Pets: Users have the ability to delete pets from the store.

- Login and Logout: The application supports login and logout functionality for users. Users can log in to perform operations, and they will be automatically logged out if they are idle for 2 minutes.

- Searching: The application allows users to search for specific pets by their name or category. The search feature enables users to quickly find pets of interest based on their search query.

### Building for Production

To build the application for production, run the following command:

```
yarn build
```

This will create an optimized and minified version of the application in the dist directory.

You can then deploy the contents of the dist directory to a static file server or a hosting service of your choice.

## Notes

- This project integrates with the Pet Store API, specifically the [Swagger Petstore](https://petstore.swagger.io) API. You are free to use any endpoints provided by this API.
- Feel free to customize the application's UI, styles, and components as per your preferences and requirements.

That's it! You should now have the Pet Store React app with Vite up and running locally.

Have fun building your pet store and happy coding!
