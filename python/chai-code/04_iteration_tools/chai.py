import time

print("chai aur code")
# playing with files
f = open("test.txt", "w")
f.write("Hello world")
f.close()

f.readline()
for line in open("chai.py"):
    print(line)

myList = [1, 2, 3, 4]
I = iter(myList)

# <list_iterator object at 0x76fccca64700> : points to the first element of the list
I.__next__()
# 1
f.close()
f1 = open("text.txt", "r")
# file object is also an iterator that is why we can use it in for loop and we get .__next__ method for free
f1.__next__()

iter(f1) is f1
# True

# however iter(myList) is not myList
iter(myList) is myList
# False

myDict = {"a": 1, "b": 2}
for key in myDict:
    print(key)

J = iter(myDict)
print(J)
# <dict_keyiterator object at 0x76fccca64700>
J.__next__()
# 'a'
J.__next__()
# 'b'
J.__next__()
# StopIteration error

# same conecpt for range
myRange = range(5)
K = iter(myRange)
K.__next__()
# 0
K.__next__()
# 1
