import React from 'react';
import SearchForm from '@/components/SearchForm'; 
import StartupCard from '@/components/StartupCard';

export default async function Home({ searchParams }: 
  { searchParams: Promise<{ query?: string }>}) {
    const query = (await searchParams).query;

    const posts = [
      {
        _createdAt: new Date(),
        views: 55,
        author: {
          _id: 1,
          name: 'Pratik Raj'
        },
        _id: 1,
        description: 'This is a description',
        image: 'https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg',
        category: 'Robots',
        title: 'We Robots',
      },
    ]

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
    </>
  );
}
