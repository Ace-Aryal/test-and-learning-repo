# class method
class Car:
    total_cars = 0

    def __init__(self, brand, model):
        # private property __property , this cant be accesses outside this class
        self.__brand = brand
        self.__model = model
        # self.total_cars += 1 : self is stored for object instance but Car.total_cars stores the varaible for class and not object instace
        Car.total_cars += 1

    # convention for settere
    # why getter ? you may want to set data differently and provide to user differently maybe by formatting adding currency so after converion etc.
    # same reason why setter exist

    # general way of getter setter: JAVA, javascript,
    def get_brand(self):
        return self.__brand

    def set_brand(self, brand):
        self.__brand = brand

    # more pythonic way
    @property
    def brand(self):
        return self.__brand

    @brand.setter
    def brand(self, value):
        if not value:
            raise ValueError("Value is required")
        self.__brand = value

    def drive(self):

        return f"Driving {self.__model} {self.__brand}"

    def fuel_type(self):
        return "Pterol or diesel"

    # static method: the method which is avaliable to the class instead of instance
    @staticmethod
    def general_description():
        return "Cars are means of transport and cool"


my_car = Car("Toyota", "Corolla")
print(my_car.drive())


# inheritance --> a child class can inherit its parents properties and methods
# this is the syntax for extending
class ElectricCar(Car):
    def __init__(self, brand, model, battery_size):
        # call super init to call parent constructor
        super().__init__(brand, model)
        self.battery_size = battery_size

    def fuel_type(self):
        return "Li Ion Battery Charge"


nexon = ElectricCar("Tata", "Nexon", "85kWh")
# print(nexon.__brand) : This will throw error
print(nexon.brand, nexon.drive(), nexon.battery_size, nexon.get_brand())

# Incapsultaion ---> store all the variables into a instance and make it private (usually), everything has access to class but properites of that class can only be accessed via class  .
# assignment:modify the car class to encapsulate the brand attribute, making it private and and provide a getter method to get it.


# pythonic way
print(nexon.brand)
print(nexon.brand)
nexon.brand = "Nexon 4"
print(nexon.brand)

# polymorphism --> both cars has same method fuel_type but behaves differently according to class, also polymorphsim can also be implemented in a same class via input value
print(nexon.fuel_type())
print(my_car.fuel_type())
print(Car.total_cars)


print(Car.general_description())

print(isinstance(nexon, Car), isinstance(nexon, ElectricCar))
# True, True

# multiple inheritance
# Create two class battery and engine,


class Battery:
    def batteryInfo(self):
        print("Battery Info")


class Engine:
    def engineInfo(self):
        print("Engine Info")


class EV(Battery, Engine, Car):
    def ev(self):
        print("This is EV")


my_ev = EV("BYD", "Series A")
print(my_ev.engineInfo())
print(my_ev.batteryInfo())
