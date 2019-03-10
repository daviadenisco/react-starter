FROM phusion/baseimage:latest

# install node
RUN apt-get update
RUN apt-get install curl -y
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash
RUN apt-get install nodejs -y

RUN mkdir /opt/react-starter/
WORKDIR /opt/react-starter
COPY . /opt/react-starter/

RUN npm install

# copy scripts to be executed at runtime
RUN mkdir -p /etc/my_init.d
COPY scripts/01-start.sh /etc/my_init.d/01-start.sh
RUN chmod +x /etc/my_init.d/01-start.sh

EXPOSE 5000

CMD ["/sbin/my_init"]

