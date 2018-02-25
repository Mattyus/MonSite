import { Photo } from './photo';

export const PHOTO: Photo[] = [
  { _id: '1',
    album: 'Maison',
    titre: 'Terrain',
    nom: 'KLER7643.JPG',
    tags: [{display: 'terrain', value: 'terrain'}, {display: 'arbre', value: 'arbre'}],
    date: new Date(),
    utilisateur: 'Mathieu Sallardon'},
  { _id: '2',
    album: 'parapente',
    titre: 'Parapente2',
    nom: 'Parapente 001.jpg',
    tags: [{display: 'parapente', value: 'parapente'}, {display: 'casque', value: 'casque'}],
    date: new Date(),
    utilisateur: 'Mathieu Sallardon'}
];
