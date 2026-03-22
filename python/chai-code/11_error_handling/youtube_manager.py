import json
import os

# get directory of current file
current_dir = os.path.dirname(__file__)
# join current file directory with another file to make a filepath i.e. 11_error_handling/youtube.json
file_path = os.path.join(current_dir, "youtube.json")
# print(current_dir, file_path)

# dev insight: constants like this file_path and file_name should always be hold in variable insated of defining everywhere


def load_data():
    try:
        with open(file_path, "r") as file:
            # goes to the file, loads all the lines, converts and converts into json
            return json.load(file)

    except FileNotFoundError:
        print("File not found")
        return []


# DRY
def save_data_helper(videos):
    # why no try catch here ? because we know that in write method there wont be file not found exception
    with open(file_path, "w") as file_pointer:
        json.dump(videos, file_pointer)


def list_all_videos(videos):
    # print videos in format
    # start : enumerates all the videos keeps first index as 1 and so on

    for index, value in enumerate(videos, start=1):
        print(f"{index}. {value["name"]}  - {value["url"]}")


def add_video(videos: list):
    video_name = input("Enter video name : ")
    video_url = input("Enter video url : ")
    # this mutates original array in main
    videos.append({"name": video_name, "url": video_url})
    # but videos = [] or videos = [*videos,{'name':"",'url': ""}] wont as it is re assignment
    save_data_helper(videos)


def update_video(videos: list):
    list_all_videos(videos)
    video_index = int(input("Enter video number"))
    # video_exists = video_index > 0 and video_index <= len(videos)
    # shorthand
    video_exists = 0 < video_index <= len(videos)
    if not video_exists:
        print("Enter valid video number")
        return
    video_name = (
        input("Enter video name (Press Enter without value for previous value) : ")
        or videos[video_index - 1]["name"]
    )
    video_url = (
        input("Enter video url (Press Enter without value for previous value ) : ")
        or videos[video_index - 1]["url"]
    )
    videos[video_index - 1] = {"name": video_name, "url": video_url}
    save_data_helper(videos)


def delete_video(videos: list):
    video_exists = 0 < video_index <= len(videos)
    if not video_exists:
        print("Enter valid video number")
        return
    video_index = int(input("Enter video number : "))
    videos.pop(video_index - 1)
    # alt: del videos[video_index -1]
    save_data_helper(videos)


def main():
    videos = load_data()
    print("videos", videos)
    while True:
        print("\n Youtube Manager | Choose a option")
        print("1. List all favourite videos")
        print("2. Add a youtube video")
        print("3. Update a youtube video details")
        print("4. Delete a youtube video")
        print("5. Exit the app")
        choice = input("Enter your choice : ")
        # no break needed in python as the mathch stops after one case is executed, but in C and JS necessary
        #  because one a case is mathed it stops checking case unless break statement is detected
        match choice:
            case "1":
                list_all_videos(videos)
            case "2":
                add_video(videos)
            case "3":
                update_video(videos)
            case "4":
                delete_video(videos)
            case "5":
                break
            case _:
                print("Invalid Choice")


if __name__ == "__main__":
    main()
