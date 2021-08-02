# pull official base image
FROM python:3.9.2-buster

RUN mkdir /backend
WORKDIR /backend
ADD requirements.txt /backend/
RUN pip install -r requirements.txt
ADD . /backend/
EXPOSE 8000
