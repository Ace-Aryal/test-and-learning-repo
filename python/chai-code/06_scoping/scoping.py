x = 10


def fun():
    global x
    x = 70


fun()
print(x)
# 70


def f1():
    x = 2

    def f2():
        print("F2", x)

    return f2


result = f1()
# note that even if f1 is sucessfully executed the value of x is still available for result() this is called closure
result()
