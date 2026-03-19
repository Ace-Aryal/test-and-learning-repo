def isConvertableToInt(string: str):
    try:
        int_value = int(string)
        return True
    except ValueError:
        return False


age = input("Enter your age: ")
if not isConvertableToInt(age):
    print("Invalid age provided")
else:
    age_int = int(age)
    if age_int < 0:
        print("Invalid age")
    elif age_int < 13:
        print("Child")
    elif age_int < 20:
        print("Teenager")
    elif age_int < 60:
        print("Adult")
    else:
        print("Senior")
