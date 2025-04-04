import React from 'react'
import Pings from './Pings'
import { client } from '@/sanity/lib/client'
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries';
import { writeClient } from '@/sanity/lib/write-client';

const Views = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client.withConfig({ useCdn: false })
  .fetch(STARTUP_VIEWS_QUERY, { id });

  await writeClient.patch(id)
    .set({ views: totalViews + 1 })
    .commit();

  return (
    <div className='view-container'>
      <div className='absolute -top-2 -right-2'>
        <Pings />
      </div> 

      <p className='view-text bg-pink-100'>
        <span className='font-black'>{totalViews} {totalViews > 1 ? (
          <>Views</>
        ) : (
          <>View</>
        )}</span>
      </p>
    </div>
  )
}

export default Views