// market/src/lib/mock-data/reviews.ts

export interface Review {
  id: string;
  projectId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  helpful: number;
  verified: boolean;
  images?: string[];
}

export const reviews: Review[] = [
  {
    id: 'review_1',
    projectId: 'project_1',
    userId: 'user_1',
    userName: 'John Smith',
    userAvatar: 'https://ui-avatars.com/api/?name=John+Smith&background=4F46E5&color=fff',
    rating: 5,
    title: 'Excellent React template!',
    comment: 'This template is exactly what I needed for my project. The code is clean, well-documented, and easy to customize. The design is modern and responsive. Highly recommended!',
    createdAt: '2024-01-15T10:30:00Z',
    helpful: 12,
    verified: true
  },
  {
    id: 'review_2',
    projectId: 'project_1',
    userId: 'user_2',
    userName: 'Sarah Johnson',
    userAvatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=EC4899&color=fff',
    rating: 4,
    title: 'Great template with minor issues',
    comment: 'Overall a great template. The design is beautiful and the code quality is good. Had some minor issues with the mobile responsiveness, but they were easy to fix.',
    createdAt: '2024-01-12T14:20:00Z',
    helpful: 8,
    verified: true
  },
  {
    id: 'review_3',
    projectId: 'project_2',
    userId: 'user_3',
    userName: 'Mike Davis',
    userAvatar: 'https://ui-avatars.com/api/?name=Mike+Davis&background=10B981&color=fff',
    rating: 5,
    title: 'Perfect for my startup!',
    comment: 'This landing page template was perfect for our startup launch. The conversion rate improved significantly after implementing it. The seller was very responsive to questions.',
    createdAt: '2024-01-10T09:15:00Z',
    helpful: 15,
    verified: true
  },
  {
    id: 'review_4',
    projectId: 'project_2',
    userId: 'user_4',
    userName: 'Emily Wilson',
    userAvatar: 'https://ui-avatars.com/api/?name=Emily+Wilson&background=F59E0B&color=fff',
    rating: 5,
    title: 'Amazing design and functionality',
    comment: 'The design is absolutely stunning and the functionality is exactly as described. The code is well-structured and easy to understand. Worth every penny!',
    createdAt: '2024-01-08T16:45:00Z',
    helpful: 20,
    verified: true
  },
  {
    id: 'review_5',
    projectId: 'project_3',
    userId: 'user_5',
    userName: 'Alex Chen',
    userAvatar: 'https://ui-avatars.com/api/?name=Alex+Chen&background=8B5CF6&color=fff',
    rating: 4,
    title: 'Good mobile app template',
    comment: 'Solid React Native template with good structure. The documentation could be better, but the code is clean and the app works well on both iOS and Android.',
    createdAt: '2024-01-05T11:30:00Z',
    helpful: 6,
    verified: true
  },
  {
    id: 'review_6',
    projectId: 'project_3',
    userId: 'user_6',
    userName: 'Lisa Brown',
    userAvatar: 'https://ui-avatars.com/api/?name=Lisa+Brown&background=EF4444&color=fff',
    rating: 5,
    title: 'Exactly what I needed',
    comment: 'This template saved me weeks of development time. The authentication flow is well-implemented and the UI components are reusable. Great job!',
    createdAt: '2024-01-03T13:20:00Z',
    helpful: 9,
    verified: true
  },
  {
    id: 'review_7',
    projectId: 'project_4',
    userId: 'user_7',
    userName: 'David Miller',
    userAvatar: 'https://ui-avatars.com/api/?name=David+Miller&background=06B6D4&color=fff',
    rating: 4,
    title: 'Good e-commerce template',
    comment: 'The template is well-designed and functional. The checkout process works smoothly. Would have liked more payment gateway options, but overall satisfied.',
    createdAt: '2024-01-01T08:15:00Z',
    helpful: 7,
    verified: true
  },
  {
    id: 'review_8',
    projectId: 'project_4',
    userId: 'user_8',
    userName: 'Anna Taylor',
    userAvatar: 'https://ui-avatars.com/api/?name=Anna+Taylor&background=84CC16&color=fff',
    rating: 5,
    title: 'Perfect for my online store',
    comment: 'This e-commerce template is exactly what I needed. The admin panel is intuitive and the customer-facing design is beautiful. Highly recommended!',
    createdAt: '2023-12-28T15:30:00Z',
    helpful: 11,
    verified: true
  },
  {
    id: 'review_9',
    projectId: 'project_5',
    userId: 'user_9',
    userName: 'Robert Anderson',
    userAvatar: 'https://ui-avatars.com/api/?name=Robert+Anderson&background=F97316&color=fff',
    rating: 5,
    title: 'Outstanding dashboard template',
    comment: 'The dashboard template is incredibly well-designed and functional. The data visualization components are excellent and the code is very clean. Great work!',
    createdAt: '2023-12-25T12:45:00Z',
    helpful: 18,
    verified: true
  },
  {
    id: 'review_10',
    projectId: 'project_5',
    userId: 'user_10',
    userName: 'Jennifer Lee',
    userAvatar: 'https://ui-avatars.com/api/?name=Jennifer+Lee&background=EC4899&color=fff',
    rating: 4,
    title: 'Great admin template',
    comment: 'Solid admin template with good functionality. The design is clean and professional. Some components could use better documentation, but overall satisfied.',
    createdAt: '2023-12-22T10:20:00Z',
    helpful: 5,
    verified: true
  },
  {
    id: 'review_11',
    projectId: 'project_6',
    userId: 'user_11',
    userName: 'Michael White',
    userAvatar: 'https://ui-avatars.com/api/?name=Michael+White&background=6366F1&color=fff',
    rating: 5,
    title: 'Excellent portfolio template',
    comment: 'This portfolio template is perfect for showcasing my work. The animations are smooth and the design is modern. The code is well-organized and easy to customize.',
    createdAt: '2023-12-20T14:10:00Z',
    helpful: 13,
    verified: true
  },
  {
    id: 'review_12',
    projectId: 'project_6',
    userId: 'user_12',
    userName: 'Amanda Clark',
    userAvatar: 'https://ui-avatars.com/api/?name=Amanda+Clark&background=10B981&color=fff',
    rating: 4,
    title: 'Good portfolio design',
    comment: 'Nice portfolio template with good design. The responsive layout works well on all devices. Would have liked more customization options, but overall good.',
    createdAt: '2023-12-18T09:30:00Z',
    helpful: 4,
    verified: true
  },
  {
    id: 'review_13',
    projectId: 'project_7',
    userId: 'user_13',
    userName: 'Christopher Martinez',
    userAvatar: 'https://ui-avatars.com/api/?name=Christopher+Martinez&background=F59E0B&color=fff',
    rating: 5,
    title: 'Amazing UI kit!',
    comment: 'This UI kit is comprehensive and well-designed. The components are reusable and the design system is consistent. Saved me a lot of time in my project.',
    createdAt: '2023-12-15T16:25:00Z',
    helpful: 16,
    verified: true
  },
  {
    id: 'review_14',
    projectId: 'project_7',
    userId: 'user_14',
    userName: 'Jessica Thompson',
    userAvatar: 'https://ui-avatars.com/api/?name=Jessica+Thompson&background=EF4444&color=fff',
    rating: 4,
    title: 'Great component library',
    comment: 'Good collection of UI components with clean code. The documentation is helpful and the components are easy to integrate. Would recommend!',
    createdAt: '2023-12-12T11:40:00Z',
    helpful: 8,
    verified: true
  },
  {
    id: 'review_15',
    projectId: 'project_8',
    userId: 'user_15',
    userName: 'Daniel Garcia',
    userAvatar: 'https://ui-avatars.com/api/?name=Daniel+Garcia&background=8B5CF6&color=fff',
    rating: 5,
    title: 'Perfect blog template',
    comment: 'This blog template is exactly what I needed. The design is clean and the functionality is perfect. The SEO optimization is excellent. Highly recommended!',
    createdAt: '2023-12-10T13:15:00Z',
    helpful: 14,
    verified: true
  }
];
