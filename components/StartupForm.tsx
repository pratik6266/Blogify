'use client';

import React, { useActionState, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { z } from 'zod';
import { formSchema } from '@/lib/validation';
import { useRouter } from 'next/navigation';
import { createPitch } from '@/lib/action';

const StartupForm = () => {
  const [error, setError] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const router = useRouter();
  
  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        category: formData.get('category') as string,
        link: formData.get('link') as string,
        pitch,
      }

      await formSchema.parseAsync(formValues); 
      console.log(formValues);
      const result = await createPitch(prevState, formData, pitch);
      if(result.status === 'SUCCESS') {
        router.push(`/startup/${result._id}`);
      }
      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setError(fieldErrors as unknown as Record<string, string>);
        return {...prevState, error: 'Validation failed', status: 'ERROR'}; 
      } 
      return {
        ...prevState,
        error: 'An unexpected error occurred',
        status: 'ERROR',
      };
    } 
  }

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {error: '', status: 'INITIAL'});

  return (
    <>
      <form action={formAction} className='startup-form'>
        <div>
          <label htmlFor="title" className='startup-form_label'>Title</label>
          <Input id='title' name='title' className='startup-form_input border-black border-bold' required placeholder='Blog Title' />

          {error.title && <p className='startup-form_error'>{error.title}</p>}
        </div>

        <div>
          <label htmlFor="description" className='startup-form_label'>Description</label>
          <Textarea id='description' name='description' className='startup-form_textarea border-black border-bold' required placeholder='Blog Description' />

          {error.description && <p className='startup-form_error'>{error.description}</p>}
        </div>

        <div>
          <label htmlFor="category" className='startup-form_label'>Category</label>
          <Input id='category' name='category' className='startup-form_input border-black border-bold' required placeholder='Blog Category (Tech, Health, Education...)' />

          {error.category && <p className='startup-form_error'>{error.category}</p>}
        </div>

        <div>
          <label htmlFor="link" className='startup-form_label'>Image Url</label>
          <Input id='link' name='link' className='startup-form_input border-black border-bold' required placeholder='Blog Image URL' />

          {error.link && <p className='startup-form_error'>{error.link}</p>}
        </div>

        <div data-color-mode='light'>
          <label htmlFor="pitch" className='startup-form_label mb-2'>Blog Pitch</label>
          <MDEditor className='border-black border-bold mt-4'
            value={pitch}
            onChange={(value) => setPitch(value as string)}
            id='pitch'
            preview='edit'
            height={300}
            style={{ borderRadius: 20, overflow: 'hidden' }}
            textareaProps={{
              placeholder: 'Write your blog pitch here...',
            }}
            previewOptions={{
              disallowedElements: ['stlye']
            }}
          />
          {error.pitch && <p className='startup-form_error'>{error.pitch}</p>}
        </div>

        <Button type='submit' className='startup-form_btn border-black border-1 text-white' disabled={isPending} >
          {isPending ? 'Posting...' : 'Post Your Blog'}
          <Send className='size-6 ml-2'/>
        </Button>
      </form>
    </>
  )
}

export default StartupForm