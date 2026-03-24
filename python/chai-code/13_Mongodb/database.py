from pymongo import MongoClient
from bson import ObjectId

# later use it from .env
client = MongoClient("mongodb+srv://ace_404:react_404@cluster0.lqbsugq.mongodb.net/")
db = client["ytmanager"]
video_collection = db["videos"]
print(video_collection, "collection")


def list_videos():
    videos = video_collection.find()
    for video in videos:
        print(f"ID: {video["_id"]} , Name: {video["name"]}, URL: {video["url"]}")


def add_video(name, url):
    video_collection.insert_one({"name": name, "url": url})


def update_video(video_id, new_name, new_url):
    print(video_id, "video Id")
    video_collection.update_one(
        {"_id": ObjectId(video_id)}, {"$set": {"name": new_name, "url": new_url}}
    )


def delete_video(video_id):
    video_collection.delete_one({"_id": ObjectId(video_id)})


def main():
    print("Youtube Manager: Chose your option \n")
    print("1. List all videos")
    print("2. Add video")
    print("3. Update video")
    print("4. Delete video")
    print("5. Exit the app")
    while True:
        choice = input("Enter your choice : ")

        if choice == "1":
            list_videos()
        elif choice == "2":

            name = input("Enter  name for video : ")
            url = input("Enter  URL: ")
            add_video(name, url)
        elif choice == "3":
            list_videos()
            id = input("Enter video Id.")
            name = input("Enter new name for video :")
            url = input("Enter new URL : ")
            update_video(id, name, url)
        elif choice == "4":
            id = input("Enter video Id. : ")
            delete_video(id)
        elif choice == "5":
            break
        else:
            print("Invalid Option")


client.close()


if __name__ == "__main__":
    main()
