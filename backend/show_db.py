import sqlite3

# show database

# opening db
conn = sqlite3.connect("filaments.db")
curs = conn.cursor()

# showing data
curs.execute("SELECT * FROM filaments")
[print(i) for i in curs.fetchall()]

# close
conn.close()
