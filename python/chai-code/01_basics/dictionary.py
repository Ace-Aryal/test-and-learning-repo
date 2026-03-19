# Dictionary : It is like object literals in JS
user = {
    "name": "Dipesh",
    "age": 25,
    "city": "Kathmandu",
    "isVerified":True
}
print(user["age"])
user["age"] = 18
print(user)

#loop
# key is looped not value for dictionary
for userDetail in user:
    print(user[userDetail])

# we can loop both key and value for dictionary with slightly different syntax
for key, value in user.items():
    print(f"{key} : {value}")

# conditionals
# same thing here: strings and arrays search for value in "in" keyword but dict uses key
if("name" in user):
    print("Name is present")
else:
    print("name is absent")

print(len(user)) # output : 4

# adding keys
user["phone"] = "9700000000"
print(user,"user")

# methods

user_copy = user.copy() # creates a shallow copy of the dictionary
user.pop("isVerified") # removes the key and returns the value
# we need to give key in dict meanwhile in list the last item is removed
user.popitem() #pop last item
print(user)

del user["city"]
print(user)


# nested dict
date_of_birth = {
    "year": 2000,
    "month" : 1,
    "day" : 1,
}

user_with_dob = {
 "name": "User",
 "dob" : date_of_birth  
}

# range
# in list value is returned but in dict key is returned and we have to use that key to get value and store as a dict comprehension
squared = {x: x**2 for x in range(10)}
print(squared,"squared")

keys = ["name", "age", "city"]
default_value = "unknown"
# default value goes into all keys
new_dict = dict.fromkeys(keys,default_value)
print(new_dict,"new_dict")