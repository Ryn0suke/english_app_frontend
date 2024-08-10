FROM ubuntu:latest

WORKDIR /usr/src

RUN \
    apt update && \
    apt -y upgrade && \
    apt install -y build-essential curl git nano && \
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash && \
    /bin/bash -c "source $HOME/.nvm/nvm.sh && nvm install 20 && npm install -g typescript"

RUN /bin/bash -c "source $HOME/.nvm/nvm.sh && npx create-react-app frontend --template typescript"

WORKDIR /usr/src/frontend