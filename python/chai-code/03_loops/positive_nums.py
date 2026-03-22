# 1.
numbers = [-1, 0, 23, -8, 6, 8]
positive_num_count = 0
for num in numbers:
    if num > 0:
        positive_num_count += 1

print(positive_num_count, "positive num count")

# 2.
n = 8
even_numbers_sum = 0
for num in range(1, n + 1):
    if num % 2 == 0:
        even_numbers_sum += num
print(even_numbers_sum, "even numbers sum")

# 3. skip 5th iteration
given_num = 5
for num in range(1, 10 + 1):
    if num == 5:
        continue
    print(f"{given_num} * {num} = {given_num * num}")

# 4. reverse a string
name = "dipesh"
reversed = ""
for char in name:
    reversed = char + reversed
print(reversed, "reversed")

# 5. find first non repeated character
my_str = "holaholak"
first_non_repeated_char = None

for char in my_str:
    repeat_count = 0
    for char_cpy in my_str:
        if repeat_count > 1:
            break
        if char == char_cpy:
            repeat_count += 1
    if repeat_count == 1:
        first_non_repeated_char = char
        break

# or use the default .count method

print(first_non_repeated_char, "1st non repeating")

# factorial using while loop
fact = 1
number = 5
i = number
while i > 0:
    fact *= i
    i -= 1

print("Factorial of ", number, " is ", fact)

# prime number or not
num = 5
is_prime_number = True
for i in range(2, num):
    if (num % i) == 0:
        is_prime_number = False
        break

if is_prime_number:
    print("Prime")
else:
    print("Composite")

# uniqueness of element in list or not
items = ["car", "horse", "cart", "car"]

for item in items:
    is_unique_element = items.count(item) == 1
    if not is_unique_element:
        print("Duplicate", item)
        break

# altier
unique_item = set()
for item in items:
    if item in unique_item:
        print("Duplicate", item)
        break
    unique_item.add(item)

import time

# exponential backoff strategy
retry_time = 0
max_retires = 5
password = "krishu"
for i in range(max_retires):
    print(retry_time, "wait time")
    time.sleep(retry_time)
    password_input = input("Input password")
    if password_input != password:
        retry_time = 1 if retry_time == 0 else retry_time * 2
        continue
    if password_input == password:
        retry_time = 1
        break

print(retry_time, "rerty time")
