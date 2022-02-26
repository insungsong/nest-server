import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity {
  /**
   * id
   *
   * @description uuid_generate_v4()
   */
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    comment: '카파 유저 아이디',
  })
  id!: string;

  /**
   * seq
   *
   * @description bigserial or nextval('<seq>'::regclass)
   */
  @Column({ name: 'seq', type: 'int8', unique: true, comment: '순차 인덱스' })
  @Generated('increment')
  seq!: number;

  /**
   * email
   */
  @Column({
    name: 'email',
    type: 'varchar',
    length: 320,
    comment: '이메일 (로그인 아이디)',
  })
  @Index({
    unique: true,
  })
  email!: string;

  /**
   * password
   */
  @Column({
    name: 'password',
    type: 'varchar',
    length: 255,
    comment: '패스워드 argon2',
  })
  password!: string;

  /**
   * lastLoginAt
   */
  @Column({
    name: 'last_login_at',
    type: 'timestamptz',
    nullable: true,
    comment: '마지막 로그인 시간',
  })
  lastLoginAt?: Date | null;

  /**
   * lastLogoutAt
   */
  @Column({
    name: 'last_logout_at',
    type: 'timestamptz',
    nullable: true,
    comment: '마지막 로그아웃 시간',
  })
  lastLogoutAt?: Date | null;

  /**
   * createdAt
   */
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    comment: '생성일',
    update: false,
  })
  createdAt!: Date;

  /**
   * updatedAt
   */
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    comment: '수정일',
  })
  updatedAt!: Date;
}
