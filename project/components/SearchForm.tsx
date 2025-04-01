import React from 'react';
import Form from 'next/form'
import SearchFormReset from '@/components/SearchFormReset';
import { Search } from 'lucide-react';

const searchForm = ({query}: {query?: string}) => {

  return (
    <Form action="/" scroll={false} className='search-form text-black border-black bg-white'>
      <input 
        name="query"
        defaultValue={query}
        className='search-input'
        placeholder='Search Blogs'
      />

      <div className='flex gap-2'>
        {query && <SearchFormReset /> }
        <button type='submit' className='text-white search-btn bg-black'>
          <Search className='size-5' />
        </button>
      </div>
    </Form>
  )
}

export default searchForm