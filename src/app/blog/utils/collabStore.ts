"use client";

type ProjectId = number | string;

export interface ProjectBlogLinkRecord {
	projectId: ProjectId;
	projectTitle?: string;
	teamId: string;
	teamName: string;
	linkedAt: string;
}

const STORAGE_KEY = "collab:project-blog-links";

function readAll(): ProjectBlogLinkRecord[] {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		return raw ? (JSON.parse(raw) as ProjectBlogLinkRecord[]) : [];
	} catch {
		return [];
	}
}

function writeAll(records: ProjectBlogLinkRecord[]) {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
	} catch {}
}

export function getLinkForProject(projectId: ProjectId): ProjectBlogLinkRecord | undefined {
	return readAll().find(r => String(r.projectId) === String(projectId));
}

export function linkProjectToTeam(record: Omit<ProjectBlogLinkRecord, "linkedAt">) {
	const all = readAll();
	const existingIdx = all.findIndex(r => String(r.projectId) === String(record.projectId));
	const newRec: ProjectBlogLinkRecord = { ...record, linkedAt: new Date().toISOString() };
	if (existingIdx >= 0) {
		all[existingIdx] = newRec;
	} else {
		all.push(newRec);
	}
	writeAll(all);
	return newRec;
}

export function unlinkProject(projectId: ProjectId) {
	const all = readAll().filter(r => String(r.projectId) !== String(projectId));
	writeAll(all);
}

export function listAllLinks() {
	return readAll();
}

export function getLinkForTeam(teamId: string): ProjectBlogLinkRecord | undefined {
	return readAll().find(r => r.teamId === teamId);
}

export function unlinkByTeam(teamId: string) {
	const all = readAll().filter(r => r.teamId !== teamId);
	writeAll(all);
}

export function linkTeamToProject(teamId: string, teamName: string, projectId: ProjectId, projectTitle?: string) {
	return linkProjectToTeam({ teamId, teamName, projectId, projectTitle });
}


