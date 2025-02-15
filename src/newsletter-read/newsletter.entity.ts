import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class NewsletterRead {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'newsletter_id'})
    newsletterId: string;

    @CreateDateColumn({name: 'read_at'})
    readAt: Date

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column({name: 'user_id'})
    userId: number
}