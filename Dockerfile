# build environment
FROM tiangolo/node-frontend:10 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
COPY src /app/src
COPY public /app/public
ADD tsconfig.json /app/tsconfig.json
RUN npm install
ENV REACT_APP_BASE_PATH=admin
ENV REACT_APP_HOME_PATH=/users
ENV REACT_APP_LOGIN_PATH=/login
ENV REACT_APP_LOGOUT_PATH=/logout


RUN npm run build

# host environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]