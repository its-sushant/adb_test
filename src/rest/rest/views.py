from django.shortcuts import render
from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, logging, os
from pymongo import MongoClient
from .serializer import Todo

mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
db1 = MongoClient(mongo_uri)
db = db1['test_db']
collection = db.mynewdatabase

class TodoListView(APIView):

    def get(self, request):
        result = []
        todos = collection.find()

        for todo in todos:
            try:
                data = Todo(todo=todo.get('todo'))
            except KeyError:
                print("key not found")

            try:
                temp = json.dumps(data, default=data.encode_todo)
                result.append(eval(temp))
            except TypeError:
                print("Not a valid serializer")

        return Response(result, status=status.HTTP_200_OK)
        
    def post(self, request):
        data = Todo(todo=request.data.get('todo'))

        try:
            serialize = json.dumps(data, default=data.encode_todo)
            serialized = eval(serialize)
            collection.insert_one(serialized)
            return Response('ok!', status=status.HTTP_200_OK)
        except NameError:
            print("not a valid serialize!")
        
        return Response('error!', status=status.HTTP_400_BAD_REQUEST)

