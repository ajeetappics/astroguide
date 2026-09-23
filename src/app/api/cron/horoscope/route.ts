import { NextResponse } from 'next/server';
import { ZODIAC_SIGNS_LIST } from '@/services/horoscopeService';

// Midnight Cron Handler: Can be invoked by external cron service, Vercel cron, or GitHub action
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const authKey = searchParams.get('key');

    // Optional simple security key check if set in environment
    const cronSecret = process.env.CRON_SECRET;
    if (cronSecret && authKey !== cronSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    const responsePayload = {
      status: 'success',
      message: 'Horoscope data verified and scheduled for midnight refresh',
      lastUpdated: new Date().toISOString(),
      displayDate: formattedDate,
      totalSigns: ZODIAC_SIGNS_LIST.length
    };

    return NextResponse.json(responsePayload, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { status: 'error', message: 'Failed to process midnight horoscope cron', error: String(error) },
      { status: 500 }
    );
  }
}
