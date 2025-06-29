// Local creator images - downloaded from Pexels
import creator1 from './creator1.jpg';
import creator2 from './creator2.jpg';
import creator3 from './creator3.jpg';
import creator4 from './creator4.jpg';
import creator5 from './creator5.jpg';
import creator6 from './creator6.jpg';
import creator7 from './creator7.jpg';
import creator8 from './creator8.jpg';
import creator9 from './creator9.jpg';
import creator10 from './creator10.jpg';
import creator13 from './creator13.jpg';
import creator14 from './creator14.jpg';
import creator15 from './creator15.jpg';
import creator16 from './creator16.jpg';
import creator17 from './creator17.jpg';
import creator18 from './creator18.jpg';
import creator19 from './creator19.jpg';
import creator20 from './creator20.jpg';
import creator21 from './creator21.jpg';

export const LOCAL_CREATOR_IMAGES = [
  creator1,
  creator2,
  creator3,
  creator4,
  creator5,
  creator6,
  creator7,
  creator8,
  creator9,
  creator10,
  creator13,
  creator14,
  creator15,
  creator16,
  creator17,
  creator18,
  creator19,
  creator20,
  creator21,
];

// Function to get a random local image
export function getRandomLocalCreatorImage(): string {
  return LOCAL_CREATOR_IMAGES[Math.floor(Math.random() * LOCAL_CREATOR_IMAGES.length)];
}

// Function to get multiple random local images
export function getRandomLocalCreatorImages(count: number): string[] {
  const shuffled = [...LOCAL_CREATOR_IMAGES].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
} 