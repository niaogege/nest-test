export class CreateCtatsDto {
  public name!: string;
  public age: number;
  public breed: string;
  constructor() {
    this.name = 'cpp';
    this.age = 1;
    this.breed = 'breedbreed';
  }
}
