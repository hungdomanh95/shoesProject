import {
  sales1,
  sales2,
  sales3,
  iconNike,
  iconAdidas,
  iconReebok,
  iconPuma,
  iconVans,
  iconConverse,
} from '../assets';

export const listSignUp = [
  {
    name: 'Email',
    placeholder: 'example@gmail.com',
    duration: 400,
    from: 200,
  },
  {
    name: 'Name',
    placeholder: 'Name',
    duration: 450,
    from: 200,
  },
  {
    name: 'Phone',
    placeholder: 'Phone',
    duration: 500,
    from: 200,
  },
  {
    name: 'Password',
    placeholder: 'Password',
    duration: 550,
    from: 200,
  },
];
export const listSignIn = [
  {
    name: 'Email',
    placeholder: 'example@gmail.com',
    duration: 500,
    from: 150,
  },
  {
    name: 'Password',
    placeholder: 'Password',
    duration: 700,
    from: 150,
  },
];
export const listSales = [
  {
    id: 1,
    image: sales1,
  },
  {
    id: 2,
    image: sales2,
  },
  {
    id: 3,
    image: sales3,
  },
];
export const listCategories = [
  {
    id: 1,
    name: 'Nike',
    icon: iconNike,
  },
  {
    id: 2,
    name: 'Adidas',
    icon: iconAdidas,
  },
  {
    id: 3,
    name: 'Reebok',
    icon: iconReebok,
  },
  {
    id: 4,
    name: 'Puma',
    icon: iconPuma,
  },
];
export const listProductAddMore = [
  {
    alias: 'Nike Jordan Shoes',
    categories:
      '[{"id":"NIKE","category":"NIKE"},{"id":"MEN","category":"MEN"},{"id":"WOMEN","category":"WOMEN"}]',
    deleted: false,
    description:
      "Nike shoe is the rare high-percentage shooter who's also a coach's dream on D. Designed for his unrivaled 2-way game, the PG 4 unveils a new cushioning system that's lightweight, articulated and responsive, ideal for players like PG who go hard every play.\r\n\r\n",
    favorite: false,
    feature: false,
    id: 100,
    image: require('../assets/image/dataShoes/AirJordan1Mid/GymRed/1.jpeg'),
    name: 'Air Jordan 1 Mid',
    price: 450,
    quantity: 582,
    relatedProducts: '[15,14,13]',
    shortDescription: 'Paul George is the rare high-percentage shooter',
    size: [36,37,38,39,40,41,42],
    sourceImg:true,
    imgByColor:[
      {
        title:"Gym Red",
        color:"#D90303",
        listImgProductByColor:[
          require('../assets/image/dataShoes/AirJordan1Mid/GymRed/1.jpeg'),
          require('../assets/image/dataShoes/AirJordan1Mid/GymRed/2.png'),
          require('../assets/image/dataShoes/AirJordan1Mid/GymRed/3.png'),
          require('../assets/image/dataShoes/AirJordan1Mid/GymRed/4.png'),
          require('../assets/image/dataShoes/AirJordan1Mid/GymRed/5.png'),
          require('../assets/image/dataShoes/AirJordan1Mid/GymRed/6.png'),
        ]
      },
      {
        title:"Green Glow",
        color:"#A3DB2C",
        listImgProductByColor:[
          require('../assets/image/dataShoes/AirJordan1Mid/GreenGlow/1.jpeg'),
          require('../assets/image/dataShoes/AirJordan1Mid/GreenGlow/2.png'),
          require('../assets/image/dataShoes/AirJordan1Mid/GreenGlow/3.png'),
          require('../assets/image/dataShoes/AirJordan1Mid/GreenGlow/4.png'),
        ]
      },
      {
        title:"Light Bone",
        color:"#F75D20",
        listImgProductByColor:[
          require('../assets/image/dataShoes/AirJordan1Mid/LightBone/1.jpeg'),
          require('../assets/image/dataShoes/AirJordan1Mid/LightBone/2.png'),
          require('../assets/image/dataShoes/AirJordan1Mid/LightBone/3.png'),
          require('../assets/image/dataShoes/AirJordan1Mid/LightBone/4.png'),
          require('../assets/image/dataShoes/AirJordan1Mid/LightBone/5.png'),
          require('../assets/image/dataShoes/AirJordan1Mid/LightBone/6.png'),
        ]
      },
      {
        title:"Light Smoke Gray",
        color:"#A8A8A8",
        listImgProductByColor:[
          require('../assets/image/dataShoes/AirJordan1Mid/LightSmokeGray/1.jpeg'),
          require('../assets/image/dataShoes/AirJordan1Mid/LightSmokeGray/2.png'),
          require('../assets/image/dataShoes/AirJordan1Mid/LightSmokeGray/3.png'),
          require('../assets/image/dataShoes/AirJordan1Mid/LightSmokeGray/4.png'),
          require('../assets/image/dataShoes/AirJordan1Mid/LightSmokeGray/5.png'),
          require('../assets/image/dataShoes/AirJordan1Mid/LightSmokeGray/6.png'),
        ]
      },
      {
        title:"Racer Blue",
        color:"#2C4696",
        listImgProductByColor:[
          require('../assets/image/dataShoes/AirJordan1Mid/RacerBlue/1.jpeg'),
          require('../assets/image/dataShoes/AirJordan1Mid/RacerBlue/2.png'),
          require('../assets/image/dataShoes/AirJordan1Mid/RacerBlue/3.png'),
          require('../assets/image/dataShoes/AirJordan1Mid/RacerBlue/4.png'),
          require('../assets/image/dataShoes/AirJordan1Mid/RacerBlue/5.png'),
          require('../assets/image/dataShoes/AirJordan1Mid/RacerBlue/6.png'),
        ]
      },
    ]
  },
  {
    alias: 'Nike Jordan Shoes',
    categories:
      '[{"id":"NIKE","category":"NIKE"},{"id":"MEN","category":"MEN"},{"id":"WOMEN","category":"WOMEN"}]',
    deleted: false,
    description:
      "Nike shoe is the rare high-percentage shooter who's also a coach's dream on D. Designed for his unrivaled 2-way game, the PG 4 unveils a new cushioning system that's lightweight, articulated and responsive, ideal for players like PG who go hard every play.\r\n\r\n",
    favorite: false,
    feature: false,
    id: 101,
    image: require('../assets/image/dataShoes/AirJordan3Retro/1.jpeg'),
    name: 'Air Jordan 3 Retro',
    price: 450,
    quantity: 582,
    relatedProducts: '[15,14,13]',
    shortDescription: 'Paul George is the rare high-percentage shooter',
    size: [36,37,38,39,40,41,42],
    sourceImg:true,
    imgByColor:[
      {
        title:"Air Jordan 3 Retro",
        color:"#004389",
        listImgProductByColor:[
          require('../assets/image/dataShoes/AirJordan3Retro/1.jpeg'),
          require('../assets/image/dataShoes/AirJordan3Retro/2.jpeg'),
          require('../assets/image/dataShoes/AirJordan3Retro/3.jpeg'),
          require('../assets/image/dataShoes/AirJordan3Retro/4.jpeg'),
          require('../assets/image/dataShoes/AirJordan3Retro/5.jpeg'),
          require('../assets/image/dataShoes/AirJordan3Retro/6.jpeg'),
        ]
      },
    ]
  },
  {
    alias: 'Nike Jordan Shoes',
    categories:
      '[{"id":"NIKE","category":"NIKE"},{"id":"MEN","category":"MEN"},{"id":"WOMEN","category":"WOMEN"}]',
    deleted: false,
    description:
      "Nike shoe is the rare high-percentage shooter who's also a coach's dream on D. Designed for his unrivaled 2-way game, the PG 4 unveils a new cushioning system that's lightweight, articulated and responsive, ideal for players like PG who go hard every play.\r\n\r\n",
    favorite: false,
    feature: false,
    id: 102,
    image: require('../assets/image/dataShoes/AirJordan7/1.jpeg'),
    name: 'Air Jordan 7',
    price: 450,
    quantity: 582,
    relatedProducts: '[15,14,13]',
    shortDescription: 'Paul George is the rare high-percentage shooter',
    size: [36,37,38,39,40,41,42],
    sourceImg:true,
    imgByColor:[
      {
        title:"Air Jordan 7",
        color:"#646A6E",
        listImgProductByColor:[
          require('../assets/image/dataShoes/AirJordan7/1.jpeg'),
          require('../assets/image/dataShoes/AirJordan7/2.jpeg'),
          require('../assets/image/dataShoes/AirJordan7/3.jpeg'),
          require('../assets/image/dataShoes/AirJordan7/4.jpeg'),
          require('../assets/image/dataShoes/AirJordan7/5.jpeg'),
          require('../assets/image/dataShoes/AirJordan7/6.jpeg'),
        ]
      },
    ]
  },
  {
    alias: 'Nike Jordan Shoes',
    categories:
      '[{"id":"NIKE","category":"NIKE"},{"id":"MEN","category":"MEN"},{"id":"WOMEN","category":"WOMEN"}]',
    deleted: false,
    description:
      "Nike shoe is the rare high-percentage shooter who's also a coach's dream on D. Designed for his unrivaled 2-way game, the PG 4 unveils a new cushioning system that's lightweight, articulated and responsive, ideal for players like PG who go hard every play.\r\n\r\n",
    favorite: false,
    feature: false,
    id: 103,
    image: require('../assets/image/dataShoes/JordanMA2/GymRed/1.jpeg'),
    name: 'Air Jordan MA2',
    price: 450,
    quantity: 582,
    relatedProducts: '[15,14,13]',
    shortDescription: 'Paul George is the rare high-percentage shooter',
    size: [36,37,38,39,40,41,42],
     sourceImg:true,
    imgByColor:[
      {
        title:"Gym Red",
        color:"#7C010F",
        listImgProductByColor:[
          require('../assets/image/dataShoes/JordanMA2/GymRed/1.jpeg'),
          require('../assets/image/dataShoes/JordanMA2/GymRed/2.png'),
          require('../assets/image/dataShoes/JordanMA2/GymRed/3.png'),
          require('../assets/image/dataShoes/JordanMA2/GymRed/4.png'),
          require('../assets/image/dataShoes/JordanMA2/GymRed/5.png'),
          require('../assets/image/dataShoes/JordanMA2/GymRed/6.png'),
        ]
      },
      {
        title:"Light Armoury",
        color:"#5A9EAB",
        listImgProductByColor:[
          require('../assets/image/dataShoes/JordanMA2/LightArmoury/1.jpeg'),
          require('../assets/image/dataShoes/JordanMA2/LightArmoury/2.png'),
          require('../assets/image/dataShoes/JordanMA2/LightArmoury/3.png'),
          require('../assets/image/dataShoes/JordanMA2/LightArmoury/4.png'),
          require('../assets/image/dataShoes/JordanMA2/LightArmoury/5.png'),
          require('../assets/image/dataShoes/JordanMA2/LightArmoury/6.png'),
        ]
      },
      {
        title:"Pale Ivory",
        color:"#B2DD6B",
        listImgProductByColor:[
          require('../assets/image/dataShoes/JordanMA2/PaleIvory/1.jpeg'),
          require('../assets/image/dataShoes/JordanMA2/PaleIvory/2.png'),
          require('../assets/image/dataShoes/JordanMA2/PaleIvory/3.png'),
          require('../assets/image/dataShoes/JordanMA2/PaleIvory/4.png'),
          require('../assets/image/dataShoes/JordanMA2/PaleIvory/5.png'),
          require('../assets/image/dataShoes/JordanMA2/PaleIvory/6.png'),
        ]
      },
      {
        title:"Signal Blue",
        color:"#135EA1",
        listImgProductByColor:[
          require('../assets/image/dataShoes/JordanMA2/SignalBlue/1.jpeg'),
          require('../assets/image/dataShoes/JordanMA2/SignalBlue/2.png'),
          require('../assets/image/dataShoes/JordanMA2/SignalBlue/3.png'),
          require('../assets/image/dataShoes/JordanMA2/SignalBlue/4.png'),
          require('../assets/image/dataShoes/JordanMA2/SignalBlue/5.png'),
          require('../assets/image/dataShoes/JordanMA2/SignalBlue/6.png'),
        ]
      },
      {
        title:"University Red",
        color:"#D6103B",
        listImgProductByColor:[
          require('../assets/image/dataShoes/JordanMA2/UniversityRed/1.jpeg'),
          require('../assets/image/dataShoes/JordanMA2/UniversityRed/2.png'),
          require('../assets/image/dataShoes/JordanMA2/UniversityRed/3.png'),
          require('../assets/image/dataShoes/JordanMA2/UniversityRed/4.png'),
          require('../assets/image/dataShoes/JordanMA2/UniversityRed/5.png'),
          require('../assets/image/dataShoes/JordanMA2/UniversityRed/6.png'),
        ]
      },
    ]
  },
];
