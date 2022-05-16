from aifc import Error
import socket
from typing import Callable
import json

def listen(callback: Callable[[str], str]):
    sock = socket.socket()
    sock.bind(('', 9090))
    sock.listen(1)

    while True:
        conn, addr = sock.accept()
        try:
            data = conn.recv(1024).decode()
            jsonData = json.loads(data.split("#")[1])
            result = callback(jsonData["data"]).lower();
            response = json.dumps({
                "id": jsonData["id"],
                "data": result,
            }, separators=(',', ':'))
            response = str(len(response)) + "#" + response
            conn.sendall(response.encode())
            
        except Error as err:
            conn.send(err)
        conn.close()
