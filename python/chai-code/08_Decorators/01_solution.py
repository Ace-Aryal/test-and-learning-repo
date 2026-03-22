# Fn Execution Timing
import time


def timing_decorator(fn):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = fn(*args, **kwargs)
        end = time.time()
        print(f"{fn.__name__} ran in {end- start} s")
        return result

    return wrapper


@timing_decorator
def print_args(*args, **kwargs):
    for arg in args:
        print("arg", arg)
    for kwarg in kwargs:
        print(kwarg, " : ", kwargs[kwarg])


# actually we are calling decorator wrapper() instead of print_args here as it is decorated by @timing_decorator
print_args("Dipesh", "Krishu", baby="Kaanha")

# flow
# 1. the timing decorator returns a wrapper insated  of our print_args fn
# 2. we now call the wrapper fn with all the args that print_args expect -> wrapper has both *args and kwargs to accept both positional and kwargs syntax
# 3. wrapper fn calls fn with all the *args and *kwargs
# 4. value returnted from fn call is returned from wrapper as a normal return


def function_debugger(fn):
    def wrapper(*args, **kwargs):
        result = fn(*args, **kwargs)
        # convert all args into string and join with ", "
        print(f"calling {fn.__name__} with \n")
        print(
            "Args -> ",
            ", ".join(str(arg) for arg in args),
            "\n",
            "Kwargs -> ",
            ", ".join(f"{k} : {v}" for k, v in kwargs.items()),
        )
        return result

    return wrapper


@function_debugger
def print_name(name, sirname):
    print(name, sirname)


print_name("Krishu", "Dawadi")
print_name(name="Dipesh", sirname="Aryal")


def cahce_fn(fn):
    cache = {}

    def wrapper(*args, **kwargs):
        print(cache, "cache")
        joined_args = "--".join(str(args))
        if joined_args in cache:
            return cache[joined_args]
        result = fn(*args, **kwargs)
        cache[joined_args] = result
        print("cache", cache)
        return result

    return wrapper


# decorator to cache long running fn value
@cahce_fn
def long_runining_fn(a, b):
    print("calling")
    time.sleep(4)
    return a + b


print(long_runining_fn(1, 2), "sum")
print(long_runining_fn(1, 2), "sum")
