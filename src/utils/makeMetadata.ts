const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

export const rootMetadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: '%s | Soothe With Me',
    default: 'Soothe With Me',
  },
  description:
    '바쁜 일상 속 휴식을 위한 다양한 모임을 탐색하고 참여하며, 직접 모임을 개설하고 리뷰를 생성할 수 있는 서비스입니다.',
  icons: {
    icon: '/icons/bye.svg',
  },
  keywords:
    '같이달램, Soothe with me, 달램핏, 워케이션, 마인드풀니스, 오피스스트레칭, 모임, 휴식, 소통, 힐링, 취미, 취향, 소모임',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: {
      template: '%s | Soothe With Me',
      default: 'Soothe With Me',
    },
    description:
      '다양한 휴식 모임을 탐색하고 참여하며 직접 개설할 수 있는 서비스.',
    url: BASE_URL,
    siteName: 'Soothe With Me',
    type: 'website',
    locale: 'ko_KR',
    images: [
      {
        url: '/images/login-img.svg',
        width: 800,
        height: 600,
        alt: 'Soothe With Me',
      },
    ],
  },
  twitter: {
    title: {
      template: '%s | Soothe With Me',
      default: 'Soothe With Me',
    },
    description:
      '바쁜 일상 속 휴식을 위한 다양한 모임을 제공하는 Soothe With Me 서비스.',
    images: [
      {
        url: '/images/login-img.svg',
        width: 800,
        height: 600,
        alt: 'Soothe With Me',
      },
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/gatherings`,
  },
  other: {
    'google-site-verification': 'EnQi5HcxKKMfPQq_KgrRrnkbL7g2qiHLz6KUXcBtNwo',
  },
};

import getGatheringInfo from '@/app/api/actions/gatherings/getGatheringInfo';
import { GatheringInfoType } from '@/types/data.type';

export const pageMetadata = (page: string, path: string) => {
  return {
    title: {
      template: '%s | Soothe With Me',
      default: page,
    },
    description: `Soothe With Me ${page} 페이지입니다.`,
    openGraph: {
      title: page,
      description: `Soothe With Me | ${page} .`,
      url: `${BASE_URL}${path}`,
    },
    twitter: {
      title: page,
      description: `Soothe With Me | ${page} .`,
      url: `${BASE_URL}${path}`,
    },
  };
};

export const gatheringMetadata = async (id: number) => {
  const gatheringInfo: GatheringInfoType = await getGatheringInfo(id);

  const name = gatheringInfo.name || '';
  const type = gatheringInfo.type;
  const img = gatheringInfo.image;

  return {
    title: name,
    description: `${type} : ${name}`,
    openGraph: {
      title: name,
      description: `${type} : ${name}`,
      url: `${BASE_URL}/gatherings/${id}`,
      images: [
        {
          url: img || '/images/login-img.svg',
          width: 800,
          height: 600,
          alt: `${name} 모임 이미지`,
        },
      ],
    },
    twitter: {
      title: name,
      description: `${type} : ${name}`,
      url: `${BASE_URL}/gatherings/${id}`,
      images: [
        {
          url: img || '/images/login-img.svg',
          width: 800,
          height: 600,
          alt: `${name} 모임 이미지`,
        },
      ],
    },
  };
};
