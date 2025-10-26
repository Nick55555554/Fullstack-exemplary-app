import {MobxQuery} from '@/shared/lib/api/mobx-react-query';

export class TodosStore {
    todosQuery = new MobxQuery(() => ({
        queryKey: ['todos'],
        queryFn: 
    }));
}
