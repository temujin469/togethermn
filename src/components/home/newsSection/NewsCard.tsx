import moment from "moment";
import Link from "next/link";
import { BsCalendarDate } from "react-icons/bs";
import * as FiIcons from "react-icons/fi";
import "moment/locale/mn"

moment.locale("mn");

export default function NewsCard({ news, color }:any) {
  return (
    <div className="w-full mb-5">
      <div className="w-full overflow-hidden h-[210px] rounded-lg border dark:border-slate-600">
        <img
          alt="Post thumbnail"
          src={news.photo}
          className="hover:scale-[1.1] transition-all w-full h-full object-cover cursor-pointer mb-2"
        />
      </div>
      <p className="text-[13px] mt-2 mb-1 text-gray flex items-center gap-1 dark:text-light-gray/60">
        <BsCalendarDate />
        {moment(news.createdAt).format("ll")}
      </p>
      <h3 className=" md:h-[50px] mb-2 overflow-hidden dark:text-light-gray">
        {news.title.length > 100
          ? `${news.title.slice(0, 100)}...`
          : news.title}
      </h3>
      <Link href={`/news/${news.slug}`} className="flex items-end">
        <p
          className="hover:pr-2 duration-200"
          style={{ color: color ? color : "#FE7200" }}
        >
          See more
        </p>
        <FiIcons.FiChevronRight
          className=" text-[23px] pl-1"
          style={{ color: color ? color : "#FE7200" }}
        />
      </Link>
    </div>
  );
}