import GatheringDetail from './_component/GatheringDetail';
import {
  GatheringInfoType,
  GatheringParticipantsType,
  ReviewsType,
} from '@/types/data.type';
import getReviewList from '@/app/api/actions/reviews/getReviewList';
import getGatheringParticipants from '@/app/api/actions/gatherings/getGatheringParticipants';
import getGatheringInfo from '@/app/api/actions/gatherings/getGatheringInfo';

const GatheringsDetailPage = async ({
  params,
}: {
  params: {
    id: number;
  };
}) => {
  const gatheringInfo: GatheringInfoType = await getGatheringInfo(params.id);
  const gatheringParticipants: GatheringParticipantsType[] =
    await getGatheringParticipants(params.id, gatheringInfo.participantCount);
  const reviews: ReviewsType[] = await getReviewList({
    gatheringId: params.id,
  });

  return (
    <GatheringDetail
      gatheringInfo={gatheringInfo}
      gatheringParticipants={gatheringParticipants}
      reviews={reviews}
    />
  );
};

export default GatheringsDetailPage;
