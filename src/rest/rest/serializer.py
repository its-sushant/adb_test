from dataclasses import dataclass

@dataclass
class Todo:
    todo:str

    def encode_todo(self, todo):
        if isinstance(todo, Todo):
            return {'todo':todo.todo}

        raise TypeError(f'Object {Todo} is not a type todo')
