My preferred monorepo-setup for SaaS projects.

## Stack

| Technology   | Category           |
|--------------|--------------------|
| Next.js      | Frontend Framework |
| Tailwind CSS | CSS Framework      |
| Shadcn       | Component Library  |
| better-auth  | Authentication     |
| urql         | GraphQL Client     |
| GraphQL      | API                |
| Nest.js      | Backend Framework  |
| Drizzle      | ORM                |
| Kysely       | Query Builder      |
| PostgreSQL   | Database           |
| Nx           | Build System       |
| Playwright   | Testing            |
| Docker       | Containers         |
| redis        | Queue              |
| MailHog      | Email testing      |
| Stripe       | Payment gateway    |

## Features

- Setup of all technologies mentioned above
- Full email authentication flow, 2FA
- CI/CD, pipeline and deployment setup
- GraphQL and REST API setup
- Translations
- HTTPS for local development

## Development

### Getting started

- `npm i`
- Copy `.env.example` to `.env` and adjust to your needs.
- `docker compose up -d db queue mailhog`
- `npm run dev`

### Renaming

To make the project yours, find and replace the following strings:

| String           | Meaning                                 | Example                                  |
|------------------|-----------------------------------------|------------------------------------------|
| `saas-starter`   | kebab-case name of the project          | `my-app`, `good-tea`                     |
| `SAAS STARTER`   | Name of the project, product or company | `My App`, `Good Tea Inc.`                |
| `hello@saas.com` | "From" Email for outgoing email         | `noreply@my-app.com`, `shop@goodtea.com` |


### HTTPS for localhost

Working with https on localhost requires some additional setup:

#### MacOS

1. Create a `certificates` folder under `apps/api/`.
2. Install [mkcert](https://www.npmjs.com/package/mkcert) and run `mkcert -install`
3. Use mkcert to generate the certificates:

```
mkcert -key-file ./apps/api/certificates/key.pem -cert-file ./apps/api/certificates/cert.pem localhost
```
4. Copy the CA certificate of mkcert to `./apps/api/certificates/rootCA.pem`. You can find the mkcert CA certificate by running `mkcert -CAROOT`
5. Duplicate your `.env`-File. Name it `.env.dev.https`. Set `NEXT_PUBLIC_API_PROTOCOL` and `WEB_PROTOCOL` to `https`
6. `npm run dev:https`
7. You might have to restart your browser, then you can access your application at https://localhost:3000


## Deployment

WIP
