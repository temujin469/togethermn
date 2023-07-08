import { Button } from '@/components/ui/button';
import { professions } from '@/utils/data';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function MegaLinks() {
  return (
    <>
      <li className="group hidden lg:flex ">
        <Link href="/search/talent">
          <p className="flex items-center font-semibold hover:bg-secondary transition-all text-[16px] px-3 h-[75px]">
            Мэргэжилтэн олох <ChevronDown size={28} strokeWidth={3} className="group-hover:rotate-180 px-1 py-1 text-[28px] transition-all duration-300" />
          </p>
        </Link>
        {/* mega menu */}
        <div className="group-hover:opacity-100 group-hover:block bg-primary transition-all duration-300 absolute w-[100%] left-0 hidden opacity-0  z-[-50] top-[70px] md:top-[75px]">
          <div className="bg-primary p-5 flex">
              <ul className="flex border-r-2 border-color3 p-5 flex-col w-[256px] rounded-[20px] mr-5">
                <li className="mb-4 font-[600] text-[24px]">
                  <Link href={"#"}>
                    <p>Мэргэжилтэн</p>
                  </Link>
                </li>
                <li>
                    Хэдхэн товшилтоор олон төрлийн загвар өмсөгч,
                    жүжигчид, нөлөөлөгчдийг хурдан олж, захиалаарай.
                </li>
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
              </ul>
              {professions.slice(0, 4).map((pro) => (
                <ul
                  className="flex p-5 flex-col w-[256px] hover:bg-secondary rounded-lg bg-cover bg-center"
                  // style={{
                  //   backgroundImage: `url()`
                  // }}
                  key={pro.slug}
                >
                  <li className="mb-4 font-[600] text-[24px]">
                    <Link href={"#"}>
                      <p>{pro.name}</p>
                    </Link>
                  </li>
                  <li className="mb-[1px]">
                    <Link href={"#"}>
                      <p className="whitespace-nowrap hover:pl-1 transition-all text-[16px]">{`Эрэгтэй ${pro.name}`}</p>
                    </Link>
                  </li>
                  <li className="mb-[1px]">
                    <Link href={"#"}>
                      <p className="whitespace-nowrap hover:pl-1 transition-all text-[16px]">{`Эмэгтэй ${pro.name}`}</p>
                    </Link>
                  </li>
                  <li className="mb-[1px]">
                    <Link href={"#"}>
                      <p className="whitespace-nowrap hover:pl-1 transition-all text-[16px]">{`Эрэгтэй ${pro.name}`}</p>
                    </Link>
                  </li>
                </ul>
              ))}
          </div>
        </div>
        {/* mega menu end */}
      </li>

      <li className="group hidden lg:flex ">
        <Link href="/search/work">
          <p className=" hover:bg-secondary transition-all text-[16px] font-semibold hover:text-white px-3 flex items-center h-[75px]">
            Ажил хайх <ChevronDown size={28} strokeWidth={3} className="group-hover:rotate-180 px-1 py-1 text-[28px] transition-all duration-300" />
          </p>
        </Link>
        {/* mega menu */}
        <div className="absolute w-[100%] left-0  bg-primary opacity-0 hidden group-hover:block group-hover:opacity-100  z-[-50] top-[70px] md:top-[75px] p-5">
          <div className="bg-primary flex">
              <ul className="flex border-r-2 border-color3 p-5 flex-col w-[256px] rounded-[20px] mr-5">
                <li className="mb-4 font-[600] text-[24px]">
                  <Link href={"/search/work"}>
                    <p>Ажил олох</p>
                  </Link>
                </li>
                <li>
                    Ажилд орох хүсэлт гарган тарифаа тохируулаад Vivid-ээр шууд цалингаа аваарай!
                </li>
                <Link href={"/post-a-job"}>
                  <Button className="my-5 w-full" variant="outline" >
                    Ажил байршуулах
                  </Button>
                </Link>
                <Link href={"/search/talent"}>
                  <Button variant="secondary" className="w-full">
                    Мэргэжилтэн харах
                  </Button>
                </Link>
              </ul>
              {professions.slice(0, 4).map((pro) => (
                <ul
                  className="flex p-5 flex-col w-[256px] rounded-lg bg-cover bg-center hover:bg-[url('https://images.pexels.com/photos/6940252/pexels-photo-6940252.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')]"
                  key={pro.slug}
                >
                  <li className="mb-4 font-[600] text-[24px]">
                    <Link href={"#"}>
                      <p>{pro.name}</p>
                    </Link>
                  </li>
                  <li className="mb-[1px]">
                    <Link href={"#"}>
                      <p className="whitespace-nowrap hover:pl-1 transition-all text-[16px]">{`Эрэгтэй ${pro.name}`}</p>
                    </Link>
                  </li>
                  <li className="mb-[1px]">
                    <Link href={"#"}>
                      <p className="whitespace-nowrap hover:pl-1 transition-all text-[16px]">{`Эмэгтэй ${pro.name}`}</p>
                    </Link>
                  </li>
                </ul>
              ))}
          </div>
        </div>
        {/* mega menu end */}
      </li>
    </>
  );
}

export default MegaLinks;
