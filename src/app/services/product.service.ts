import { Injectable } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: { name: string; order: number; items: Product[] }[] = [
    {
      name: 'Fleeces',
      order: 1,
      items: [
        {
          description: `Fire, Lightning, Earth, Water and Wind (火雷土水風) are the five kanji symbols used at the back of the fleece. They represent the five Kage with a quote paraphrased from Itachi about being "acknowledged by the people" when you're someone who can lead a nation.`,
          images: [
            {
              alt: '',
              src: 'https://firebasestorage.googleapis.com/v0/b/project-linkage.appspot.com/o/Fleeces%2FBlack%20Fleece%2FANIME%20NARUTO%20CLOTHING%20IRISH%20WEEABOO%20OTAKU%20IRELAND%20BRAND.png?alt=media&token=70ddc23a-ec2e-447c-abe7-057d1284448c',
              order: 0,
            },
          ],
          name: 'Black Fleece',
          order: 0,
          price: 34.99,
          sizes: ['S', 'M', 'L', 'XL'],
        },
        {
          description: `Fire, Lightning, Earth, Water and Wind (火雷土水風) are the five kanji symbols used at the back of the fleece. They represent the five Kage with a quote paraphrased from Itachi about being "acknowledged by the people" when you're someone who can lead a nation.`,
          images: [
            {
              alt: '',
              src: 'https://firebasestorage.googleapis.com/v0/b/project-linkage.appspot.com/o/Fleeces%2FBlack%20Fleece%2FANIME%20NARUTO%20CLOTHING%20IRISH%20WEEABOO%20OTAKU%20IRELAND%20BRAND.png?alt=media&token=70ddc23a-ec2e-447c-abe7-057d1284448c',
              order: 0,
            },
          ],
          name: 'Black Fleece',
          order: 0,
          price: 34.99,
          sizes: ['S', 'M', 'L', 'XL'],
        },
        {
          description: `Fire, Lightning, Earth, Water and Wind (火雷土水風) are the five kanji symbols used at the back of the fleece. They represent the five Kage with a quote paraphrased from Itachi about being "acknowledged by the people" when you're someone who can lead a nation.`,
          images: [
            {
              alt: '',
              src: 'https://firebasestorage.googleapis.com/v0/b/project-linkage.appspot.com/o/Fleeces%2FBlack%20Fleece%2FANIME%20NARUTO%20CLOTHING%20IRISH%20WEEABOO%20OTAKU%20IRELAND%20BRAND.png?alt=media&token=70ddc23a-ec2e-447c-abe7-057d1284448c',
              order: 0,
            },
          ],
          name: 'Black Fleece',
          order: 0,
          price: 34.99,
          sizes: ['S', 'M', 'L', 'XL'],
        },
      ],
    },
    {
      name: 'Beanies',
      order: 0,
      items: [
        {
          description: `Leaf - This symbol represents "Konohagakure" (from the Village Hidden in the Leaves)`,
          images: [
            {
              alt: '',
              src: 'https://firebasestorage.googleapis.com/v0/b/project-linkage.appspot.com/o/Beanies%2FHidden%20Leaf%20Beanie%2FANIME%20COSPLAYER%20ATTACK%20ON%20TITAN%20COSPLAY%20KEY%20WEEB%20OTAKU%20WEEABOO.png?alt=media&token=bc95dc1e-f52d-4fc4-b165-b192670f39f9',
              order: 0,
            },
          ],
          name: 'Hidden Leaf Beanie',
          order: 0,
          price: 12.99,
          sizes: [],
        },
        {
          description: `Leaf - This symbol represents "Konohagakure" (from the Village Hidden in the Leaves)`,
          images: [
            {
              alt: '',
              src: 'https://firebasestorage.googleapis.com/v0/b/project-linkage.appspot.com/o/Beanies%2FHidden%20Leaf%20Beanie%2FANIME%20COSPLAYER%20ATTACK%20ON%20TITAN%20COSPLAY%20KEY%20WEEB%20OTAKU%20WEEABOO.png?alt=media&token=bc95dc1e-f52d-4fc4-b165-b192670f39f9',
              order: 0,
            },
          ],
          name: 'Hidden Leaf Beanie',
          order: 0,
          price: 12.99,
          sizes: [],
        },
        {
          description: `Leaf - This symbol represents "Konohagakure" (from the Village Hidden in the Leaves)`,
          images: [
            {
              alt: '',
              src: 'https://firebasestorage.googleapis.com/v0/b/project-linkage.appspot.com/o/Beanies%2FHidden%20Leaf%20Beanie%2FANIME%20COSPLAYER%20ATTACK%20ON%20TITAN%20COSPLAY%20KEY%20WEEB%20OTAKU%20WEEABOO.png?alt=media&token=bc95dc1e-f52d-4fc4-b165-b192670f39f9',
              order: 0,
            },
          ],
          name: 'Hidden Leaf Beanie',
          order: 0,
          price: 12.99,
          sizes: [],
        },
        {
          description: `Leaf - This symbol represents "Konohagakure" (from the Village Hidden in the Leaves)`,
          images: [
            {
              alt: '',
              src: 'https://firebasestorage.googleapis.com/v0/b/project-linkage.appspot.com/o/Beanies%2FHidden%20Leaf%20Beanie%2FANIME%20COSPLAYER%20ATTACK%20ON%20TITAN%20COSPLAY%20KEY%20WEEB%20OTAKU%20WEEABOO.png?alt=media&token=bc95dc1e-f52d-4fc4-b165-b192670f39f9',
              order: 0,
            },
          ],
          name: 'Hidden Leaf Beanie',
          order: 0,
          price: 12.99,
          sizes: [],
        },
        {
          description: `Leaf - This symbol represents "Konohagakure" (from the Village Hidden in the Leaves)`,
          images: [
            {
              alt: '',
              src: 'https://firebasestorage.googleapis.com/v0/b/project-linkage.appspot.com/o/Beanies%2FHidden%20Leaf%20Beanie%2FANIME%20COSPLAYER%20ATTACK%20ON%20TITAN%20COSPLAY%20KEY%20WEEB%20OTAKU%20WEEABOO.png?alt=media&token=bc95dc1e-f52d-4fc4-b165-b192670f39f9',
              order: 0,
            },
          ],
          name: 'Hidden Leaf Beanie',
          order: 0,
          price: 12.99,
          sizes: [],
        },
        {
          description: `Leaf - This symbol represents "Konohagakure" (from the Village Hidden in the Leaves)`,
          images: [
            {
              alt: '',
              src: 'https://firebasestorage.googleapis.com/v0/b/project-linkage.appspot.com/o/Beanies%2FHidden%20Leaf%20Beanie%2FANIME%20COSPLAYER%20ATTACK%20ON%20TITAN%20COSPLAY%20KEY%20WEEB%20OTAKU%20WEEABOO.png?alt=media&token=bc95dc1e-f52d-4fc4-b165-b192670f39f9',
              order: 0,
            },
          ],
          name: 'Hidden Leaf Beanie',
          order: 0,
          price: 12.99,
          sizes: [],
        },
      ],
    },
    {
      name: 'Durags',
      order: 2,
      items: [
        {
          description: `These durags help to add more flavour to your average outfits. It is said that anyone who buys and wears a durag from us, notices their movement speed increases and they are more likely to win at the sport they are playing while it is on.       These are just rumours so test it out for yourself!`,
          images: [
            {
              alt: '',
              src: 'https://firebasestorage.googleapis.com/v0/b/project-linkage.appspot.com/o/Durags%2FBlack%20Durag%2FBLACK%20ANIME%20IRISH%20CLOTHING%20OTAKU%20WEEB%20IRELAND%20FAN.png?alt=media&token=c97a192a-f4c0-42a9-b8a4-30e2ecaef7ec',
              order: 0,
            },
          ],
          name: 'Black Durag',
          order: 0,
          price: 4.99,
          sizes: [],
        },
      ],
    },
  ];
  constructor() {}
  sortBy(array: any[], prop: string) {
    return array.sort((a, b) =>
      a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1
    );
  }
}
