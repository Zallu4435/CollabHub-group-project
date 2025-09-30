"use client";

import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';
import MentorshipRequest from '../../../_components/mentorship/MentorshipRequest';
import { mentors } from '../../../_data/mentors';
import Link from 'next/link';

interface PageProps {
  params: { id: string };
}

export default function MentorshipRequestPage({ params }: PageProps) {
  const router = useRouter();
  const mentor = mentors.find((m) => m.id === params.id);

  if (!mentor) return notFound();

  const handleSubmit = (data: {
    goals: string;
    expectations: string;
    commitment: string;
    background: string;
  }) => {
    console.log('Mentorship request submitted:', { mentorId: mentor.id, ...data });
    router.push(`/community/mentorship`);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link href="/community/mentorship" className="text-blue-600 hover:text-blue-700 font-medium">
                Mentorship
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-600 truncate">Request Mentorship</li>
          </ol>
        </nav>

        <MentorshipRequest
          mentorId={mentor.id}
          mentorName={mentor.name}
          mentorAvatar={mentor.avatar}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
