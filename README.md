# quizApp

##### Basic Setup

# install angular

sudo npm install -g @angular/cli

# create app (including angular routing)

ng new BookStore --routing=true --skip-tests=true --style=css --skip-git=true

# install packages for frontend

cd client
npm install bootstrap @fortawesome/fontawesome-free jquery popper.js --save
npm install @types/jquery @types/bootstrap --save-dev

# config angular.json for bootstrap and font-awsome

"./node_modules/bootstrap/dist/css/bootstrap.min.css",
"./node_modules/@fortawesome/fontawesome-free/css/all.min.css",
"src/Content/styles.css"

# add Content and Scripts folders

    # add app.ts

# add sript path to config angular.json

"node_modules/jquery/dist/jquery.min.js",
"node_modules/bootstrap/dist/js/bootstrap.min.js",
"src/Scripts/app.js"

###########################

# run app server

ng serve --open

# generate a component

ng generate component partials/Header

######## mock server setup ##########

# install mock server

npm install json-server --save-dev

# install jsonwebtoken

npm install jsonwebtoken --save-dev

### Basic Git Operation

Check git status

> git status

stages changes

> git add .

commit changes

> git commit -m "whatever"

pull code from github

> git pull <github repo url> <branch name>

    eg:
        > git pull origin master

push code to github

> git push <github repo url> <branch name>

## How to create a git branch

- list all branch

  > git branch
  > (the one with a \* is the current branch)

- check out the master and pull code from origin

  > git checkout master
  > git pull origin master

- create a new branch from the master branch
  > git checkout -b frontendInit

## local commiting new branch and push code to github

> git add .
> git commit -m "what ever message"
> ig <new branch name>

## send pull request

PERFORMING IN GITHUB ui

## build the angular app

> cd client
> ng build ( ./client/dis folder willl be created)
> swa deploy ./client --env production

##### Dockerization exmaple

https://medium.com/bb-tutorials-and-thoughts/how-to-dockerize-mean-stack-522796563573

#### Basic docker command

list images

> docker images

List all the containers

> docker container ls -a

check for runnng container

> docker ps

restart an exited container

> docker restart <container name>

Stop a docker container process

> docker stop <container name>

Remove a docker container by name

> docker stop <container name>

Delete a docker contain by name

> docker rm <container name>

build image according to a Dockerfile (at the path where Dockerfile is located)

> docker build -t project-image .

Run an image with a designated name

> docker run -d -p 3080:80 --name <process name> <image name>

    eg. docker run -d -p 3080:80 --name project-run-v3 project-image

Execute Command inside a running container

> sudo docker exec -it <container name> ls

    e.g sudo docker exec -it project-run-v6 ls

Using the container bash shell

> sudo docker exec -it <container name> /bin/sh

Taking the container log

> sudo docker container logs <container name>

Delete all the stopped containers

> docker container prune -f

Delete all the dangling images

> docker image prune -a

# Remove everything (containers, images, networks, volumes)

> docker system prune -a -f --volumes

##################################

deploy to docker image to azure

<!-- az acr build --image project/web-app:v2 --registry liangfuski . -->

az acr build --image project-image --registry liangfuski .

login azure acr
sudo az acr login -n liangfusi

pull the image from repository
docker pull liangfuski.azurecr.io/project/web-app:v2

enable admin
az acr update -n lianbfusi --admin-enabled true

#######################################
How to start servers locally

start backend server

> cd backend
> npm install <---- (for the first time only)
> npm run start

start frondend (Angular) server

> cd frontend
> npm install <------ (for the first time only)
> npm run start

#Terraform

> terraform apply -var-file="variables.tfvars
