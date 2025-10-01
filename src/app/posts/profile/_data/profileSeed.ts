export interface ProfileUser {
  id: string;
  name: string;
  headline: string;
  location?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  connectionsCount?: number;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  employmentType?: string;
  location?: string;
  startDate: string; // ISO
  endDate?: string; // ISO or undefined for present
  description?: string;
}

export interface EducationItem {
  id: string;
  school: string;
  degree?: string;
  field?: string;
  startDate?: string;
  endDate?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  endorsements: number;
}

export interface ProfileSeedPayload {
  user: ProfileUser;
  about: string;
  experiences: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
}

export const profileSeed: ProfileSeedPayload = {
  user: {
    id: 'u_me',
    name: 'John Doe',
    headline: 'Full Stack Developer',
    location: 'Berlin, Germany',
    connectionsCount: 500,
    bannerUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600',
  },
  about: 'Full stack engineer passionate about product, performance, and clean DX. I build resilient web apps with TypeScript, React, and Node. I enjoy mentoring and writing about engineering best practices.',
  experiences: [
    {
      id: 'e1',
      title: 'Senior Software Engineer',
      company: 'TechCorp',
      employmentType: 'Full-time',
      location: 'Remote',
      startDate: '2022-05-01T00:00:00.000Z',
      description: 'Lead frontend architecture, performance initiatives, and design systems. Collaborated cross-functionally to ship features to millions of users.',
    },
    {
      id: 'e2',
      title: 'Software Engineer',
      company: 'Startup Labs',
      employmentType: 'Full-time',
      location: 'Berlin, Germany',
      startDate: '2019-03-01T00:00:00.000Z',
      endDate: '2022-04-01T00:00:00.000Z',
      description: 'Built end-to-end features across the stack, from UI to APIs and data pipelines.',
    },
  ],
  education: [
    {
      id: 'ed1',
      school: 'Technical University',
      degree: 'B.Sc. Computer Science',
      field: 'Software Engineering',
      startDate: '2015-09-01T00:00:00.000Z',
      endDate: '2019-06-01T00:00:00.000Z',
    },
  ],
  skills: [
    { id: 's1', name: 'TypeScript', endorsements: 45 },
    { id: 's2', name: 'React', endorsements: 62 },
    { id: 's3', name: 'Node.js', endorsements: 38 },
  ],
};


