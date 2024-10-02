import GatheringDetail from './_component/GatheringDetail';
import {
  GatheringInfoType,
  GatheringParticipantsType,
  ReviewsType,
} from '@/types/data.type';
import getReviewList from '@/app/api/actions/reviews/getReviewList';
import getGatheringParticipants from '@/app/api/actions/gatherings/getGatheringParticipants';
import getGatheringInfo from '@/app/api/actions/gatherings/getGatheringInfo';
import { getUserData } from '@/app/api/actions/mypage/getUserData';
import { UserData } from '@/types/client.type';

const GatheringsDetailPage = async ({
  params,
}: {
  params: {
    id: number;
  };
}) => {
  const gatheringInfo: GatheringInfoType = await getGatheringInfo(params.id);

  const gatheringParticipants: GatheringParticipantsType[] =
    gatheringInfo.participantCount >= 1
      ? await getGatheringParticipants(
          params.id,
          gatheringInfo.participantCount,
        )
      : [];
  const reviews: ReviewsType[] = await getReviewList({
    gatheringId: params.id,
  });

  const userData: UserData | null = await getUserData();

  return (
    <GatheringDetail
      gatheringInfo={gatheringInfo}
      gatheringParticipants={gatheringParticipants}
      reviews={reviews}
      user={userData}
    />
  );
};

export const fetchCache = 'force-no-store';

export default GatheringsDetailPage;
