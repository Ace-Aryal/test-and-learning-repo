import requests


def main():

    def fetch_random_user():
        res = requests.get(
            "https://api.freeapi.app/api/v1/public/randomusers/user/random"
        )
        print(res, "response")
        body = res.json()
        if body["success"] and "data" in body:
            print(body["success"], body["data"], "JSON body")
        else:
            raise Exception("Failed to fetch user data")

    try:
        fetch_random_user()
    except Exception as e:
        print(str(e))


if __name__ == "__main__":
    main()
