'use client';

import { useParams } from 'next/navigation';
import ActivityDetailedInfo from '@/components/activity/ActivityDetailedInfo';


export default function ActivityInfoPage() {
  const { activityId } = useParams();

  return <ActivityDetailedInfo activityId={activityId} />;
}