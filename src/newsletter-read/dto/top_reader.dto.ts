export class TopReaderDto {
    userId: number;
    total: number;

    constructor(userId: number, total: number) {
        this.userId = userId;
        this.total = total;
    }
}