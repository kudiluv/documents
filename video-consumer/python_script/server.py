from aifc import Error
import socket
from typing import Callable

def listen(callback: Callable[[str], str]):
    sock = socket.socket()
    sock.bind(('', 9090))
    sock.listen(1)

    while True:
        conn, addr = sock.accept()
        try:
            data = conn.recv(1024).decode()
            result = callback(data).encode()
            conn.send(result)
        except Error as err:
            conn.send(err)
            pass
        conn.close()
