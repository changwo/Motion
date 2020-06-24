FROM continuumio/miniconda3:4.8.2

COPY ./backend/requirements.yml /backend/requirements.yml

RUN conda env create -f /backend/requirements.yml

ENV PATH /opt/conda/envs/motion_backend/bin:$PATH

RUN echo "source activate motion_backend" >~/.bashrc

COPY ./backend /backend

WORKDIR /backend