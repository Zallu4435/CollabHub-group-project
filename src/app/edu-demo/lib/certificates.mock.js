'use client';

// Mock certificates data
export const CERTIFICATES = [
  {
    id: 'CERT-2024-001-RC',
    certificateNumber: 'EDU-RC-2024-001',
    type: 'course', // course | diploma
    learnerName: 'Alex Johnson',
    learnerId: 'user-1',
    courseId: 'course-1',
    courseTitle: 'Complete React Development Bootcamp',
    track: 'direct', // direct | diploma
    completionDate: '2024-01-20',
    issuedDate: '2024-01-21',
    expiryDate: null, // null for no expiry
    status: 'active', // active | revoked | expired
    grade: 'A',
    finalScore: 92,
    totalHours: 48,
    instructor: {
      name: 'Sarah Chen',
      title: 'Senior Full-Stack Developer',
      signature: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIj48dGV4dCB4PSIxMCIgeT0iMjUiPkRpZ2l0YWwgU2lnbmF0dXJlPC90ZXh0Pjwvc3ZnPg==',
    },
    organization: {
      name: 'EduPlatform',
      logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=eduplatform',
      accreditation: 'Accredited by Tech Education Board',
    },
    skills: ['React', 'JavaScript', 'Hooks', 'Context API', 'Component Design'],
    verificationUrl: 'https://eduplatform.com/verify/CERT-2024-001-RC',
    blockchainHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
    qrCode: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IndoaXRlIiBzdHJva2U9ImJsYWNrIi8+PHRleHQgeD0iMzAiIHk9IjU1Ij5RUjwvdGV4dD48L3N2Zz4=',
    metadata: {
      issuerSignature: 'digital_signature_hash_here',
      timestamp: '2024-01-21T10:30:00Z',
      version: '1.0',
    },
  },
  {
    id: 'CERT-2024-002-ND',
    certificateNumber: 'EDU-ND-2024-002',
    type: 'course',
    learnerName: 'Maria Rodriguez',
    learnerId: 'user-2',
    courseId: 'course-2',
    courseTitle: 'Node.js & Express Backend Mastery',
    track: 'diploma',
    completionDate: '2024-02-15',
    issuedDate: '2024-02-16',
    expiryDate: null,
    status: 'active',
    grade: 'A+',
    finalScore: 96,
    totalHours: 40,
    instructor: {
      name: 'Marcus Johnson',
      title: 'DevOps Engineer',
      signature: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIj48dGV4dCB4PSIxMCIgeT0iMjUiPkRpZ2l0YWwgU2lnbmF0dXJlPC90ZXh0Pjwvc3ZnPg==',
    },
    organization: {
      name: 'EduPlatform',
      logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=eduplatform',
      accreditation: 'Accredited by Tech Education Board',
    },
    skills: ['Node.js', 'Express', 'MongoDB', 'API Design', 'Authentication'],
    verificationUrl: 'https://eduplatform.com/verify/CERT-2024-002-ND',
    blockchainHash: '0x2b3c4d5e6f7890abcdef1234567890abcdef1234',
    qrCode: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IndoaXRlIiBzdHJva2U9ImJsYWNrIi8+PHRleHQgeD0iMzAiIHk9IjU1Ij5RUjwvdGV4dD48L3N2Zz4=',
    metadata: {
      issuerSignature: 'digital_signature_hash_here_2',
      timestamp: '2024-02-16T14:20:00Z',
      version: '1.0',
    },
  },
  {
    id: 'CERT-2024-003-FS',
    certificateNumber: 'EDU-FS-2024-003',
    type: 'diploma',
    learnerName: 'David Kim',
    learnerId: 'user-3',
    courseId: 'course-6',
    courseTitle: 'Full-Stack JavaScript Development Diploma',
    track: 'diploma',
    completionDate: '2024-03-10',
    issuedDate: '2024-03-11',
    expiryDate: null,
    status: 'active',
    grade: 'A',
    finalScore: 89,
    totalHours: 120,
    instructor: {
      name: 'Sarah Chen',
      title: 'Senior Full-Stack Developer',
      signature: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIj48dGV4dCB4PSIxMCIgeT0iMjUiPkRpZ2l0YWwgU2lnbmF0dXJlPC90ZXh0Pjwvc3ZnPg==',
    },
    organization: {
      name: 'EduPlatform',
      logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=eduplatform',
      accreditation: 'Accredited by Tech Education Board',
    },
    skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Full-Stack Development', 'API Integration'],
    verificationUrl: 'https://eduplatform.com/verify/CERT-2024-003-FS',
    blockchainHash: '0x3c4d5e6f7890abcdef1234567890abcdef123456',
    qrCode: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IndoaXRlIiBzdHJva2U9ImJsYWNrIi8+PHRleHQgeD0iMzAiIHk9IjU1Ij5RUjwvdGV4dD48L3N2Zz4=',
    metadata: {
      issuerSignature: 'digital_signature_hash_here_3',
      timestamp: '2024-03-11T09:15:00Z',
      version: '1.0',
    },
  },
];

// Certificate templates for different types
export const CERTIFICATE_TEMPLATES = {
  course: {
    title: 'Certificate of Completion',
    subtitle: 'This certifies that',
    description: 'has successfully completed the course',
    footer: 'and demonstrated proficiency in the required skills and knowledge.',
  },
  diploma: {
    title: 'Professional Diploma',
    subtitle: 'This certifies that',
    description: 'has successfully completed the diploma program',
    footer: 'and has met all requirements for professional certification.',
  },
};

// Verification statuses
export const VERIFICATION_STATUS = {
  valid: {
    icon: '✅',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    message: 'This certificate is valid and verified.',
  },
  expired: {
    icon: '⏰',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    message: 'This certificate has expired.',
  },
  revoked: {
    icon: '❌',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    message: 'This certificate has been revoked.',
  },
  invalid: {
    icon: '⚠️',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    message: 'This certificate could not be verified.',
  },
};

// Skills categories for certificates
export const SKILL_CATEGORIES = {
  'Frontend': ['React', 'JavaScript', 'HTML', 'CSS', 'Vue.js', 'Angular'],
  'Backend': ['Node.js', 'Express', 'Python', 'Django', 'PHP', 'Laravel'],
  'Database': ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis', 'Firebase'],
  'DevOps': ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux'],
  'Design': ['Figma', 'Adobe XD', 'UI/UX', 'Prototyping', 'Design Systems'],
  'Data Science': ['Python', 'Pandas', 'NumPy', 'Machine Learning', 'TensorFlow'],
};
