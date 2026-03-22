import math


def multiply(a, b):
    return a * b


print(multiply(2, 2))
# 4

print(multiply("a", 3))
# aaa
print(multiply(3, "a"))
# aaa

# fn that returns both area and circumference of circle from raids


def calculate_area_and_circumference(radius):
    # i this better apporach would be dict format
    return round(math.pi * (radius**2), 2), round(2 * math.pi * radius, 2)
    # returns tuple value


area, circumference = calculate_area_and_circumference(5)
print(calculate_area_and_circumference(5))


# defualt arg
def printName(name="Dipesh"):
    print(name)


printName("Ace")

# lambda fn
cube = lambda x, y: x * y
print(cube(3, 5), "Cube of 3")


# fns with *args
def sum_all(*nums):
    # nums are packed as tuples
    return sum(nums)


print(sum_all(1, 2, 3, 4, 5))


# fn with **kwargs
def printHero(name, power):
    print("name: ", name, " Power: ", power)


# in named args order do not matter but matters if not going by name
printHero(power="Flight", name="Superman")


def printMovie(**kwargs):
    # kwargs are packed as dict type
    # dict.items() returns --> dict_items([('name', 'Dipesh'), ('age', 20)])
    # name, male_lead, female_lead, language = kwargs
    # print("Name: ", name, " ML: ", male_lead, " FL :", female_lead)
    for key, value in kwargs.items():
        print(key, " : ", value)


printMovie(name="Saiyaara", male_lead="Aahan Pandey", female_lead="", language="Hindi")


# generator fn
def even_genertor(limit: int):
    for i in range(2, limit + 1, 2):
        yield i


for num in even_genertor(10):
    print(num)


def factorial(number: int):
    if number <= 1:
        return 1
    fact = number * factorial(number - 1)
    return fact


print(factorial(5))
