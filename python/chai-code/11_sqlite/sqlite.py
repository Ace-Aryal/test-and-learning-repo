import sqlite3

connection = sqlite3.connect("yt_videos.db")

cursor = connection.cursor()

cursor.execute(
    """
    CREATE TABLE IF NOT EXISTS videos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    url  TEXT NOT NULL
    )
"""
)


def list_videos():
    cursor.execute(
        """
    SELECT * FROM videos
"""
    )
    rows = cursor.fetchall()
    print("*" * 50)
    print("ID \t Name \t URL")
    if len(rows) == 0:
        print("No videos till now.")
        return
    for row in rows:
        print(f" {row[0]} \t {row[1]} \t {row[2]}")
    print("*" * 50)


def add_video(name, url):
    cursor.execute("INSERT INTO videos (name,url) VALUES (?,?)", (name, url))
    connection.commit()
    print("Video Added Sucessfully!")


def update_video(id, new_name, new_url):
    values = []
    updates = []
    if new_name not in (None, ""):
        updates.append("name = ?")
        values.append(new_name)

    if new_url not in (None, ""):
        updates.append("url = ?")
        values.append(new_url)

    if not updates:
        print("Nothing to update")
        return
    values.append(id)
    cursor.execute(
        f'UPDATE videos SET {", ".join(updates)} WHERE id = ? ',
        values,
    )
    connection.commit()
    print("Video updated sucessfully !")


def delete_video(id):
    cursor.execute("DELETE FROM videos WHERE id = ? ", (id,))
    connection.commit()
    print("Video deleted succesfully !")


def main():
    while True:
        print("\n Youtube Manager | Choose a option")
        print("1. List all favourite videos")
        print("2. Add a youtube video")
        print("3. Update a youtube video details")
        print("4. Delete a youtube video")
        print("5. Exit the app")
        choice = input("Enter your choice : ")

        if choice == "1":
            list_videos()
        elif choice == "2":

            name = input("Enter  name for video")
            url = input("Enter  URL")
            add_video(name, url)
        elif choice == "3":
            list_videos()
            id = input("Enter video Id.")
            name = input("Enter new name for video")
            url = input("Enter new URL")
            update_video(id, name, url)
        elif choice == "4":
            id = input("Enter video Id.")
            delete_video(id)
        elif choice == "5":
            break
        else:
            print("Invalid Option")
    connection.close()


if __name__ == "__main__":
    main()
