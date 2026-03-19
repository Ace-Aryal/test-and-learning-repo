# List in python
tea_varieties = ["Masala", "Lemon", "Ginger","Oolong", "Green", "Black","Herbal","Matka"]
# slicing
sliced_variants = tea_varieties[0:3] #note: slicing doesnt change the original list
print(sliced_variants) # output ['Masala', 'Lemon', 'Ginger']
print(tea_varieties) # output ['Masala', 'Lemon', 'Ginger', 'Oolong', 'Green', 'Black', 'Herbal', 'Matka']
# Hopping
print(tea_varieties[0:8:2]) # output ['Masala', 'Ginger', 'Green', 'Herbal']
# Mutating Lists
tea_varieties[3] = "White"
#replacing using slicing
tea_varieties[4:6] = ["Green", "Black"]
print(tea_varieties) # output ['Masala', 'Lemon', 'Ginger', 'White', 'Green', 'Black', 'Herbal', 'Matka']
tea_varieties[1:1] = ["Cardamom","Oolong"] # inserting without replacing
print(tea_varieties) # output ['Masala', 'Cardamom', 'Oolong', 'Lemon', 'Ginger', 'White', 'Green', 'Black', 'Herbal', 'Matka']
tea_varieties[1:3] = [] # deleting elements using slicing
print(tea_varieties) # output ['Masala', 'Lemon', 'Ginger', 'White', 'Green', 'Black', 'Herbal', 'Matka']

# list methods
tea_varieties.append("Chamomile")
print(tea_varieties) # output ['Masala', 'Lemon', 'Ginger', 'White', 'Green', 'Black', 'Herbal', 'Matka', 'Chamomile']
# use insert instead of slicing magic for clean code
tea_varieties.insert(2, "Cardamom")
print(tea_varieties) # output ['Masala', 'Lemon', 'Cardamom','Ginger', 'White', 'Green', 'Black', 'Herbal', 'Matka', 'Chamomile']
tea_varieties.remove("White")
print(tea_varieties) # output ['Masala', 'Lemon', 'Cardamom','Ginger', 'Green', 'Black', 'Herbal', 'Matka', 'Chamomile']
tea_varieties.pop() # removes and returns the last element by default 
tea_varieties.pop(4) # deletes 4th index element
print(tea_varieties) # output ['Masala', 'Lemon', 'Cardamom','Ginger', 'Green', 'Black', 'Herbal', 'Matka', 'Chamomile']
tea_varieties_copy = tea_varieties.copy() # copies list

# loop
for tea in tea_varieties:
    print(tea,end="-") 
# conditional
if("Green" in tea_varieties):
    print("\nGreen tea is available.")
# range: range is iterable like  a list so can be used with for in
squared_nums = [x **2 for x in range(10)]
cube_nums = [x **3 for x in range(10)]
print(squared_nums) # output [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
print(cube_nums) # output [0, 1, 8, 27, 64, 125, 216, 343, 512, 729]