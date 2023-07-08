import React from 'react'

function TabContent({ tabContents }:{tabContents:About[]}) {
  return (
    <div className='grid xl:px-16 p-5 gap-8 md:grid-cols-2 xl:grid-cols-3'>
      {
        tabContents.map((content,i) => (
          <div className='md:h-[310px] flex flex-col items-center' key={i}
          data-aos="fade-right"
          data-aos-offset="200"
          data-aos-delay="50"
          >
            <div>
              <img className='max-w-[200px] max-h-[150px] h-full ' src={content.img} alt={content.title} />
            </div>
            <div>
              <h2 className='sub-heading mb-2'>{content.title}</h2>
              <p>{content.description}</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default TabContent