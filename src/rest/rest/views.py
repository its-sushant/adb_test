from django.shortcuts import render
from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, logging, os
from pymongo import MongoClient
from .todoserializer import TodoSerializer

mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
db = MongoClient(mongo_uri)['test_db']
collection = db.mydatabase

class TodoListView(APIView):

    def get(self, request):
        result = []
        todos = collection.find()

        for todo in todos:
            serializer = TodoSerializer(data=todo)
            if serializer.is_valid():
                result.append(serializer.validated_data)

        return Response(result, status=status.HTTP_200_OK)
        
    def post(self, request):
        serializer = TodoSerializer(data=request.data)

        if serializer.is_valid():
            collection.insert_one(serializer.data)
            return Response('OK', status=status.HTTP_200_OK)

        return Response('error', status=status.HTTP_400_BAD_REQUEST)

