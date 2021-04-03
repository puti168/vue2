FROM harbor-dev.emkcp.com/devops/test/alpine:latest

RUN apk --update add nginx

VOLUME /tmp

WORKDIR /web

# Set timezone
RUN apk update && apk add ca-certificates && update-ca-certificates \
    && apk add --update tzdata \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone \
    && apk del tzdata && rm -rf /var/cache/apk/*

COPY dist dist

ENTRYPOINT ["nginx","-g","daemon off;"]