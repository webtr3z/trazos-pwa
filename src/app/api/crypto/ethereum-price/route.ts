import { NextResponse } from 'next/server';
import { getEthData } from '@/services/coinwatch';

export async function GET() {
  try {
    const ethData = await getEthData();
    
    return NextResponse.json({
      price: ethData.price,
      change24h: ethData.change24h,
      changePercent24h: ethData.change24h, // Using change24h as percentage change
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching Ethereum price:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch Ethereum price' },
      { status: 500 }
    );
  }
}
