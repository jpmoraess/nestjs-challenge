import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class NewsletterRead {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    newsletterId: string;

    @CreateDateColumn()
    readAt: Date

    @ManyToOne(() => User)
    @JoinColumn({ name: "userId" })
    user: User;

    @Column()
    userId: number
}