from django.urls import path
from .views import CurrentHighestScore, SetNewScore, GetScores

urlpatterns = [
    path("", GetScores.as_view()),
    path("current-highest-score", CurrentHighestScore.as_view()),
    path("set-score", SetNewScore.as_view()),

]


