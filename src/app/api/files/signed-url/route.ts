import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { isSupabaseConfigured } from '@/lib/supabase/client';

export async function POST(request: Request) {
  try {
    const { filePath, expiresIn = 3600 } = await request.json();

    if (!filePath) {
      return NextResponse.json({ error: 'filePath parameter is required' }, { status: 400 });
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        signedUrl: `/mock-files/${filePath}`,
        expiresIn,
        note: 'Simulated signed URL (Supabase credentials not configured)',
      });
    }

    const supabase = createClient();
    const { data: { user }, error: authErr } = await supabase.auth.getUser();

    if (authErr || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check user role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const isAdmin = profile?.role === 'admin';
    const isOwner = filePath.startsWith(`${user.id}/`);

    if (!isAdmin && !isOwner) {
      return NextResponse.json({ error: 'Forbidden: Access to another faculty member\'s private file is strictly prohibited.' }, { status: 403 });
    }

    // Generate signed URL
    const { data, error } = await supabase.storage
      .from('academic-portal-files')
      .createSignedUrl(filePath, expiresIn);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ signedUrl: data.signedUrl, expiresIn });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
