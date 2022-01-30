FROM python:3.10-buster

WORKDIR /usr/src/app

USER root
RUN apt-get update
RUN apt-get install build-essential -y
RUN pip install pipenv
RUN python -m pip install --upgrade pip

COPY Pipfile* ./
COPY .env ./
# Generate a requirements.txt from the pipfile so we dont have to worry about pipenv inside Docker
RUN pipenv lock --requirements > requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

COPY src src

EXPOSE 8080

CMD ["uvicorn", "src.main:app", "--workers", "2", "--host", "0.0.0.0", "--port", "8080"]