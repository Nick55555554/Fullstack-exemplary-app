export interface CreateTodoDto {
    content: string;
    title: string;
}
export type UpdateTodoDto = Partial<CreateTodoDto> & {
    isActive?: boolean;
};
