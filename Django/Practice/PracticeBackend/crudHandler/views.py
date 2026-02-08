  from rest_framework.views import APIView
from rest_framework.response import Response
from .models import PracticeModel
from .serializer import PracticeSerializer

class PracticeCrudHandler(APIView):
    def get(self, request):
        practice = PracticeModel.objects.all()  # fetch all PracticeModel rows
        serialKiller = PracticeSerializer(practice, many=True)  # serialize queryset to primitives
        return Response(serialKiller.data)  # return JSON list to client

    def post(self, request):
        serialKiller = PracticeSerializer(data=request.data)  # bind incoming JSON to serializer
        if serialKiller.is_valid():  # run field & custom validators
            serialKiller.save()  # create and persist model instance
            return Response(serialKiller.data, status=201)  # return created object
        return Response(serialKiller.errors, status=400)  # return validation errors

    def patch(self, request):
        id = request.data.get('id')  # read id from request body (fragile; better in URL)
        practice = PracticeModel.objects.get(id=id)  # fetch instance (raises if missing)
        serialKiller = PracticeSerializer(practice, data=request.data, partial=True)  # bind for partial update
        if serialKiller.is_valid():  # validate provided fields only
            serialKiller.save()  # apply updates and persist
            return Response(serialKiller.data, status=200)  # return updated object
        return Response(serialKiller.errors, status=400)  # return validation errors


# Short dry-run summary:
# - GET: query DB, serialize queryset with `many=True`, return list JSON.
# - POST: bind `data=`, validate, `save()` creates model, return 201 with object.
# - PATCH: get `id`, fetch instance, bind `instance + data` with `partial=True`, validate, save updates.
# Notes: missing/invalid id will raise, ID belongs in URL, and auth/permissions are required for production.

