import { useRouter } from 'next/navigation';

import putGatheringToCancelled from '@/app/api/actions/gatherings/putGatheringToCancelled';

import toast from 'react-hot-toast';

const useCancelGathering = (gatheringId: number) => {
  const router = useRouter();

  const cancelGathering = async () => {
    const { success, message } = await putGatheringToCancelled(gatheringId);

    if (!success) {
      toast.error(message);

      return;
    }

    toast.success(message);

    router.push('/gatherings');
  };

  return { cancelGathering };
};

export default useCancelGathering;
