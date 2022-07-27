## Project Name

ant-design Editable Table

## Description

It is an application that provides a table which you can read, add, updated and delete the information.

Data is sortable as ascending and descending.

Application give reaction to adding, deleting and updating information with message bubbles.

Events are searchable throgh search box.

The paginations is enabled.

## Basically Schema

[
{
title: "TITLE",
dataIndex: "title",
sorter: (a, b) => a.title.localeCompare(b.title),
},
{
title: "TYPE",
dataIndex: "type",
sorter: (a, b) => a.type.localeCompare(b.type),
},
{
title: "START DATE",
dataIndex: "startDate",
sorter: (a, b) =>
moment(a.startDate)
.format("YYYY-MM-DD")
.localeCompare(moment(b.startDate).format("YYYY-MM-DD")),
},
{
title: "END DATE",
dataIndex: "endDate",
sorter: (a, b) => a.endDate.localeCompare(b.endDate),
},
{
title: "DESCRIPTION",
dataIndex: "description",
sorter: (a, b) =>
(a.description || "zz").localeCompare(b.description || "zzz"),
},
];

## Data Sample

{
"id": "1",
"title": "Start of the year",
"type": "generic",
"startDate": "2022-01-01",
"endDate": "2022-12-01",
"description": "This is an event about the start of this year"
}

## Libraries that are used in this Project

- Ant-design: https://ant.design/

  -Button: https://ant.design/components/button/ for opening the modal,CREATE call

  -Modal: https://ant.design/components/modal/ inside the modal in order to open a form

  -Table: https://ant.design/components/table/ to show all the data inside a table

  -Form: https://ant.design/components/form

- React-query: https://react-query.tanstack.com/ used to do our API calls with React hooks

- json-server: for full fake REST API(http://localhost:5000)

- ReactJS

![Ekran Alıntısı](https://user-images.githubusercontent.com/93737841/181373811-dce199c6-863c-4d6a-bc52-26b951caeabe.PNG)


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
