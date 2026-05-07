import sqlite3

# Подключение к базе данных
conn = sqlite3.connect("users.db")
cursor = conn.cursor()

try:
    # Получаем список таблиц
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()

    if not tables:
        print("В базе данных нет таблиц.")
    else:
        for table in tables:
            table_name = table[0]
            print(f"\n=== Таблица: {table_name} ===")

            # Получаем все данные из таблицы
            cursor.execute(f"SELECT * FROM {table_name}")
            rows = cursor.fetchall()

            # Получаем названия колонок
            columns = [desc[0] for desc in cursor.description]
            print(" | ".join(columns))

            print("-" * 50)

            if rows:
                for row in rows:
                    print(" | ".join(str(value) for value in row))
            else:
                print("Таблица пустая.")

except Exception as e:
    print("Ошибка:", e)

finally:
    conn.close()
