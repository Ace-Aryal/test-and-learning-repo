from api.models import Restaurant, User, Rating, Sale
from django.db import connection
from django.db.models.functions import Lower


def run():
    print("Hello from runscript...")
    # ------------------creating data by instantiating and saving data--------------
    # restaurant = Restaurant()
    # restaurant.name = "Krishu Thalaki"
    # restaurant.restaurant_type = Restaurant.TypeChoices.NEPALI
    # restaurant.website = ""
    # restaurant.date_opened = "2026-02-01"
    # restaurant.longitude = 50.2
    # restaurant.latitude = 60.2
    # restaurant.save()
    # -----------------Creating data by Model.objects.create --------------
    # Restaurant.objects.create(
    #     name="Dipesh Thalaki", date_opened="2020-01-01", latitude=40, longitude=50
    # )

    # ----------------- querying---------------------------
    # restaurants = Restaurant.objects.all()
    # restaurant1 = Restaurant.objects.first()
    # restaurant1all = Restaurant.objects.all()[0]
    # # both statemnts are same, as query is lazy
    # print(restaurants, restaurant1, restaurant1all, "restaurants")
    # Restaurant.objects.count()
    # -------------- Foregign keys querying and CRUD  ----------------------
    # restaurant1 = Restaurant.objects.first()
    user1 = User.objects.first()
    # Rating.objects.create(
    #     user=user1, restaurant=restaurant1, rating=5, review="Just Tasty!"
    # )
    # -------------- filering --------------------
    # restaurants = Restaurant.objects.filter(
    #     restaurant_type=Restaurant.TypeChoices.NEPALI
    # )
    # lookup: field__lookup
    # ratings = Rating.objects.filter(rating__gte=4)
    # ratings = Rating.objects.exclude(rating__gte=4)
    # print(ratings)

    # --------------------updating-----------------
    # 1. save() method
    restaurant = Restaurant.objects.first()
    # restaurant.name = "Krishu Thakali Home"
    # restaurant.save()
    # print(restaurant.ratings.all())
    # print(connection.queries)
    # Sale.objects.create(restaurant=restaurant, income=4000)
    # Sale.objects.create(restaurant=restaurant, income=3000)
    # sales_for_restaurant_1 = restaurant.sales.all()
    # print(sales_for_restaurant_1, "sfr1")

    # ----------get or create -------------
    # rating, created = Rating.objects.get_or_create(
    #     restaurant=restaurant, user=user1, rating=4
    # )
    # print(connection.queries, rating, "rating", created, "created")
    rating = Rating.objects.create(user=user1, restaurant=restaurant, rating=9)
    rating.full_clean()

    # note : use can use queryset.update() to update fields
    restaurants = Restaurant.objects.filter(name__icontains="a")
    # or
    # Restaurant.objects.filter(name__icontains="a").update(name="Krishy Voganayalaya")
    # restaurants.update(name="Krishu Voganalaya")

    # ------------------- delete -----------------
    # deletes the 1st restaurant
    # restaurant.delete() : returns count of each row deleted for  restaurant table and also cascaded tables
    # qs.delete()
    # Restaurant.objects.filter(name__icontains="a").delete() : deletes all filtered restaurants
    # interseting
    Restaurant.objects.filter(
        name__lt="E"
    )  #: give sall the data which name starts with A,B,C and D and lowercases also for sqlite and in postgre doesnt give lowercases as they come later in ASCII table
    # ----------------- order by -------------------------------
    restaurants = Restaurant.objects.order_by(
        Lower("name")
    )  # asc: default : Lower : 1st lowercases the databse name and then orders so no case problems
    # restaurants = Restaurant.objects.order_by("name").reverse() : createes queryset for reverse in SQL query
    # restaurants = Restaurant.objects.order_by("-name") : same as above
    # --------------- limiting and offseting ---------------
    #  just use slicing for qs
    # Restaurants.objects.earliest("opened_at")  : get earliset item : like first but for date and datetime fields
    # Restaurants.objects.latest("opened_at")  : get latest item : like last but for date and datetime fields

    # ----------- filtering by fk ----------------
    # performs join and filtering
    ratings = Rating.objects.filter(restaurant__name__istartswith="n")
    print(ratings)
