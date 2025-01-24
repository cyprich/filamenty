import os
import sqlite3
import qrcode

"""
https://pypi.org/project/qrcode/
"""

# connect to db
conn = sqlite3.connect("filaments.db")
curs = conn.cursor()

# TODO change URL when ready
URL = "http://192.168.88.3:5000/api/"

# create directory if it doesnt exist
DIRECTORY = "images/qr/"
os.makedirs(DIRECTORY, exist_ok=True)

# get filaments from db and make qrcode for each one of them
curs.execute("SELECT * FROM filaments")
for filament in curs.fetchall():
    # create qrcode
    qr = qrcode.QRCode(version=None, border=0)
    qr.add_data(f"{URL}{DIRECTORY}{filament[0]}.png")
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")  # make image
    img.save(f"{DIRECTORY}{filament[0]}.png")  # save image
