FROM python:3.6.0-alpine

ADD requirements.txt /

RUN apk update && \
    apk add --virtual builder --no-cache gcc postgresql-dev musl-dev && \
    pip install -r requirements.txt
