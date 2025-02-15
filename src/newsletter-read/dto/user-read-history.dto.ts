export class UserReadHistoryDto {
    newsletterId: string;
    readAt: Date;

    constructor(newsletterId: string, readAt: Date) {
        this.newsletterId = newsletterId;
        this.readAt = readAt;
    }
}