import {
    AddTodoListAC, ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodolistAC, todoListsReducer
} from '../reducer/todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodoListType} from '../../components/AppWithRedux';
import {ResponseTodolistType} from "../requests/apiRequests";


let todolistId1: string
let todolistId2: string

let startState: Array<TodoListType> = []

const newTodoList: ResponseTodolistType = {
    addedDate: '',
    id: '',
    order: 1,
    title: 'New Todolist'
}


beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", entityStatus: 'idle'},
        {id: todolistId2, title: "What to buy", filter: "all", entityStatus: 'idle'}
    ]
})


test('correct todolist should be removed', () => {

    let endState = todoListsReducer(startState, RemoveTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todoListsReducer(startState, ChangeTodoListTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";
    const endState = todoListsReducer(startState, ChangeTodoListFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter)

});


test('correct todolist should be added', () => {
    const endState = todoListsReducer(startState, AddTodoListAC(newTodoList))
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe("New Todolist");
});







