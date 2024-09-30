# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## install dependencies

```
yarn
or
npm install
```

## run dev local

```
yarn dev
or
npm run dev
```

## build project

```
yarn build
or
npm run build
```

## testing framework

jest

```
yarn test

```

## lint / prettier

eslint, prettier

```
yarn run lint
yarn run lint:fix

```

## pre commit/pre push hooks

[husky](https://typicode.github.io/husky/)

```
yarn run prepare

```

## Packages

- [MUI](https://v5.mui.com/)
- [react-router-dom](https://github.com/remix-run/react-router/tree/main/packages/react-router-dom)
- [react-query](https://tanstack.com/query/latest/docs/framework/react/overview)
- [luxon](https://moment.github.io/luxon/#/)

# Project Structure (primary parts)

```
 📁src
 |_
    📁Components
    |_
        📄Body.tsx
        📄Header.tsx
        ... other core components used across app
    📁context
    |_
        📄messages.tsx
    📁hooks
    |_
        📄useApps.tsx
    📁Layouts
    |_
        📄PageLayout.tsx
        📄ModalLayout.tsx
    📁models
    |_
        Applications.ts
    📁Pages
    |_
        📁Error
        |_
            📄index.tsx
        📁Home
        |_
            📄index.tsx
        📁Timer
        |_
            📄index.tsx
    📄App.tsx
    📄main.tsx
```

## main.tsx

init react and wraps the main app (`App.tsx`) with providers

## App.tsx

Sets up the Router and creates 3 routes to the 3 pages of the app located in the `Pages` directory:

- `Home`,
- `Timer`,
- `Error`

Also wraps all the pages with the `PageLayout` component located in the `Layouts` directory.

# Layouts

## PageLayout

- the page layout component is used to give all the pages a common structure using the `Body.tsx` and `Header.tsx` components located in the `Components/Common` directory
- this is also where global app messages are displayed with MUI snackbar (similar to toast) (`messages` context is where the messages are read from)
- this is also where certain parts like the body/header can be show or hidden based on authenticated states

## ModalLayout

This is used to created a common modal style across the application

# PageLayout components

## Body

- The body component is used to handle showing/hiding the child ReactNode and the global app load spinner based on weather the app is in a loading/fetching state (from the `messages` context).

## Header

- Global app header

# Pages

## Error

generic error page (currently only used to handle 404 errors)

## Timer

Create timer app per spec using the `ModalLayout` layout.

## Home

Since the mock of te timer showed a modal with a close button: I imagined the greater application as a hib with different applications, the timer being one of those applications. In this scenario the homepage is responsible for loading the "Apps" from the server (I am mocking that server call along with the data)

- mock network call using `react-query`

```
hooks/useApps.ts

...

try {
      setPageFetching(true);
      const apps = new Applications(mockData);
      setSuccessMessage("simulate network call");
      //simulate network call
      setTimeout(() => {
        setPageFetching(false);
      }, 1000);
      return apps;
    } catch (e) {
      setPageFetching(false);
      setErrorMessage("Error Fetching Apps");
      throw new Error("Error Fetching Apps");
    }

...

```

- `setPageFetching` is a hook from the `messages` context which toggles showing/hiding the app spinner
- I am returning the following mock data which then gets passed to my model class to create a typed object and to do any transformations before returning via `react-query`

```
data: [
    {
      description: "Timer App",
      long_name: "Timer",
      short_name: "Timer",
    },
    {
      description: "Another App",
      long_name: "This is another app",
      short_name: "another app",
    },
  ],
```

# Models

## baseModel

I am using a base model to extend from, this is where I would define the common schema which the server returns ALL responses, for example everything gets wrapped in a `data` object.

## Applications.ts

This is where I define the types of the object params returned from the "server". I also do transformations like create a color for each app icon and create the route of the app. I added the "Another App" and did not define a route on purpose to demonstrate 404 error handling
