# syntax=docker/dockerfile:1
FROM python:3.8.0
ENV PYTHONUNBUFFERED=1
WORKDIR /backend
COPY requirements.txt /backend/
RUN pip install gunicorn
RUN pip install -r requirements.txt
COPY . /backend/