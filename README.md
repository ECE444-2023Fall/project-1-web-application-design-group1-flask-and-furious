# Club Hub

Club Hub seeks to provoide University of Toronto students with convenient access to events on campus. The application is composed of a NextJS frontend and a Flask backend as part of a Software Engineering course (ECE444) taken at the University of Toronto.

[<img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="drawing" height="30"/>][Next-url]
[<img src="https://flask.palletsprojects.com/en/3.0.x/_images/flask-horizontal.png" alt="drawing" height="30"/>][Flask-url]

[Next-url]: https://nextjs.org/
[Flask-url]: https://flask.palletsprojects.com/en/3.0.x/

## Prerequisites

1. Ensure you are using a modern version of Node.js `node -v` should be at least 18.X
2. Install `pnpm` via `npm install -g pnpm`

## Getting Started (make sure youre in the root of the project)

Install required packages with:

```bash
pnpm install
```

Create a Python virtual environment with:

```bash
python3 -m venv venv
```

Activate the virtual environment with:

```bash
Mac/Linux: source venv/bin/activate
Windows: venv\Scripts\activate
```

Install required Python packages with:

```bash
pip install -r api/requirements.txt
```

Setup your env variables:

```bash
cp .env.template .env
```

Fill this with your credentials from [supabase](https://supabase.com/dashboard/project/yqrgbzoauzaaznsztnwb/settings/api) also message @Joshua-Pow for the MapBox token

```bash
source .env
```

Then, run the frontend and backend together with:

```bash
pnpm run dev
```

Or to run just the backend:

```bash
pnpm run flask-dev
```

Or to run just the frontend:

```bash
pnpm run next-dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The Backend runs on [http://localhost:5328/api/](http://localhost:5328/api/)

To see Backend documentation go to [http://localhost:5328](http://localhost:5328)

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Adding Python Packages

To add a Python package you need to make sure to add it to the requirements.txt file

```bash
pip freeze > requirements.txt
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deployment

- App deployment is setup using [Vercel](https://vercel.com/home)
- On merge to main your changes will be automatically deployed to https://club-hub.vercel.app
