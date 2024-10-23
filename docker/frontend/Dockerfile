# base
FROM node:18-alpine AS default

WORKDIR /app

RUN npm install -g pnpm

COPY ./package.json ./pnpm-lock.yaml ./

RUN pnpm install

COPY . .


# development
FROM default AS dev

ENV NODE_ENV=development
EXPOSE 5173
CMD ["pnpm", "dev", "--host"]

# build
FROM default AS build

ENV NODE_ENV=production
RUN pnpm build

# production
FROM nginx:1.25.1-alpine AS prod

COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]