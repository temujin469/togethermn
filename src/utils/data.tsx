import { Laugh, Scissors } from "lucide-react";
import { Clapperboard } from "lucide-react";
import { Shirt } from "lucide-react";
import { Workflow } from "lucide-react";
import { Camera } from "lucide-react";
import { VenetianMask } from "lucide-react";
import { UsbIcon, UserSquare2 } from "lucide-react";
// temuujin pi04320416
export const professions: Profession[] = [
  {
    name: "Загвар өмсөгч",
    slug: "Загвар-өмсөгч",
    bg_img:
      "https://images.pexels.com/photos/6940147/pexels-photo-6940147.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    icon: <UserSquare2 />
  },
  {
    name: "Жүжигчин",
    slug: "Жүжигчин",
    bg_img:
      "https://images.pexels.com/photos/10862799/pexels-photo-10862799.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    icon: <VenetianMask />

  },
  {
    name: "Инфлүүнсер",
    slug: "Инфлүүнсер",
    bg_img:
      "https://images.pexels.com/photos/6940334/pexels-photo-6940334.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    icon: <Laugh />

  },
  {
    name: "Гэрэл зурагчин",
    slug: "Гэрэл-зурагчин",
    bg_img:
      "https://images.pexels.com/photos/8108097/pexels-photo-8108097.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    icon: <Camera />

  },
  {
    name: "Видео зураглаач",
    slug: "Видео-зураглаач",
    bg_img:
      "https://images.unsplash.com/photo-1601506521793-dc748fc80b67?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80",
    icon: <Clapperboard />

  },
  // {
  //   name: "Графикч",
  //   slug: "Графикч",
  //   bg_img:
  //     "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  //   icon: <UserSquare2 />

  // },
  {
    name: "Контент эрхлэгч",
    slug: "Контент-эрхлэгч",
    bg_img:
      "https://images.pexels.com/photos/4629627/pexels-photo-4629627.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    icon: <Workflow />

  },
  {
    name: "Үс, нүүр будалт",
    slug: "Үс-нүүр-будалт",
    bg_img:
      "https://images.pexels.com/photos/3358299/pexels-photo-3358299.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    icon: <Scissors />
  },
  {
    name: "Стилист",
    slug: "Стилист",
    bg_img:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    icon: <Shirt />
  },
];

export const slider = [
  {
    message:
      "Долоо хоног бүр зураг авалт хийдэг брендийн хувьд зураг, видеоны зураг авалтад тохирох авьяастныг зөв үнээр олох гайхалтай платформ юм.",
    image:
      "https://raw.githubusercontent.com/temujin469/vr-landing-page/main/src/assets/img/avt1.png",
    name: "Нандин цэцэг",
  },
  {
    message:
      "Энэ бол платформын талаарх бидний хамгийн дуртай зүйл, түүнчлэн бид нийтлэх үед хүлээн авах өргөдөл гаргагчийн хурд юм.",
    image:
      "https://github.com/temujin469/vr-landing-page/blob/main/src/assets/img/avt2.png?raw=true",
    name: "Номинжин",
  },
  {
    message:
      "vivid бол бидний найлзуурууддаа авъяас чадвараа олж авах боломж юм. чанартай авьяастныг хялбархан сонгон шалгаруулах боломжийг олгодог хялбар платформ юм",

    image:
      "https://github.com/temujin469/vr-landing-page/blob/main/src/assets/img/avt3.png?raw=true",
    name: "Мөнхжин",
  },
  {
    message:
      "vivid бол бидний найлзуурууддаа авъяас чадвараа олж авах боломж юм. чанартай авьяастныг хялбархан сонгон шалгаруулах боломжийг олгодог хялбар платформ юм",
    image:
      "https://github.com/temujin469/vr-landing-page/blob/main/src/assets/img/avt4.png?raw=true",
    name: "Тэмүүжин",
  },
];

export const talents: Talent[] = [
  {
    name: "Тэмүүжин",
    profileImg:
      "https://images.pexels.com/photos/6551790/pexels-photo-6551790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    slug: "temuujin",
    rate: 5,
    location: "Улаанбаатар",
    followers: 15000,
    bookedJobs: 5,
    professions: ["Model", "Influencer"]
  },
  {
    name: "Мөнхжин",
    profileImg:
      "https://images.pexels.com/photos/2036646/pexels-photo-2036646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    slug: "munhjin",
    rate: 4,
    location: "Дархан",
    followers: 2400,
    bookedJobs: 0,
    professions: ["Model", "Influencer"]
  },
  {
    name: "Мөнх чимэг",
    profileImg: "https://images.pexels.com/photos/5272566/pexels-photo-5272566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    slug: "munh-chimeg",
    rate: 4,
    location: "Эрдэнэт",
    followers: 5600,
    bookedJobs: 0,
    professions: ["Model", "Influencer"]
  },
  {
    name: "Буяннэмэх",
    profileImg:
      "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    slug: "buynnemeh",
    rate: 5,
    location: "Улаанбаатар",
    followers: 11300,
    bookedJobs: 0,
    professions: ["Model", "Influencer"]
  },
];

export const about1: About[] = [
  {
    img: "/images/writing-a-blog.png",
    title: "1. Ажил оруулхад үнэгүй",
    description:
      "Танд хэрэгтэй авъяас чадвараа олж авах уриалгыг нийтэл. Төсөл, хайж буй хүн, төсөв, эхлэх огноогоо тодорхойл. Том, жижиг аль ч загвар өмсөгч, жүжигчин эсвэл нөлөөлөгчийн ажлыг байрлуулж, сошиал, дижитал, хэвлэмэл эсвэл өргөн нэвтрүүлгийн хэвлэл мэдээллийн хэрэгслээр үүсгэх боломжтой.",
  },
  {
    img: "/images/talent-requirements.png",
    title: "2. Ажилын хүсэлт хүлээн ав",
    description:
      "Өргөдөл гаргагчдыг хурдан хүлээж аваарай. Тэдний профайл, зураг, тойм, ишлэлийг шалгана уу. Богино жагсаалтад тохирох нэр дэвшигчдийг нэмэх эсвэл татгалз.",
  },
  {
    img: "/images/work-from-home-4.png",
    title: "3. Өргөдөл гаргагчидтай харилцах",
    description:
      "Манай чаатаар авъяастай хүмүүстэй шууд харилцаж, бүх мессежээ нэг дор хадгалахад хялбар болгоно. Бодит цаг хугацаанд хавсралт илгээх, видео дамжуулалтыг зохион байгуулах, үнэ болон хүргэх ажлыг хурдан бөгөөд хялбараар тохиролцох. Бид танд мессеж ирэх болгонд имэйл илгээх болно, ингэснээр та цаг алдахгүй!",
  },
  {
    img: "/images/work-with-the-best.png",
    title: "4. Мэргэжилтэн захиалах",
    description:
      "Ажлаа цаг тухайд нь, төсөвтөө багтаан гүйцэтгэхийн тулд нэг товшилтоор авьяасаа захиалаарай. Ямар ч нарийн төвөгтэй гэрээ эсвэл уйтгартай бичиг цаасны ажил шаардагдана - бид таны төлөө энэ бүхнийг хариуцдаг. Та болон таны авъяас чадвар нь ажил дээрээ байх үед бидний 20 сая долларын олон нийтийн хариуцлага, эд хөрөнгийн хохирлын даатгалаар хамгаалагдсан.",
  },
  {
    img: "/images/wallet.png",
    title: "5. Ажил дууссаны дараа 15% -ийн шимтгэл төлнө",
    description:
      "Бид авьяастнуудын цалинг ажлын эхэнд барьдаг бөгөөд дууссаны дараа тэдэнд олгодог. Бүх ажлын байранд 15% -ийн тогтмол шимтгэл байдаг. Загвар өмсөгч, жүжигчин эсвэл инфлүүнсер хүмүүсийн  хийсэн ажлын талаар сэтгэгдэл үлдээхээ бүү мартаарай!",
  },
];

export const about2: About[] = [
  {
    img: "/images/talent-requirements.png",
    title: "1. Post a job - its free!",
    description:
      "Post a call out for the talent you need. Describe your project, who you are looking for, your budget and start dates. Any model, actor or influencer job, great or small, can be posted on theright.fit to create for social, digital, print or broadcast media.",
  },
  {
    img: "/images/talent-requirements.png",
    title: "1. Post a job - its free!",
    description:
      "Post a call out for the talent you need. Describe your project, who you are looking for, your budget and start dates. Any model, actor or influencer job, great or small, can be posted on theright.fit to create for social, digital, print or broadcast media.",
  },
  {
    img: "/images/talent-requirements.png",
    title: "1. Post a job - its free!",
    description:
      "Post a call out for the talent you need. Describe your project, who you are looking for, your budget and start dates. Any model, actor or influencer job, great or small, can be posted on theright.fit to create for social, digital, print or broadcast media.",
  },
  {
    img: "/images/talent-requirements.png",
    title: "1. Post a job - its free!",
    description:
      "Post a call out for the talent you need. Describe your project, who you are looking for, your budget and start dates. Any model, actor or influencer job, great or small, can be posted on theright.fit to create for social, digital, print or broadcast media.",
  },
];


export const hairColors:string[] = [
  "Хар",
  "Бор",
  "Улаан",
  "Цагаан",
  "Саарал",
  "Шаргал"
]

export const genders = ["Эрэгтэй","Эмэгтэй","Бусад"]
export const bodyTypes: string[] = ["туранхай", "булчинлаг", "тарган", "дундаж"]
export const eyeColors: string[] = ["Хар", "Цагаан", "Улаан", "Цэнхэр","Бор"]
export const shoeSizes: number[] = [40, 41, 42, 43]
export const shirtSizes: string[] = ["2XL", "3XL", "XL", "L","M"]



