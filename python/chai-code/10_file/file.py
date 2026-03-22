file = open("youtube.txt", "w")
# common file handling patterns
try:
    file.write("Chai aur code")
except ValueError:
    print(ValueError, "Error")
finally:
    file.close()

# cleaner syntax with no extra try finally and close
# once we get out of block the file automatically closes
# note: we will still need try except to handle error
with open("youtube.txt", "w") as f:
    pass
