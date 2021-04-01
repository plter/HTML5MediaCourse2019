FROM ubuntu:18.04

RUN mv /etc/apt/sources.list /etc/apt/sources.list.bak
COPY sources.list /etc/apt/

RUN apt-get update
RUN apt-get install -y gcc g++ make libssl-dev ffmpeg

COPY nginx-1.17.6.tar.gz /opt/
COPY nginx-http-flv-module-1.2.8.tar.gz /opt/
COPY pcre-8.34.tar.gz /opt
COPY zlib-1.2.11.tar.gz /opt

RUN cd /opt/ \
    &&tar -xzvf pcre-8.34.tar.gz \
    &&tar -xzvf zlib-1.2.11.tar.gz \
    &&tar -xzvf nginx-1.17.6.tar.gz \
    &&tar -xzvf nginx-http-flv-module-1.2.8.tar.gz

RUN cd /opt/pcre-8.34 \
    &&./configure \
    &&make \
    &&make install

RUN cd /opt/zlib-1.2.11 \
    &&./configure \
    &&make \
    &&make install

RUN cd /opt/nginx-1.17.6 \
    &&./configure --add-module=/opt/nginx-http-flv-module-1.2.8 \
    &&make \
    &&make install

RUN mv /usr/local/nginx/conf/nginx.conf /usr/local/nginx/conf/nginx.conf.bak

COPY nginx.conf /usr/local/nginx/conf/

