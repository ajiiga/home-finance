export interface FinanceOperationCreateDto {
    userId: number;
    operationTypeId: number;
    sum: number;
}

export interface FinanceOperationEditDto extends FinanceOperationCreateDto {
    id: number;
}
