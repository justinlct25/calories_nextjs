'use client';

import { useParams } from 'next/navigation';

export default function SomeClientComponent() {
  const { activityId } = useParams();

  return <div>activity: {activityId}</div>;
}