# Matrix Traversal

The Matrix Traverser is a web app that solves an algorithmic problem.  A random rectangular matrix of cells with numbers between 0 and 9 is generated.  The problem is solved by calculating the LONGEST path through the matrix that meets the following conditions:

1. The path cannot move to a cell in the matrix that it has already passed through.
2. The path can only move to a cell of equal or greater value than the previous cell in the path.

It is possible to have multiple valid solutions.

## Project Goals

I started this project because it deals with a very interesting problem.  It is a complex problem that can be difficult to compute efficiently.  Devising an algorithm capable of solving this problem was a good way I could challenge myself.

Additionally, this project was a good opportunity to learn more about the following:

### Google Cloud Functions
 
 Google Cloud Functions are a "serverless" product from Google. 
 They are similar to AWS Lamba Functions.  I used this project as an opportunity to test out this new product from Google.

### Complex Data Visualization

I wanted to present the problem and its solutions in an uncomplicated and efficient way.  To achieve this, I needed something that was more sophisticated than a simple table of numbers.  My answer to this problem involves dynamically generated SVGs and CSS animations.

## Technologies Used

### Server Side

As mentioned before, this project relies on Google Cloud Functions.  When the client posts a matrix to an HTTP endpoint, a cloud function is triggered.  This function then calculates the necessary solutions.  Finally, a response containing the computed solutions is sent to the client.

### Client Side

The client was primarily built using the following technologies:

- React
- Redux
- Redux Sagas

React was used for DOM generation and manipulation.  Redux was used to manage the app state.  Asyncronous actions such as user input and HTTP requests were handled through the middleware Redux Sagas.
