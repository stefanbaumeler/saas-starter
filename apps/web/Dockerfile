# This template uses Automatically Copying Traced Files feature
# so you need to setup your Next Config file to use `output: 'standalone'`
# Please read this for more information https://nextjs.org/docs/pages/api-reference/next-config-js/output

# Production image, copy all the files and run next
FROM docker.io/node:lts-alpine AS runner
RUN apk add --no-cache dumb-init
ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /usr/src/app
COPY apps/web/next.config.js ./
COPY apps/web/public ./public
COPY apps/web/.next/standalone/apps/web ./
COPY apps/web/.next/standalone/package.json ./
COPY apps/web/.next/standalone/node_modules ./node_modules
COPY apps/web/.next/static ./.next/static
# RUN npm i sharp
RUN chown -R node:node .
USER node
EXPOSE 3000
# COPY --chown=node:node ./tools/scripts/entrypoints/api.sh /usr/local/bin/docker-entrypoint.sh
# ENTRYPOINT [ "docker-entrypoint.sh" ]
CMD ["dumb-init", "node", "server.js"]
