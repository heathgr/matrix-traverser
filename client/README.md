# Running a Local Development Server

To run a local development environment follow these steps:

- Make sure the Google Cloud Function Emulator is running.  In the terminal, run the following command `functions start`.  You should see a list of all the running cloud functions.  One of them should be named "matrixTraversalSolver" and its status should be "READY".  If this is not the case, consult the README.md file in the project's /functions/
- While still in the terminal, start Webpack by typing `npm start`.  This will start a Webpack dev server on port 3000.
- If you want to use the VS Code debugging tools, it is necessary to run a special instance of Chrome.  In the terminal, run this command `npm run chrome`.

# Testing and Linting

Unit tests can be run by using the following command `npm test`.

ESLint can be run on the project using this command `npm run lint`.

If you want to run ESLint and unit tests with one command, use the following `npm run checkup`.

# Deploying

A build and deploy can be run using the following command `npm run deploy`.

If this process fails, it is usually for one of the following reasons:

- The project has ESLint errors.  If there are any linting errors the build is aborted.
- The project has failing unit tests.  As with linting errors, the build is aborted if any tests fail.
- You aren't authenticated with the Google Cloud CLI.  If this is the case run `gcloud auth login`.
