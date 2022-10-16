export enum OrderStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected'
}

export interface Order {
    id: string;
    name: string;
    status: OrderStatus
}