import socket

sock = socket.socket()
sock.connect(('localhost', 9090))
sock.send('What is Sampling _ Music Production _ Loudon Stearns _ Beginner _ Berklee Online.mp4'.encode())

data = sock.recv(10000)
sock.close()

print(data)