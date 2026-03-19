# strings are immutable objects in python, which means that once a string is created, it cannot be changed.
chai = 'masala chai'
# 1. slicing
sliced_chai = chai[0:6]
print(sliced_chai) #
chais = "masala, lemon, ginger"
chaisList = chais.split(", ")
print(chaisList) # output ['masala', 'lemon', 'ginger']
print(chai.find("m")) #output: 0 , if didnt find it would return -1
chaichaichai = "Masala chai chai chai"
print(chaichaichai.count("chai")) # output 3
chai_type = "Masala"
quantity = 3
print(f"{quantity} cups of {chai_type} chai") # output 3 cups of Masala chai
order = "{quantity} cups of {chai_type} chai"
print(order.format(quantity=quantity, chai_type=chai_type)) # output 3 cups of Masala chai
print(", ".join(chaisList)) # output 'masala, lemon, ginger'
# escape characters
asked = "He said, \"I want a cup of chai.\""
print(asked) # output He said, "I want a cup of chai."
for letter in chai:
    print(letter)
# Raw Strings
raw_string = r"C:\Users\Username\Documents\nnew_folder"
print(raw_string) # output C:\Users\Username\Documents\nnew_folder
# Formatted String Literals (f-strings)
name = "Alice"
age = 30
print(f"{name} is {age} years old.") # output Alice is 30 years old.
# Useful String Methods
print(chai.upper()) # output MASALA CHAI
print(chai.lower()) # output masala chai
print(chai.capitalize()) # output Masala chai
print(chai.replace("masala", "lemon")) # output lemon chai
print("Masala" in chai) # output True
print("Lemon" in chai) # output False