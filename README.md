# NX - Book API
This is a work in progress project for the "Web-Engineering 2"-course at the University of Applied Sciences Stralsund. I exclusively used WebStorm for this project, so the HTTP-request tests may not work for other IDEs or text editors.

## Prerequisites
To run this project in its current state, you'd need to:
- have mongodb installed and running on port `27017`

## How to use 
In the current state of the project this steps should be followed:

1) After opening the project for the first time run `pnpm install` to install all the needed dev-dependencies. 
2) Then you should be able to run the backend (frontend currently not implemented) with `nx run backend-express:serve:development`
3) Now you can use the HTTP-request files under `/apps/backend-express/src/books/tests` to test CRUD implementation of the backend
