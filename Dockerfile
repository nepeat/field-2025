FROM python:3.13

WORKDIR /app

COPY pyproject.toml .
RUN pip install .
COPY field/ field/
RUN pip install .
