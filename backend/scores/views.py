from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Score
from .serializers import ScoreSerializer


# Create your views here.
class GetScores(APIView):
    def get(self, request):
        scores = Score.objects.all().order_by("-score")[:50]
        response_serializer = ScoreSerializer(scores, many=True)
        return Response(response_serializer.data)



class CurrentHighestScore(APIView):

    def get(self, request):
        highest_score = Score.objects.all().order_by('-score')[0]
        return Response({"highest_score": highest_score.score})


class SetNewScore(APIView):

    def post(self, request):
        post_params = request.data["params"]
        print(post_params)
        if 'username' in post_params and 'score' in post_params:
            username = post_params["username"]
            score = post_params["score"]
            Score.objects.create(username=username, score=score)
            return Response({"success": f"User {username}'s score of {score} was recorded"})

        else:
            return Response({"error": "Unable to add score"})