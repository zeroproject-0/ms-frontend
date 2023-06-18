FROM node:19-alpine3.16 as build
ARG chatservice_url=https://ms-chats.zeroproject.dev
ARG userservice_url=https://ms-users.zeroproject.dev
WORKDIR /app
COPY package.json .
RUN npm install --prefer-offline --no-audit --progress=false
COPY . .
ENV chatservice_url=$chatservice_url
ENV userservice_url=$userservice_url
RUN echo "VITE_API_CHATS=${chatservice_url}" >> .env
RUN echo "VITE_API_USERS=${userservice_url}" >> .env
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]