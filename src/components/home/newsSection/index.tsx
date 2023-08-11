import React from "react";
import Container from "@/components/ui/container";
import Link from "next/link";
import { H2, H3 } from "@/components/ui/Typography/Heading";
import moment from "moment";
import "moment/locale/mn"
import getHomePageContents from "@/utils/fetch/getHomePageContents";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";


async function NewsSection() {


  const homeContent = await getHomePageContents()

  const articles = homeContent?.attributes.featured_articles.data

  return (
    <Container>
      {/* <!-- Container for demo purpose --> */}
      <div className=" my-24 xl:container mx-auto ">
        {/* <!-- Section: Design Block --> */}
        <section className="mb-32 text-center xl:mx-16">
          <H2 className="mb-12 pb-4 text-center ">
            Сүүлийн үеийн нийтлэлүүд
          </H2>

          <div className="grid gap-4  md:grid-cols-2 lg:grid-cols-3">

            {articles?.map(article => (
              <div key={article.id} className="col-span-1 mb-6">
                <div
                  className="relative block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 border">
                  <div className="flex">
                    <div
                      className="relative w-full aspect-[6/4] mx-4 -mt-4 overflow-hidden rounded-lg shadow-lg dark:shadow-black/20">
                      <Image src={article.attributes.image.data.attributes.url} className="object-cover" fill alt={article.attributes.title} />
                      <a href="#!">
                        <div
                          className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="p-5 lg:p-6">
                    <h5 className="mb-3 text-lg font-bold">{article.attributes.title}</h5>
                    <p className="mb-4 text-neutral-500 dark:text-neutral-300">
                      <small>Нийтэлсэн <u>{moment(article.attributes.date).format('ll')}</u></small>
                    </p>
                    <p className="mb-4 pb-2 text-gray-500 h-[150px] overflow-hidden text-ellipsis w-full">
                      {article.attributes.content}
                    </p>
                    <Link href={`/news/${article.id}`} data-te-ripple-init data-te-ripple-color="light"
                      className="inline-block rounded-full bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                      Цааш унших</Link>
                  </div>
                </div>
              </div>
            ))}



          </div>
          <Link href="/news" className="mt-5">
            <Button>Цааш үзэх<ArrowRight className="text-gray-700" /></Button>
          </Link>
        </section>
        
        {/* <!-- Section: Design Block --> */}
      </div>
      {/* <!-- Container for demo purpose --> */}
    </Container>
  );
}

export default NewsSection;