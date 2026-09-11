import { NextResponse } from 'next/server';
import { fetchGitHubData } from '@/lib/github';

export async function GET() {
  try {
    const data = await fetchGitHubData();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
      },
    });
  } catch (error) {
    console.error('GitHub API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data' },
      { status: 500 }
    );
  }
}
