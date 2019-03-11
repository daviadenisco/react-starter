This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

## Common Scripts

### `npm run start:dev:hot`

Runs the app in the development mode based on PORT environment variable.<br>
PORT defaults to 3001<br>
Open [http://localhost:PORT](http://localhost:PORT) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run start:prod:local`

Runs the app in the production mode based on PORT environment variable.<br>

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
The production build is transferred to `server/` that can be deployed to the Cloud.<br>
PORT defaults to 5000<br>

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

Open [http://localhost:PORT](http://localhost:PORT) to view it in the browser.

### `npm run test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run lint`

Will run ESLint and Prettier. The `.eslintrc.yml` and `.prettierrc` files contain the style rules.

### `npm run lint:fix`

Will fix any linting warnings/errors it can automatically.

## Serve the app locally

#### `npm run build`

Will compile the React app and output build artifacts to the `build/` directory.

#### `node server/`

Will start the server and serve the React app from the `build/` directory.

## Run the app as a Docker container

#### `docker build -t <IMAGE_NAME> ./`

Will build the Docker image specified in the `Dockerfile`. Uses [Phusion Base Image](https://github.com/phusion/baseimage-docker) as the base image.

#### `docker run -p 5000:5000 <IMAGE_NAME>`

Will run your docker image, mapping local port 5000 to the exposed container port 5000.

## Other Commands

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
