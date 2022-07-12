
# ChaturMail: AI Email Generator Backend

ChaturMail is a an AI Email Generator application that generates emails based on Subject and Keywords provided by the user.

The application has premade prompts/templates for emails like Request Email, Announcement Email, Intern Application Email, Job Search Email and many more to ease out the process of generation for the user.

The application has tutorials that guide for excellent use of the application.

Users can view their previously generated emails and incase they want to regenerate the same email with some changes then they can do so.

Users can launch their email application which allows them to send them the generated emails hassle free.

Users can also copy the generated email body.

This repo is the backend system written in `NodeJS 16.4.0`


## Branches

There are 3 branches:
 - `master`: The main branch where the stable code resides.This branch is used majorly for deployment.
 - `stage`: The staging branch where all code for testing is pushed
 - `docker`: This branch has `Docker` setup & config used in deployment. Read branch specific `ReadMe` for deployment commands.


## Deployment

Deployment is done on 2 platforms as follows:
1. `Heroku`: There are 2 pipelines watching the `master` and `stage` branches.
2. Custom CI/CD pipeline deployed on private VM.

### Heroku
The `stage` branch is auto deployed on commit by the pipeline. Without any errors a build takes 30 seconds at max to be deployed.  

Any commits to `stage` are shown as ready to be deployed in the production pipeline on herok, however production pipeline is never depployed from heroku on the stage repo.  
It is always from the `master` repo which upon merger from `stage` shows up in heroku pipeline deployment section.

**Known Issues**: Heroku API's are cold started, meaning if API's aren't hit for a while the system is removed from execution and is started again when a request for it arrives. This is handled automatically by heroku.

Due to this initial API call takes upto `8` seconds to respond


### Custom CI/CD
The `docker` branch is being watched by CI/CD using `Kubernetes`.

The connections to the server are reverse proxied via `NGINX` to the appropriate service.

The server has many other applications hosted like my Personal Portfolio, Opencart Ecommerce, MySQL DB Server. All of these deployments are handled by `NGINX`.  

More about `NGINX` further on.
## Caching

`Heroku` deployment is not cached.

Custon deployment is cached using `Redis`.

There is a `Redis` docker container that caches user authentication data.  
Then there are `NodeJS` containers that are connected to it. These containers are load balanced and are scaled automatically by `Kubernetes`.

`Kubernetes` Pods are auto scaled and managed.  

A common database among pods is complicated to setup so each pod has it's own `Redis` container running, this works fine with the current use of the caching needs however might need change in future.


## Load Balancing

There is no Load Balancing on `Heroku`.

On Custom Deployment:  

Initially the Load Balancing was handeled by `NGINX`.

`NGINX` has 2 docker containers listening connected to common caching and primary databases.

Now it's moved to `Kubernetes`.
## Database

Primary database for the application is `MongoDB Atlas`.

There are `staging` and `production` databases.

The `staging` database is in `Mumbai, India` and `production` is in `Frankfurt, Germany`.

`production` DB is in `Europe` for compliance with the European Union (EU) data storage policy.

The production environments from `Heroku` and Custom Deployment use the same database.

Currently I'm exploring `Appwrite` to bring database and authentication at one place and self provided hosting.
## API Flow

**Note**: All API requests are HTTP `POST` requests. More on this further on.

1. Server is listening at port.
2. Requested endpoint by incoming requests is looked up in predefined routes and requested is routed accordingly. This is done automatically by `express`.
3. Endpoint not found is handeled by `express`.
4. The user is first authenticated by `middleware` for every request except for the one that sends `JWT` token.
5. After the user is authenticated, their details are stored in `request.user` object and are used by API's for their purposes.
6. The API code then does it's work and sends response with proper HTTP status code and response body.
7. API response body follows a fixed format as follows:  
`status`: `0`: Failure, `1`: Success -> Indicate success in operation.  
`message`: String message regarding the operation performed.  
`payload`: Is a list `[]` of objects. Any data being sent by the server will be in form of objects in the list. `null` if no payload is returned.  

**Note**: `payload` will never be empty list `[]`, handle it on basis of `null`.

## Authentication

Every request is authenticated.

Authentication is achieved in 2 stages: 
1. `JWT` Token: At the time of login each user is provided with a `JWT` token with 30 days validity. This is received in every request as `Bearer Token` in request headers.
2. Database check: For admin or any other changes, database is checked for every request, however hitting `MongoDB` for every request is not efficient.

To solve this user details are cached in `Redis`.

**Note**: Databse validation is not available on `heroku`.

## Email Generation

The real sauce.

It is done by using OpenAI's GTP3 NLP Processing model.

The model is a paid service and cost is being attempted to be recovered from Ads running in the Flutter app.

I'm exploring migration to Meta (Facebook)'s Open-Pre-Trained Transformer OPT model.

Might have both running in conjunction.
## Directories Explained

`index.js`: Main entry point of application

`Dockerfile`, `docker-compose-yml`: Dockerfiles

`config`: Has configuration files as follows:
 - `db.js`: Connects to `MongoDB`.
 - `openai.js`: Connects to `openai` and exports is object for global use.
 - `redisConfig.js`: Has redis config. Found only in `docker` branch

`middleware`: Has middlewares as follows:
 - `authFunctions.js`: Has user authentication functions.

`models`: Has `MongoDB` models

`prompts`: Has email template/prompts. All prompts are provided by `masterPrompt.js` file as a list of objects.

`routes`: Has API endpoint routes as follows:  
 - `email.js`: Handles main email related endpoints like `generateEmail`, `getGeneratedEmail`, `deleteEmail`
 - `prompt.js`: Handles prompt endpoints :`getPrompts`
 - `tutorial.js`: Handles tutorial endpoints: `getTutorials`
 - `user.js`: Handles user & auth related endpoints: `getUserData`, `getJWTToken`, `deleteUser`
 - `misc.js`: Handles misc endpoints

`tmp`: Has temporary data that dets deleted after usage

`tutorials`: Has tutorials texts and objects.

`utils`: Has utility stuff like constants for API status codes
## Run Locally

`.env` file is needed with following config:

`OPENAI_API_KEY`  
`DB_URI`  
`JWT_KEY`  
`TYPE`  
`PROJECT_ID`  
`PRIVATE_KEY_ID`  
`PRIVATE_KEY`  
`CLIENT_EMAIL`  
`CLIENT_ID`  
`AUTH_URI`  
`TOKEN_URI`  
`AUTH_PROVIDER_X509_CERT_URL`  
`CLIENT_X509_CERT_URL`  
`OS_ENV`  

`.env-docker`:

`OPENAI_API_KEY`  
`DB_URI`  
`JWT_KEY`  
`TYPE`  
`PROJECT_ID`  
`PRIVATE_KEY_ID`  
`PRIVATE_KEY`  
`CLIENT_EMAIL`  
`CLIENT_ID`  
`AUTH_URI`  
`TOKEN_URI`  
`AUTH_PROVIDER_X509_CERT_URL`  
`CLIENT_X509_CERT_URL`  
`REDIS_IP`  
`REDIS_PORT`  

## Docker Run Commands
docker run --name email-generator-node-container --env-file ./.env -p 4545:4545 -v email-generator-node-volume:/email_generator_node --net email-gen-network email-generator-node-image

docker run --name email-generator-node-container --env-file ./.env -p 4545:4545 --net email-gen-network email-generator-node-image

docker run --name email-generator-node-container --env-file ./.env-docker -p 4545:4545 --net email-gen-network email-generator-node-image

docker run -itd --name redis-server -p 6379:6379 --net email-gen-network --ip 172.18.0.2 -v email-generator-redis-volume:/data redis