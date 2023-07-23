declare module "swiper/*";

type Profession = {
  name: string;
  slug: string;
  bg_img: string;
  icon: React.ReactNode;
};

type Skill = {
  name: string;
  slug: string;
};

type ResponseUser = {
  username: string;
  email: string;
  confirmed: string;
  profileType: string;
  id: number;
};

// type User = {
//   username: string;
//   profileImage: string;
//   location: string;
//   slug: string;
//   invited_jobs: string[];
//   complated_jobs: string[];
//   applied_jobs: string[];
//   unsuccessful_jobs: string[];
//   rate: number;
//   followers: number;
// };

type About = {
  img: string;
  title: string;
  description: string;
};

type FilterJob = {
  profession?: string;
  location?: string;
};

type FilterTalent = {
  profession?: string;
  location?: string;
  searchKey?: string;
  gender?: string;
  minAge?: number;
  maxAge?: number;
  platform?: string;
  city?: string;
  state?: string;
  hairColor?: string;
  minHeight?: number;
  maxHeight?: number;
  bodyType?: string;
};

type Job = {
  id:number
  isClosed: boolean;
  status: "татгалзcaн" | "хүлээгдэж байгаа" | "батлагдсан";
  user: string;

  title: string;
  profession: string;
  category: string;
  locations: string[];
  slug: string;
  gender: "эрэгтэй" | "эмэгтэй" | "бүгд" | string;
  description?: string;
  files: File[];
  additionalMaterial?: string;

  isAdditionalMaterial?: boolean;
  budget?: string;
  minAge?: number;
  maxAge?: number;

  influencer?: {
    areaOfExpertise?: string[];
    instagramFollowers?: number;
    tiktokFollowers?: number;
    youtubeFollowers?: number;
    descTypeOfInfluencer?: string;
    additionalInfo?: string;
    hashTag?: string[];
  };
  castTalent?: {
    descTypeOfTalent?: string;
    minHeight?: number;
    bodyType?: string[];
    shootDate?: string;
    requiredDate?: string;
    isMakeContract?: boolean;
    useMediaTypes?: string[];
    howLongUse?: string;
    hairColor?: string;
  };
  contentCreator: {
    descTypeOfCreator?: string;
    typeOfContent?: string;
    categoryOfCreator?: string[];
    additionalInfo?: string;
  };
  creativeProduction: {
    isMakeContract?: boolean;
    howLongUse?: string;
    useMediaTypes?: string[];
    shootDate?: string;
    requiredDate?: string;
  };

  invitedUser?: {
    data?: {
      id: number;
      attributes: User;
    };
  };
  bookedBy?: {
    data: {
      attributes: User;
      id: number;
    };
  };
  appliedUsers?:{
    data:{
      id:number
      attributes:{
        username:string
        profile:{
          data:{
            attributes:Profile
            id:number
          }
        }
      }
    }[]
  };
  user: any;
};

type Profile = {
  id: number;
  user: {
    data: {
      attributes: User;
      id: number;
    };
  };
  height: number;
  bodyType: string;
  hairColor: string;
  eyeColor: string;
  shoeSize: string;
  shirtSize: string;
  maritalStatus: string;
  firstname: string;
  lastname: string;
  diet: string;
  professions: string[];
  profileImage?: {
    data: {
      id: number;
      attributes: {
        formats:{
          thumbnail:{
            url:string
          }
        }
        url: string;
      };
    };
  };
  photos?: {
    data: {
      id: number;
      attributes: {
        url: string;
        formats: {
          large: {
            url: string;
          };
          medium: {
            url: string;
          };
        };
      };
    }[];
  };
  videos?: {
    id: number;
    url: string;
  }[];
  gender: string;
  age: number;
  bio?: string;
  location: string;
  instagramFollowers?: number;
  tiktokFollowers?: number;
  youtubeFollowers?: number;
  rate?: number;
};

interface MyProfile extends Profile {
  profileImage?: {
    id: number;
    url: string;
  };
  photos?: {
    id: number;
    url: string;
    formats: {
      large: {
        url: string;
      };
      medium: {
        url: string;
      };
    };
  }[];
}

type User = {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  mobileNumber: string;
  email: string;
  confirmed: boolean;
  profileType: string;
  profile?: MyProfile;
  isCreatedProfile: boolean;
  favourites: any[];
  invitedJobs: Job[];
  bookedJobs: Job[];
  appliedJobs: Job[];
};

type Talent = {
  name: string;
  profileImg: string;
  professions: string[];
  location: string;
  rate?: number;
  followers: number;
  slug: string;
  bookedJobs?: number;
};

type Meta = {
  pagination: {
    page: number;
    pageCount: number;
    pageSize: number;
    total: number;
  };
};

interface ResponseJob extends Job {
  files:{
    data:{
      id:number,
      attributes:{
        name:string,
        ext:string,
        url:string
      }
    }[]
  }
}

interface JobResponse extends Job {
  data: {
    id: number;
    attributes: ResponseJob;
  };
}

type JobsResponse = {
  data: {
    id: number;
    attributes: ResponseJob;
  }[];
  meta: Meta;
};

type JobDetailResponse = {
  data: {
    id: string;
    attributes: ResponseJob;
  };
};



type ProfilesResponse = {
  data: {
    id: number;
    attributes: Profile;
  }[];
  meta: Meta;
};

type ProfileDetailResponse = {
  data: {
    id: number;
    attributes: Profile;
  };
  meta: Meta;
};


// fetch

type ResponseProfession = {
  id: number;
  attributes: {
    name: string;
    category: string;
    background_image: {
      data: {
        id: number;
        attributes: {
          url: string;
        };
      };
    };
  };
};

type ContentsResponse = {
  id: number;
  attributes: {
    banner_images: {
      data: {
        id: number;
        attributes: {
          url: string;
        };
      }[];
    };
    section1_image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    section2_video: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    featured_talents: {
      data: {
        id: number;
        attributes: User;
      };
    }[];
  };
};
