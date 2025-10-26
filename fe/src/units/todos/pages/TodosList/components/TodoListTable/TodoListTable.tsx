import { Table, TableColumnsType } from "antd"
import { Todo } from "src/units/todos/types/todo"
import { useTranslation } from "react-i18next"
import { ColumnsType } from "antd/es/table"

interface TodoListTableProps {
    todos: Todo[]
}

type TodoTableColumns = Pick<Todo, 'title' | 'createdAt' | 'updatedAt' | 'priority' | 'state'>


export const TodoListTable = ({ todos }: TodoListTableProps) => {
    const { t } = useTranslation(["todo"])

    const columns: ColumnsType<TodoTableColumns> = [
        {
            key: 'title',
            // title: t('todo.'),
            dataIndex: 'title',
        },
        {
            key: 'state',
            title: 'state',
            dataIndex: 'state',
        },
        {
            key: 'updatedAt',
            title: 'updatedAt',
            dataIndex: 'updatedAt',
        },

        {
            key: 'createdAt',
            title: 'createdAt',
            dataIndex: 'createdAt',
        }
    ]

    return (
        <Table<TodoTableColumns> columns={columns}>

        </Table>
    )
}