from fastapi import FastAPI
import uvicorn


def main():
    print("Hello from uv-test!")
    uvicorn.run(app, host="127.0.0.1", port=8000)


app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello from chai code."}


if __name__ == "__main__":
    main()
