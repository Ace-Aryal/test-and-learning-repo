class Car:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model


my_car = Car("Toyota", "Hilux")
print(my_car.brand, "my car")
your_car = Car("Suzuki", "Alto")
print(your_car.model)
