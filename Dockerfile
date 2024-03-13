FROM node:20

WORKDIR /app

COPY package* .
RUN npm install --force

COPY . .

RUN npm run build
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build"]