import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'photos',
})
class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string;
}

export default Photo;
