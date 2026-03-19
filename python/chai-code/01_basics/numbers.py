# note: operator precedence is bullshit for production code, the code will 100% get rejected in code review. never rely on it, always use parentheses to make it clear. 
# -----------------power =====================
print(2 ** 3 )
# -----------------division -------------------
3 / 2 #output 1.5
# floor division
3 // 2 #output 1

#-----------------modulo -------------------
3 % 2 #output 1

#--------------type conversion----------------
float(3) #output 3.0
int(3.5) #output 3
str(3) #output '3'
bool(0) #output False
bool(1) #output True
bool(2) #output True

#------------ operator overloading : dont rely on it use industry practices ----------------
"chai" + " " + "python" #output 'chai python'
[1, 2] + [3, 4] #output [1, 2, 3, 4]

# ----------- some syntax ----------
x = 1
y = 2
z = 3

print(x, y, z) #output 1 2 3
print( x, + y, z *2) # outp

# cool utils:
repr("chai \n code") #output 'chai \n code'
str("chai \n code") #output 'chai \n code'
# code'
#output
#  'chai 
# code'
print(str("chai \n code")) # print() aslo calls str() under the hood, so it will output 'chai 


# base supports
print(0b1010) # output 10
print(0o12) # output 10
print(0xA) # output 10
# more structured
oct(10) # output '0o12'
hex(10) # output '0xa'
bin(10) # output '0b1010'

int('1000', 2) # output 8
int('10', 8) # output 8
int('FF', 16) # output 255

# --------------libraries / imports--------------
# 0. math
import math
math.floor(3.7) #output 3
math.ceil(3.2) #output 4
math.ceil(-3.2) # output -4
# trunc() function truncates the decimal part and returns the integer part of a number. it does not round the number, it simply removes the decimal part.
# or we can say that it rounds towards zero, so it will round down for positive numbers and round up for negative numbers.
math.trunc(-2.9) # output -2
math.trunc(2.9) # output 2


# 1. random
import random
random.random() # output a random float between 0.0 and 1.0
random.randint(1, 10) # output a random integer between 1 and 10
random.choice(['chai', 'coffee', 'tea']) # output a random element from the list
random.shuffle([1, 2, 3, 4, 5]) # shuffle the list in place -> note: mutates original array

# 2. decimal
from decimal import Decimal
Decimal('0.1') + Decimal('0.2') # output Decimal('0.3') -> note: this is more accurate than using float for decimal numbers

# 3. fractions
from fractions import Fraction
Fraction(1, 3) + Fraction(1, 6) # output Fraction(1, 2) -> note: this is more accurate than using float for rational numbers


# ---------------------- Sets --------------------------
# unlike JS sets are actually set from mathematics, they are unordered collection of unique elements. they are implemented as hash tables, so they have O(1) average time complexity for membership testing and adding/removing elements.
setOne = {1, 2, 3}
setTwo = {3, 4, 5}
# intersection
setOne.intersection(setTwo) # output {3}
setOne & setTwo # output {3}
# union
setOne.union(setTwo) # output {1, 2, 3, 4
setOne | setTwo # output {1, 2, 3, 4, 5}

# note : setOne - setOne # output set() -> note: this is the empty set, it is different from the empty dictionary which is {}. the empty set is represented by set() because {} is already used for the empty dictionary.
setOne.difference(setTwo) # output {1, 2}
setOne - setTwo # output {1, 2}
{1,2,3} - {2,3,4} # output {1}