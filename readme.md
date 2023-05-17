# kookbooks

A website for managing and sharing cookbooks and recipes.

## Setup

1. Clone repository and cd into it `git clone https://github.com/LegusX/kookbooks.git && cd kookbooks`
2. [Install mongodb](https://www.mongodb.com/try/download/community)
3. Run `npm install` for both frontend and backend
4. Create `.env` file in `backend` and set it up per `backend/.env.template`
   - Authentication isn't yet set up for the database, so don't worry about the username/password variables
5. Start the servers `npm run dev` for both frontend and backend
6. Navigate to `localhost:5173` in your web browser (Or whatever port Vite tells you to use, if that one is already in use)
