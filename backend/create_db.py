import sqlite3

# some data to db to start with

# why do i have all of this shit here
# and why does it autoformat like this


# function for adding filaments
def add_filament(
    vendor: str,
    material: str,
    price: float,
    color_hex: str,
    color_second_hex: str | None,
    dark_mode: bool,
    weight: int,
    weight_orig: int,
    weight_spool: int,
    temp_min: int,
    temp_max: int,
):
    conn.execute(
        """INSERT OR IGNORE INTO filaments (
        vendor, material, price, color_hex, color_second_hex, dark_mode, weight, weight_orig, weight_spool, temp_min, temp_max
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
        (
            vendor,
            material,
            price,
            color_hex,
            color_second_hex,
            dark_mode,
            weight,
            weight_orig,
            weight_spool,
            temp_min,
            temp_max,
        ),
    )


# opening db
conn = sqlite3.connect("filaments.db")
curs = conn.cursor()

# creating table
curs.execute("""
    CREATE TABLE IF NOT EXISTS filaments
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        vendor TEXT,
        material TEXT,
        price REAL,
        color_hex TEXT,
        color_second_hex TEXT,
        dark_mode BOOL,
        weight INT,
        weight_orig INT,
        weight_spool INT,
        temp_min INT,
        temp_max INT, 
        UNIQUE(vendor, material, color_hex)
    );
""")


# inserting the first filament manually with id 0
conn.execute(
    """INSERT OR IGNORE INTO filaments (
    id,vendor, material, price, color_hex, color_second_hex, dark_mode, weight, weight_orig, weight_spool, temp_min, temp_max
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
    (0, "Bambu Lab", "PLA", 29.99, "#111", None, True, 0, 1000, 250, 190, 250),
)

# adding all remaining filaments
add_filament("Bambu Lab", "PLA", 29.99, "#c12e1f", None, True, 0, 1000, 250, 190, 250)
add_filament("Filament PM", "PLA+", 23.90, "#eee", None, False, 0, 1000, 216, 190, 210)
add_filament(
    "Filament PM", "PLA+", 23.90, "#73bab5", None, False, 0, 1000, 216, 190, 210
)
add_filament("eSun", "PLA", 20.99, "#fbe625", None, False, 0, 1000, 224, 205, 225)
add_filament(
    "eSun", "eSilk-PLA", 20.99, "#123cea", "#61ccee", False, 0, 1000, 224, 190, 220
)
add_filament(
    "eSun",
    "ePLA-Silk Magic",
    25.99,
    "#e41e95",
    "#123cea",
    False,
    0,
    1000,
    220,
    190,
    230,
)
add_filament(
    "PolyMaker",
    "PolyTerra PLA",
    19.99,
    "#e4bd0",
    None,
    False,
    0,
    1000,
    140,
    190,
    230,
)
add_filament(
    "Filament PM", "PLA", 26.90, "#80bf1a", None, False, 0, 1000, 216, 220, 220
)
add_filament(
    "PolyMaker", "PolyTerra PLA", 19.99, "#aaa", None, False, 0, 1000, 224, 190, 230
)
add_filament(
    "Prusa", "Prusament PLA", 29.99, "#fc6d09", None, False, 0, 1000, 186, 205, 225
)
add_filament(
    "PolyMaker", "PolyTerra PLA", 19.99, "#111", None, True, 0, 1000, 140, 190, 230
)
add_filament(
    "PolyMaker", "PolyTerra PLA", 19.99, "#eee", None, False, 0, 1000, 140, 190, 230
)
add_filament("Fiberlogy", "TPU 40D", 25.30, "#111", None, True, 0, 500, 290, 200, 220)
add_filament("Filament PM", "PLA+", 12.99, "#a69281", None, False, 0, 500, 0, 216, 210)

# comminting to add to db
conn.commit()


# showing the db
curs.execute("SELECT * FROM filaments")
[print(i) for i in curs.fetchall()]


# close
conn.close()
