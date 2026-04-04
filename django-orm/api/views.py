from django.shortcuts import render
from api.models import Restaurant
from django.http import JsonResponse
from django.db.models import Sum

# Create your views here.


def get_restaurants_view(request):
    # Restaurant.objects.prefetch_related("ratings")
    restaurants = Restaurant.objects.prefetch_related(
        "ratings__user", "sales"
    ).annotate(
        total_income=Sum("sales__income")
    )  # for each restaurand sum its all incomes
    # only : like select in prisma
    # no need to go early optimization we have DRF serializer fields for this
    response = []
    # prefetch relatied: seperately query the realted field many fields with one query and query current table with anohter : total 2 queries
    # select related: join the one to one table and do only one join query
    for restaurant in restaurants:
        response.append(
            {
                "name": restaurant.name,
                # "website": restaurant.website,
                # "latitude": restaurant.latitude,
                # "longitude": restaurant.longitude,
                # "type": restaurant.restaurant_type,
                # "type": restaurant.get_restaurant_type_display(),
                "ratings": [
                    {
                        "rating": rating.rating,
                        "review": rating.review,
                        "rated_by": rating.user.username,
                    }
                    # note : restaurant .rating is not value its qs
                    for rating in restaurant.ratings.all()
                ],
                "sales": [{"income": sale.income} for sale in restaurant.sales.all()],
                "total_sales": restaurant.total_income,
            }
        )
    return JsonResponse(response, safe=False)


# note: for advanced prefetch look for Prefetch method docs

# note
# 🧠 Simple note (your quick lookup)

# Use select_related for single-object relations (FK/O2O), and prefetch_related for collections (M2M/reverse).

# 👉 If it returns ONE object → select_related
# 👉 If it returns MANY objects → prefetch_related
