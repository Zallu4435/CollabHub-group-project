import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const project = searchParams.get('project');
  
  if (!project) {
    return NextResponse.json({ error: 'Project parameter is required' }, { status: 400 });
  }

  // In production, you would validate the user's access to this project
  // For now, we'll allow access to any project
  
  // Return proxied URL so it is same-origin via Next.js rewrite
  const codeServerUrl = `/code/?folder=${encodeURIComponent(`/home/zallu/Documents/projects/${project}`)}`;
  
  return NextResponse.json({ 
    url: codeServerUrl,
    message: 'Code Server URL generated successfully'
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { project, action } = body;
    
    if (action === 'start') {
      // Start Code Server for the project
      // In production, you would use a process manager like PM2
      return NextResponse.json({
        success: true,
        message: 'Code Server started',
        url: `/code/?folder=${encodeURIComponent(`/home/zallu/Documents/projects/${project}`)}`,
      });
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
