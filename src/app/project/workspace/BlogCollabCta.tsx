"use client";

import Link from "next/link";
import { useMemo } from "react";
import { getLinkForProject, unlinkProject } from "../../blog/utils/collabStore";
import { mockUserProjects } from "../data";

interface Props {
    projectId: number | string;
    projectTitle: string;
    canManage: boolean;
}

export default function BlogCollabCta({ projectId, projectTitle, canManage }: Props) {
	const link = useMemo(() => getLinkForProject(projectId), [projectId]);

    const memberNames = useMemo(() => {
        const proj = mockUserProjects.find(p => String(p.id) === String(projectId));
        return (proj?.teamMembers || []).map(m => m.name);
    }, [projectId]);

    const memberEmails = useMemo(() => {
        const proj = mockUserProjects.find(p => String(p.id) === String(projectId));
        const names = (proj?.teamMembers || []).map(m => m.name);
        // Generate deterministic demo emails from names
        return names.map(n => `${n.toLowerCase().replace(/[^a-z0-9]+/g,'')}` + '@gmail.com');
    }, [projectId]);

	if (!canManage) {
		return (
			<div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-600">
				Only owners and admins can manage blog collaboration.
			</div>
		);
	}

	return (
		<div className="space-y-3">
			{!link ? (
				<div className="flex items-center justify-between">
					<div>
						<div className="text-sm text-gray-700">Collaborate on blog with this team</div>
						<div className="text-xs text-gray-500">Create a team in Blog and link it to this project</div>
					</div>
                <Link
                    href={`/blog/settings?tab=collaborations&fromProject=${encodeURIComponent(String(projectId))}&projectTitle=${encodeURIComponent(projectTitle)}&projectMembers=${encodeURIComponent(memberNames.join('|'))}&projectMemberEmails=${encodeURIComponent(memberEmails.join('|'))}`}
						className="px-3 py-1.5 rounded-md text-sm bg-black text-white hover:bg-gray-800"
					>
						Enable Collaboration
					</Link>
				</div>
			) : (
				<div className="flex items-center justify-between">
					<div>
						<div className="text-sm text-gray-700">Blog Team Linked</div>
						<div className="text-xs text-gray-500">{link.teamName} • linked {new Date(link.linkedAt).toLocaleString()}</div>
					</div>
					<div className="flex items-center gap-2">
						<Link href={`/blog/teams/${link.teamId}?fromProject=${encodeURIComponent(String(projectId))}`} className="px-3 py-1.5 rounded-md text-sm border border-gray-300 hover:bg-gray-50">Open Team</Link>
						<button
							onClick={() => unlinkProject(projectId)}
							className="px-3 py-1.5 rounded-md text-sm border border-red-300 text-red-600 hover:bg-red-50"
						>
							Unlink
						</button>
					</div>
				</div>
			)}
		</div>
	);
}


