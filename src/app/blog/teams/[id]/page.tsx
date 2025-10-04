"use client";

import { useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import BlogHeader from "../../components/BlogHeader";
import { getTeamById } from "../../data";
import Link from "next/link";
import { getLinkForProject } from "../../utils/collabStore";

export default function TeamDetailsPage() {
	const params = useParams();
	const search = useSearchParams();
	const teamId = params?.id as string;
	const fromProject = search.get("fromProject");

	const team = getTeamById(teamId);
	const link = useMemo(() => {
		if (!fromProject) return undefined;
		return getLinkForProject(fromProject);
	}, [fromProject]);

	return (
		<div className="min-h-screen bg-gray-50">
			<BlogHeader />
			<div className="max-w-4xl mx-auto px-4 py-8">
				<div className="bg-white border border-gray-200 rounded-xl p-6">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-2xl font-bold text-gray-900">{team?.name || "Team"}</h1>
							{link && (
								<p className="text-sm text-gray-600 mt-1">
									Linked from project {link.projectTitle ? `“${link.projectTitle}”` : `#${link.projectId}`}
								</p>
							)}
						</div>
						{fromProject && (
							<Link href={`/project/workspace/${fromProject}`} className="text-sm text-blue-600 hover:underline">Back to Project</Link>
						)}
					</div>
					<p className="text-gray-700 mt-4">{team?.description}</p>
				</div>
			</div>
		</div>
	);
}


