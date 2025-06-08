// src/mocks/projects.ts
import { Project } from '../types/Project';

export const mockProjects: Project[] = [
  {
    id: '1',
    name: '週末旅行',
    amountToPay: 0,
    amountToReceive: 0,
    imageUrl: '/images/images.jpg',
    participantAvatars: [
      '/images/0528-free-image-m.png',
      '/images/images (1).jpg',
      '/images/0528-free-image-m.png'
    ],
    isSettled: true,
    debtBreakdown: [
      { from: 'Aki', to: 'You', amount: 2000 },
      { from: 'You', to: 'Tomo', amount: 1000 }
    ]
  },
  {
    id: '2',
    name: '週末旅行',
    amountToPay: 0,
    amountToReceive: 12000,
    imageUrl: '/images/images.jpg',
    participantAvatars: [
      '/images/0528-free-image-m.png',
      '/images/0528-free-image-m.png',
      '/images/0528-free-image-m.png'
    ],
    debtBreakdown: [
      { from: 'Ken', to: 'You', amount: 4000 },
      { from: 'Liam', to: 'You', amount: 8000 }
    ]
  }
];