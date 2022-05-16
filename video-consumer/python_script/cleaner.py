import os
import shutil


def clean_tmp():
    path = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'tmp')
    shutil.rmtree(path)
    os.mkdir(path)