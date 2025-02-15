export class TopNewsletterDto {
    newsletterId: string;
    total: number;

    constructor(newsletterId: string, total: number) {
        this.newsletterId = newsletterId;
        this.total = total;
    }
}