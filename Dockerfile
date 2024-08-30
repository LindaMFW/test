FROM mcr.microsoft.com/playwright:v1.34.0-focal
WORKDIR /home/app/
COPY ["package.json", "package-lock.json*", "./"]
# Install the libgudev-1.0.so.0 library
RUN apt-get update && apt-get install -y libgudev-1.0-0
#install dependencies
RUN npm install --save-dev
RUN npx playwright install-deps
ENTRYPOINT ["npm","run","test"]