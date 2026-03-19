# tuple: a immutable alternative to list
tea_types = ("Masala", "Lemon", "Ginger")
print(tea_types[0])  # output Masala
print(tea_types[-1])
print(len(tea_types))
more_tea = ("Chamomile", "Cardamom")
# list / tuple concatenation
all_teas = tea_types + more_tea


if "Masala" in all_teas:
    print("Masala tea is available.")

# methods
all_teas.count("Masala")  # output 1
all_teas.index("Masala")  # output 0
# because tuple is immutable many of the list method of list are not available with tuple like append, insert, remove, pop etc. but we can use slicing to create a new tuple with the desired changes.
# for example to add a new tea to the tuple we can do:
all_teas = all_teas + ("Oolong",)
print(
    all_teas
)  # output ('Masala', 'Lemon', 'Ginger', 'Chamomile', 'Cardamom', 'Oolong')

# sort of destructuring called unpacking : needs all the values to be unpacked
(masala, lemon, ginger) = tea_types
print(masala, lemon, ginger)

print(type(tea_types))  # output <class 'tuple'>
print(type(masala))  # output <class 'str'>

# nested tuples: list, dict and tuple all can be nested

nested_tuple = ("", (1, 2, 3), ["Hello"])
print(nested_tuple[2])

print(all_teas[1:2])
