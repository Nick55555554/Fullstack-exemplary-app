import {Todo} from 'src/units/todos/types/todo';
import {createMockTodo} from '../factories/todoFactory';

export const mockTodos: Todo[] = [
    createMockTodo({title: 'Первый мок в моей жизни!'}),
    createMockTodo({
        content: 'Сьесть фургон мороженного',
        title: 'Набрать массу',
    }),
    createMockTodo({title: 'Третий мок в моей жизни!'}),
    createMockTodo({title: 'Четвертый мок в моей жизни!'}),
];
