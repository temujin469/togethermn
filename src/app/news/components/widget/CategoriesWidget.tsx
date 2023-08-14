import React from 'react';
import Widget from '../Widget';
import Link from 'next/link';
import getNewsCategory from '@/utils/news/getNewsCategory';

async function CategoriesWidget() {
  const category = await getNewsCategory();

  return (
    <Widget title='Ангилал'>
{
        category?.data?.map(category => {
          // const isActive = Boolean(catId == category.id);
          return (
            <div>
              <Link href={`/news?cat=${category.id}`}>
                <p className='text-md font-md text-gray-700 bg-gray-100 rounded-lg px-3 py-2 mb-2 hover:bg-gray-50'>
                  {category.attributes.name}
                </p>
              </Link>
            </div>
          )
        })
      }
    </Widget>
  );
}

export default CategoriesWidget;
