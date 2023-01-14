import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Articles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ default: false })
  is_delete: boolean;

  @CreateDateColumn({
    name: 'create_time',
    nullable: true,
  })
  create_time: Date | null;

  @UpdateDateColumn({
    name: 'update_time',
    nullable: true,
  })
  update_time: Date | null;

  @Column({ default: 'cxy' })
  create_by: string;
}
