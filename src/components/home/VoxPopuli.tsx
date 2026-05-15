import { getActivePolls } from '@/app/actions/polls';
import VoxPopuliClient from './VoxPopuliClient';

export default async function VoxPopuli() {
  const polls = await getActivePolls();

  if (!polls || polls.length === 0) {
    return null;
  }

  return <VoxPopuliClient initialPolls={polls} />;
}
