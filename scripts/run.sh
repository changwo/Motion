#!/usr/bin/env bash

python manage.py collectstatic --no-input
gunicorn --reload -w 4 -b 0.0.0.0:8000 project.wsgi:application