# Project explaination

This project is regarding ticket booking system of daily shuttles. User can book one way or round trip tickets and add their information and they can also pay online. Once they pay there ticket is confirmed and they receive an invoice on email with the same.

## React (Frontend)
The frontend is build with React.JS and nextjs as framework. So the ticket booking system consists of four steps and the project also contains four folders (Step1, Step2, Step3, and Step4). Each step folder contains code of that particular step. All of the price calculation and step management is done on frontend side only and finally all of the payload is sent to backend.

## Node (Backend)
This is a node js backend with mongodb as its primary database. After frontend creates the payload, the backend receives and generate a booking for the same.

## GraphQL (client)
This graphql client is not related to this project and was a part of different project. In this code, we connect to shopify graphql server and fetch the currently installed shop information.

