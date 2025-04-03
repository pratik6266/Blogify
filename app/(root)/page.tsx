import React from 'react';
import SearchForm from '@/components/SearchForm'; 
import StartupCard, { StartupTypeCard } from '@/components/StartupCard';
import { STARTUPS_QUERY } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/lives';
import { SanityLive } from '@/sanity/lib/lives';

export default async function Home({ searchParams }: 
  { searchParams: Promise<{ query?: string }>}) {
    const query = (await searchParams).query;
    const params = { search: query || null };
    const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">pitch your thoughts <br />Connect with people</h1>
        <p className="sub-heading">
          Submit Ideas, Vote on Blogs & Get Noticed
        </p>
        <SearchForm query={query} />
      </section>

      <section className='section_container'>
        <p className='text-30-semibold'>
          {query ? `Search results for "${query}"` : 'All Blogs'}
        </p>

        <ul className='mt-7 card_grid'>
          {posts.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post._id} post={post}/>
            ))
          ) : (
            <p className='no-results'>No Blog Found</p>
          )}
        </ul>

      </section>

      <SanityLive/>
    </>
  );
}
