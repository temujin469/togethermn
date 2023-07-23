import { H4 } from "@/components/ui/Typography/Heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";



const ShowDetail = ({ value, label }: { value?: string, label: string }) => {

  if (!value) return null

  return (
    <tr>
      <td>
        <p className='font-semibold'>{label}</p>
      </td>
      <td>{value}</td>
    </tr>
  )
}

const JobItem = ({ job, id }: { job: ResponseJob, id: number }) => {

  // const proType = job.typeOfProfession;
  return (

    <div className='mb-10 flex flex-col lg:flex-row gap-5 justify-between'>
      <div>
        <H4 className='text-primary scroll-m-0 mb-2'>{job.title}</H4>
        <p className='font-semibold mb-2'>{job.profession} - {job.budget} </p>
        <blockquote className='border-l-2 pl-6 border-l-secondary'>
          {
            job.description && (
              <div dangerouslySetInnerHTML={{__html:(job.description.length > 100) ? `${job.description?.slice(0, 100)}...` : job.description }}/>
            )
          }

          <table>
            <tbody>
              <ShowDetail value={job.locations![0]} label={"Байршил: "} />
              <ShowDetail value={job.minAge || job.maxAge ? `${job.minAge}-${job.maxAge}` : "Бүх"} label={"Нас: "} />
              <ShowDetail value={job.gender} label={"Хүйс: "} />
            </tbody>
          </table>
        </blockquote>
      </div>
      <Link href={`/job/${id}`}>
        <Button className='w-full'>дэлгэрэнгүй</Button>
      </Link>
    </div>
  )
}

export default JobItem;