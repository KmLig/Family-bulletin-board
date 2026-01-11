import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFeedStore = defineStore('feed', () => {
  const posts = ref([
    {
      id: 1,
      author: {
        name: 'Cô Lan',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXyoGbTATNh1n8BhKlyfvuTrKXpRjv_VAKNirEYiwPbRzD7b1uBOrP9o_9KjHae8s_fC6U8JS6u55V8hCWaZvUkptYdGxq9qmwDCQWEn7cEnWzwRzj9tT1z0BK9KgFjKQY6xthuVIR67OrxpmP_7ijkFdhu8CzuF1buUUIo4sag46mtBoSLZTJBeZ2CszUg9dywt8HNWux_dybEuxHqH1vH7VsrGNNzq_qT1brBcrXx0RYbmTVu3-N3aYqPk_sc5U6iiibTPGMd0s'
      },
      content: 'Hình ảnh đợt về quê ăn Tết vừa rồi nè cả nhà ơi. Vui quá chừng! ❤️🌸',
      type: 'album',
      images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCfb5-fs33qp1tD8gHHmMJcUJ0CfQ4V16BmlSD13qNF3eUSTf0I2P48n2tyAP0INBBsYThIDGbKGqSuhkxvOQ_niOt0Oa-zCQKtQI5_oCAO6_17a_LZxCKPACCG9uHXli9g8IAwWLOTegacDCyYB13-nk3NYecyZ7c1CBpqoysvXDY65BnCYdrfxFXqoI7zyFN77zuMRTWknWbEe6-ySqzR-mbUxhIy86gWORHGKyF_rUj31U7AEsLQGXTsdDJ0LYEMeQQ_Ab6rTzY',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBgoV4RL49KZT0dCQqjWSdyNZk9GutIa_SWzNIvFBHWfTroADAS31F_-ebjCqFnVUXgRw4Z0Q-0aiWveD6LxNSu0bMizCxfoBXb5z9C2qfowkhGNUSI0oNJZD8KU1l73CActrpQuAIL7yVN1C7gwOtYbs5hCMn14bLqPzXEUGzFirFsZD9_guQnJpuJ2F2IVB9R5wvXbXBIylov_bX-S-hBWZvokanIqZtDho8EvcsVAVapCOFqKr_Ho4IlwI83-PSD9cacQfu5Hl0'
      ],
      likes: 12,
      comments: 4,
      timeAgo: '2 giờ trước'
    },
    {
      id: 2,
      type: 'family-tree-update',
      author: {
        name: 'Chú Tuấn'
      },
      content: 'đã thêm thành viên mới',
      newMember: {
        name: 'Bé Gạo (Nguyễn Văn An)',
        relation: 'Con của Chú Tuấn & Cô Hoa',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAq_4nBFCM2dm0JaBOLdi5_v0aRMRbiTY_CkDnmyIcbm8j4sQIorHSzK-huCsIW32jeLLm-xG9Rlzkf9QGAU-1lqTskf21HuAv5SlYqsfkfa4ca1sKFSsw0IJfCBFQl4upZXQplFYLOSFY5zv1INA720RDG8ix4-cmn6qYqVDfuW2yNKEC1LCVYgS3XI0_wKC09WqmxWOZ32GFzjvnrZk1seoJQVwNpr9R_W2JDfiDPEan1Gp9aoqAHmyjL_IH8Fha2hPR30t7ZwCs'
      },
      timeAgo: '5 giờ trước'
    },
    {
      id: 3,
      author: {
        name: 'Bác Cả',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDnfDtSqDFn8Yx27YandHpXDFjOz4p6I9lNwwPUT_p8Jejh8T6nAQbmgtoCV7C8F50kFnWYiQpfXP16l62cGtJgUqgCWVmgrMAv9LCAyE0qRW28fcMkFGrNPNCetlHRHQK695IIGTDfGMBXDHVJwihgt5wcBbupCemp0B-DFpr7DgK87fWTavAO1tkCmfkTaGQ7lFVgyryqWW_gdQ0alVr00H051Y034tFwdbuEqUz2yrk4udPiylmyq-kXD2gcMVeohfYVhqtnEU'
      },
      content: 'Cuối tuần sau cả nhà nhớ sắp xếp về quê làm lễ mừng thọ cho Bà nhé. Bác đã đặt cỗ xong xuôi rồi, chỉ chờ các cháu về đông đủ thôi. 🎂',
      type: 'status',
      likes: 8,
      timeAgo: '1 ngày trước',
      likedBy: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD0oqZqhBLclve8UtuoaVxMRFRqi6oGoLs_CuyfvKYplNSbInnF_YRm2FfjI7a9DSEG9-gY2UgvdbGbNrKM7MpZYWhsRn6eVddlPy1rS5BJC2iFCYjWdJoELFek6rNpg3RZTEpUpLyY1lBtdTm2u3REgIuDVolsvIPkiwjWG-j5xfhQ4wd4AGHcB2I1RpIyTmr9fi467yoQA_qr2FOY7cIttiz7QdwDK_-atClGhLLbS_fWe3sODExbRBDBi9lcHe7-dDVyvslePPE',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDov9udUXuydLjZigTh34cLHJYE3k9gkurT242haymSOYXYPw70Erjt_MhmyobKvdztuUIruuhDfyiuy_xf3AMjQLTURKU5ILCSS4GwZLB5tDxcgJtpp787ug9jaYg1AaYA-SJ76vHFuWm2BB29s76iwrfxJIbEM1C97axk-LWnewBCkdVZxK7EKGs1gbrQ3KlQirBWsttlzr99okNa7IDWK1nLu1aRADkdBx2_cu2UEaBi-aMOeurHSQuHYLAjYLfIgtMhEaajrZU',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB2xmVwEyc3TnQaQbmn-skeEiGz8phyDEb3r53Br_nGUiNGnVAH0uh3WXeZX58sSb6kbXX1v1afbMo0GLt9Is1LbT8XfsXXNvTPb8H5txowTkL1qVov7icZybQRRYT6yGaEsmIrnDH69UwXrVgdf-DRwD4-fk304JrY5ION_ekRjK5R1NBXK3ONtEpEhnDRwJ80O2L-LNseqMarXpgMzHUJcicR2Jfb5haE35uV0hdgc-yGfZQQ4Cj9pQL1Bg64P6HtMtQiC8tHqzM'
      ]
    }
  ])

  return {
    posts
  }
})

