import {setTodoListsAC, todoListsReducer} from '../reducer/todolists-reducer';
import {tasksReducer} from "../reducer/tasks-reducer";
import {TasksStateType, TodoListType} from '../../components/AppWithRedux';
import {AddTodoListAC} from '../reducer/todolists-reducer'
import {ResponseTodolistType} from "../requests/apiRequests";
import {expect} from "@jest/globals";


const startTasksState: TasksStateType = {};
const startTodolistsState: Array<TodoListType> = [];
const NewTodoList: ResponseTodolistType = {
        addedDate: '',
        id: '123',
        order: 0,
        title: 'newTodo'
    }


test('ids should be equals', () => {


    const action = AddTodoListAC(NewTodoList);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTodolists).toBe('123');
});


test('request todo-lists', () => {

    const todoList: Array<ResponseTodolistType> = [
        {
            addedDate: '',
            id: '',
            order: 0,
            title: ''
        }
    ]
    const action = setTodoListsAC(todoList)
    const result = todoListsReducer(startTodolistsState, action)


    expect(result[0].filter).toBe('all')
})
















