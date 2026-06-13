export class CarDefinitions {
  constructor() {
    this.cars = [
      // Supercar Class
      { name: 'LaFerrari', class: 'Supercar', color: 0xff0000, maxSpeed: 320, accel: 0.8, handling: 0.7 },
      { name: 'Veneno', class: 'Supercar', color: 0x0044ff, maxSpeed: 325, accel: 0.85, handling: 0.65 },
      { name: 'Vulcan', class: 'Supercar', color: 0x111111, maxSpeed: 310, accel: 0.75, handling: 0.75 },
      { name: 'McLaren P1', class: 'Supercar', color: 0xc0c0c0, maxSpeed: 322, accel: 0.82, handling: 0.7 },
      { name: '918 Spyder', class: 'Supercar', color: 0xffd700, maxSpeed: 315, accel: 0.78, handling: 0.72 },
      // Hypercar Class
      { name: 'Agera RS', class: 'Hypercar', color: 0xff6600, maxSpeed: 350, accel: 0.9, handling: 0.6 },
      { name: 'Huayra', class: 'Hypercar', color: 0x8800ff, maxSpeed: 345, accel: 0.88, handling: 0.65 },
      { name: 'Veyron', class: 'Hypercar', color: 0x00aa00, maxSpeed: 355, accel: 0.92, handling: 0.55 },
      { name: 'BMW M1', class: 'Hypercar', color: 0x0044cc, maxSpeed: 280, accel: 0.7, handling: 0.8 },
      { name: 'Shelby GT350R', class: 'Hypercar', color: 0xcc0000, maxSpeed: 290, accel: 0.72, handling: 0.78 },
      // Muscle Car Class
      { name: 'Challenger SRT', class: 'Muscle', color: 0x111111, maxSpeed: 285, accel: 0.75, handling: 0.6 },
      { name: 'Camaro Z28', class: 'Muscle', color: 0xc0c0c0, maxSpeed: 280, accel: 0.73, handling: 0.62 },
      { name: 'Mustang GT', class: 'Muscle', color: 0xcc0000, maxSpeed: 282, accel: 0.74, handling: 0.63 },
      { name: 'Bullet', class: 'Muscle', color: 0x0044cc, maxSpeed: 290, accel: 0.76, handling: 0.65 },
      { name: 'Dodge Viper', class: 'Muscle', color: 0xffdd00, maxSpeed: 295, accel: 0.78, handling: 0.58 },
      // Exotic Class
      { name: 'Evora', class: 'Exotic', color: 0xffffff, maxSpeed: 290, accel: 0.72, handling: 0.75 },
      { name: 'Mercedes SLS', class: 'Exotic', color: 0x111111, maxSpeed: 300, accel: 0.76, handling: 0.72 },
      { name: 'Ferrari 458', class: 'Exotic', color: 0xff0000, maxSpeed: 305, accel: 0.78, handling: 0.74 },
      { name: 'Huracan', class: 'Exotic', color: 0x0044ff, maxSpeed: 310, accel: 0.8, handling: 0.7 },
      { name: 'Audi R8', class: 'Exotic', color: 0xc0c0c0, maxSpeed: 308, accel: 0.79, handling: 0.73 },
      // Tuner Class
      { name: 'GT-R', class: 'Tuner', color: 0xff6600, maxSpeed: 295, accel: 0.8, handling: 0.7 },
      { name: 'RX-7', class: 'Tuner', color: 0x8800ff, maxSpeed: 285, accel: 0.77, handling: 0.78 },
      { name: 'Impreza', class: 'Tuner', color: 0x00aa00, maxSpeed: 290, accel: 0.78, handling: 0.8 },
      { name: 'Civic Type R', class: 'Tuner', color: 0xffdd00, maxSpeed: 280, accel: 0.75, handling: 0.82 },
      { name: 'Lancer', class: 'Tuner', color: 0x111111, maxSpeed: 288, accel: 0.76, handling: 0.79 },
    ];
  }

  getAll() { return this.cars; }
  get(index) { return this.cars[index]; }
  getCount() { return this.cars.length; }
}
