"use client"
import { Button } from '@/components/ui/button';
import useSearchTalent from '@/hooks/useTalentSearch';
import getHeaderContents from '@/utils/fetch/getHeaderContents';
import getProfessions from '@/utils/fetch/getProfessions';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const TalentLink = ({link}:{link:string}) => {
  const router = useRouter();
  const {setFilter} = useSearchTalent()
  const handleClick = ()=>{
    setFilter({profession:link})
    router.push('/search/talent')
  }
  return (
    <p onClick={handleClick} className="whitespace-nowrap cursor-pointer hover:pl-1 transition-all text-[16px]">{link}</p>
  )
}

function MegaLinks() {

  const { data } = useQuery({ queryKey: ["headerContents"],queryFn:getHeaderContents})
  const headers = data?.attributes;

  const { data:professions } = useQuery({ queryKey: ["professions"], queryFn: getProfessions })


  const castTalentBg = data?.attributes.cast_talent.background_image.data.attributes.url;
  const contentCreatorBg = data?.attributes.content_creator.background_image.data.attributes.url;
  const creativeProductionBg = data?.attributes.creative_production.background_image.data.attributes.url;
  const influencerBg = data?.attributes.influencer.background_image.data.attributes.url;


  const castTalents = professions?.filter(pro => pro.attributes.category === "cast-talent")
  const influencers = professions?.filter(pro => pro.attributes.category === "influencer")
  const creativeProductions = professions?.filter(pro => pro.attributes.category === "creative-production")
  const contentCreators = professions?.filter(pro => pro.attributes.category === "content-creator")

  return (
    <div className="group hidden md:flex ">
      <Link href="/search/talent">
        <p className="flex items-center font-semibold hover:bg-secondary transition-all text-[16px] px-3 h-[75px]">
          Мэргэжилтэн олох <ChevronDown size={28} strokeWidth={3} className="group-hover:rotate-180 px-1 py-1 text-[28px] transition-all duration-300" />
        </p>
      </Link>
      {/* mega menu */}
      <div className="group-hover:opacity-100 group-hover:block bg-primary transition-all duration-300 absolute w-[100%] left-0 hidden opacity-0  z-[-50] top-[70px] md:top-[75px]">
        <div className="bg-primary p-5 flex">
          <div className="hidden border-r-2 border-color3 lg:flex p-5 flex-col w-[256px] rounded-[20px] mr-5">
              <Link href={"#"} className='mb-4 font-[600] text-[24px]'>
                <p>Мэргэжилтэн</p>
              </Link>
            <p>
              Хэдхэн товшилтоор олон төрлийн загвар өмсөгч,
              жүжигчид, нөлөөлөгчдийг хурдан олж, захиалаарай.
            </p>
            <Link href={"/post-a-job"}>
              <Button className="my-5 w-full" variant="outline" >
                Ажил байршуулах
              </Button>
            </Link>

            <Link href={"/search/work"}>
              <Button variant="secondary" className="w-full">
                Мэргэжилтэн  олох
              </Button>
            </Link>
          </div>
          <div
            style={{ '--image-url': `url(${creativeProductionBg})` } as any}
            className="flex p-5 flex-col w-[256px] hover:bg-[image:var(--image-url)] rounded-lg bg-cover bg-center"
          >
            <Link href={"#"} className='mb-4 font-[600] text-[24px]'>
              <p>{headers?.creative_production.title}</p>
            </Link>
            {
              creativeProductions?.map((talent) => (
                <TalentLink key={talent.id} link={talent.attributes.name}/>
              ))
            }
          </div>
          <div
            style={{ '--image-url': `url(${castTalentBg})` } as any}
            className={`flex p-5 flex-col w-[256px] hover:bg-[image:var(--image-url)] rounded-lg bg-cover bg-center`}
          >
            <Link href={"#"} className='mb-4 font-[600] text-[24px]'>
              {headers?.cast_talent.title}
            </Link>
            {
              castTalents?.map((talent) => (
                <TalentLink key={talent.id} link={talent.attributes.name} />
              ))
            }
          </div>
          <div
            style={{ '--image-url': `url(${influencerBg})` } as any}
            className="flex p-5 flex-col w-[256px] hover:bg-[image:var(--image-url)] rounded-lg bg-cover bg-center"
          
          >
            <Link href={"#"} className='mb-4 font-[600] text-[24px]'>
              {headers?.influencer.title}
            </Link>
            {
              influencers?.map((talent) => (
                <TalentLink key={talent.id} link={talent.attributes.name} />
              ))
            }
          </div>
          <div
            style={{ '--image-url': `url(${contentCreatorBg})` } as any}
            className="flex p-5 flex-col w-[256px] hover:bg-[image:var(--image-url)] rounded-lg bg-cover bg-center"
          
          >
            <Link href={"#"} className='mb-4 font-[600] text-[24px]'>
              {headers?.content_creator.title}
            </Link>
            {
              contentCreators?.map((talent) => (
                <TalentLink key={talent.id} link={talent.attributes.name} />
              ))
            }
          </div>
         
        </div>
      </div>
      {/* mega menu end */}
    </div>
  );
}

export default MegaLinks;
