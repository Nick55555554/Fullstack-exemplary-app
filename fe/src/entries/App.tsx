import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TodosList } from '@/todos/pages/TodosList';

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<TodosList />} />
            </Routes>
        </BrowserRouter>
    )
}
export default AppRouter;