# rest unpacking
a, *rest = [1, 2, 3, 4]

# a = 1
# rest = [2, 3, 4]

# middle unpacking
a, *middle, b = [1, 2, 3, 4, 5]

# a = 1
# middle = [2, 3, 4]
# b = 5


# loop unpacking
pairs = [(1, 2), (3, 4)]

for a, b in pairs:
    print(a, b)

# clean syntax for dict
user = {"name": "Dipesh", "age": 20}
name, age = user["name"], user["age"]

# unpacking: similar to spread
dict1 = {}
dict2 = {}
new_dict = {**dict1, **dict2}


# fn arugement unpacking
nums = [1, 2, 3]


def add(a, b, c):
    return a + b + c


add(*nums)
