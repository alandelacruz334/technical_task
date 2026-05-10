
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, length: 50 })
  nickname: string;

  @Column({ length: 255 })
  password: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  name: string | null;

  @Column({ type: "varchar", length: 150, nullable: true })
  surname: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  address: string | null;

  @Column({ unique: true, length: 255 })
  email: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}