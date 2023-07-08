
type Profession = {
  name: string;
  slug: string;
  bg_img: string;
  icon:React.ReactNode
};

type Skill = {
  name: string;
  slug: string;
};

type User = {
  name: string;
  profileImage: string;
  location: string;
  slug: string;
  invited_jobs: string[];
  complated_jobs: string[];
  applied_jobs: string[];
  unsuccessful_jobs: string[];
  rate: number;
  followers: number;
};

type About = {
  img: string;
  title: string;
  description: string;
};

type FilterJob = {
  profession?:string
  location?:string
}

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
  user: string;
  title: string;
  profession: string;
  locations: string[];
  slug:string
  minAge: number;
  maxAge: number;
  typeOfTalent?: string;
  minHeight: number;
  bodyType: string;
  gender: "эрэгтэй" | "эмэгтэй" | "бүгд" | string
  description?: string;
  files: any[];
  shootDate?: string;
  requiredDate?: string;
  additionalMaterial?: string;
  isAdditionalMaterial?: "yes" | "no" | string;
  isUse?: "yes" | "no" | string;
  usageFor:string[]
  budgetType?:"perHour" | "perDay" | string
  budget?:string
  perHour?:number
  perDay?:number
  hairColor?:string
};

type Talent = {
  name: string;
  profileImg: string;
  professions: string[];
  location: string;
  rate?: number;
  followers: number
  slug:string
  bookedJobs?: number
};

