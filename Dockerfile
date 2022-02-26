FROM 719823691862.dkr.ecr.ap-northeast-2.amazonaws.com/nest-server:latest as build

LABEL maintainer="song22861@naver.com"

WORKDIR /nest-server

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

COPY ./apps ./apps
COPY ./libs ./libs
COPY ./nest-cli.json .
COPY ./package.json .
COPY ./tsconfig.json .
COPY ./tsconfig.build.json .
COPY ./${NODE_ENV}.env .

ENV PATH=${PATH}:./node_modules/.bin

RUN nest build common \
 && nest build database \
 && nest build gateway \
 && nest build authentication \
 && rm -fr apps libs

 FROM 719823691862.dkr.ecr.ap-northeast-2.amazonaws.com/nest-server:latest as nest-server

WORKDIR /nest-server

COPY --from=build /nest-server /nest-server