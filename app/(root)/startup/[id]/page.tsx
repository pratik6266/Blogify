import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
export const experimental_ppr = true;
import {formatDate} from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import markdownit from 'markdown-it';
import { Skeleton } from '@/components/ui/skeleton';

const md = markdownit();

const page = async ({ params }: { params: Promise<{id: string}>}) => {
  const id = (await params). id;
  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });
  if(!post) return notFound(); 
  const parseContent = md.render(post?.pitch || '');
  return (
    <>
      <section className='pink_container !min-h-[230px]'>
        <p className='tag'>{formatDate(post?._createdAt)}</p>
        <h1 className='heading'>{post.title}</h1>
        <p className='sub-heading !max-w-5xl'>{post.description}</p>
      </section>

      <section className='section_container flex-wrap items-center justify-center'>
        <img src={post.image} alt="thumbnail" className='w-full h-auto rounded-xl' />

        <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
          <div className='flex-between gap-5'>
            <Link className='flex gap-2 items-center mb-3' href={`/user/${post.author?._id}`}>
              <Image src={post.author.image} alt='avatar' width={64} height={64} className='rounded-full drop-shadow-lg'/>
              <div>
                <p className='text-20-medium '>{post?.author?.name}</p>
                <p className='text-16-medium text-zinc-500'>@{post?.author?.username}</p>
              </div>
            </Link>
            <p className='category-tag'>{post.category}</p>
          </div>

          <h3 className='text-30-bold'>Pitch Details</h3>
          {parseContent ? (
            <article className='prose max-w-4xl font-work-sans break-all'
              dangerouslySetInnerHTML={{ __html: parseContent }}  
            />
          ) : (
            <p className='no-result'>
              No Details Provided
            </p>
          )}
        </div>

        <hr className='divider' />

        <Suspense fallback={<Skeleton className='view_skeleton' />}>
          
        </Suspense>
      </section>
    </>
  )
}

export default page