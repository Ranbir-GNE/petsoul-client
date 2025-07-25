# petsoul-client/Dockerfile

FROM node:20 as builder

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# Production image
FROM node:18
WORKDIR /app

RUN npm install -g serve
COPY --from=builder /app/dist /app/dist

EXPOSE 80
CMD ["serve", "-s", "dist", "-l", "80"]

