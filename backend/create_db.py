import sqlite3

# create db with some data to start with

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
        weight INT,
        weight_orig INT,
        weight_spool INT,
        temp_min INT,
        temp_max INT, 
        temp_bed_min INT,
        temp_bed_max INT,
        UNIQUE(vendor, material, color_hex)
    );
""")


# inserting the first filament manually with id 0
conn.execute(
    """INSERT OR IGNORE INTO filaments (
    id,vendor, material, price, color_hex, color_second_hex, weight, weight_orig, weight_spool, temp_min, temp_max, temp_bed_min, temp_bed_max
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
    (0, "Bambu Lab", "PLA", 29.99, "#111", None, 0, 1000, 250, 190, 230, 45, 65),
)


# function for adding filaments to db
def add_filament(
    vendor: str,
    material: str,
    price: float,
    color_hex: str,
    color_second_hex: str | None,
    weight: int,
    weight_orig: int,
    weight_spool: int,
    temp_min: int,
    temp_max: int,
    temp_bed_min: int,
    temp_bed_max: int | None,
):
    conn.execute(
        """INSERT OR IGNORE INTO filaments (
        vendor, material, price, color_hex, color_second_hex, weight, weight_orig, weight_spool, temp_min, temp_max, temp_bed_min, temp_bed_max
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
        (
            vendor,
            material,
            price,
            color_hex,
            color_second_hex,
            weight,
            weight_orig,
            weight_spool,
            temp_min,
            temp_max,
            temp_bed_min,
            temp_bed_max,
        ),
    )


# adding all remaining filaments with automatic id
add_filament("Bambu Lab", "PLA", 29.99, "#c12e1f", None, 0, 1000, 250, 190, 230, 45, 65)
add_filament(
    "Filament PM", "PLA+", 23.90, "#eee", None, 0, 1000, 216, 190, 210, 60, None
)
add_filament(
    "Filament PM",
    "PLA+",
    23.90,
    "#73bab5",
    None,
    0,
    1000,
    216,
    190,
    210,
    60,
    None,
)
add_filament("eSun", "PLA+", 20.99, "#fbe625", None, 0, 1000, 224, 205, 225, 60, 80)
add_filament(
    "eSun",
    "Silk PLA",
    20.99,
    "#123cea",
    "#61ccee",
    0,
    1000,
    224,
    190,
    220,
    60,
    80,
)
add_filament(
    "eSun",
    "Silk PLA",
    25.99,
    "#e41e95",
    "#123cea",
    0,
    1000,
    220,
    190,
    230,
    45,
    60,
)
add_filament(
    "PolyMaker",
    "PLA",
    19.99,
    "#e4bdd0",
    None,
    0,
    1000,
    140,
    190,
    230,
    25,
    60,
)
add_filament(
    "PolyMaker",
    "PLA",
    19.99,
    "#aaa",
    None,
    0,
    1000,
    224,
    190,
    230,
    25,
    60,
)
add_filament(
    "Filament PM", "PLA", 26.90, "#80bf1a", None, 0, 1000, 216, 220, 220, 25, 60
)
add_filament(
    "Prusa",
    "PLA",
    29.99,
    "#fc6d09",
    None,
    0,
    1000,
    186,
    205,
    225,
    40,
    60,
)
add_filament(
    "PolyMaker",
    "PLA",
    19.99,
    "#111",
    None,
    0,
    1000,
    140,
    190,
    230,
    25,
    60,
)
add_filament(
    "PolyMaker",
    "PLA",
    19.99,
    "#eee",
    None,
    0,
    1000,
    140,
    190,
    230,
    25,
    60,
)
add_filament("Fiberlogy", "TPU 40D", 25.30, "#111", None, 0, 500, 250, 200, 220, 50, 70)
add_filament(
    "Filament PM", "PLA+", 12.99, "#a69281", None, 0, 500, 216, 190, 210, 60, None
)

# comminting to db
conn.commit()


# showing the db
curs.execute("SELECT * FROM filaments")
[print(i) for i in curs.fetchall()]


# close
conn.close()
