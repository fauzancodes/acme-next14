'use client';

import { CustomerForm } from '@/app/lib/definitions';
import {
  EnvelopeIcon,
  PhotoIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateCustomer } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';

export default function EditCustomerForm({
  customer,
}: {
  customer: CustomerForm | undefined;
}) {
  console.log(customer)
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(updateCustomer, initialState);
  const [imageUrl, setImageUrl] = useState(customer?.image_url ? customer?.image_url : '/customers/image-placeholder.webp');

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer ID */}
        <input 
          type="hidden" 
          name="id" 
          value={customer?.id} 
          aria-describedby="id-error"
        />
        {state.errors?.id ? (
          <div
            id="id-error"
            aria-live="polite"
            className="mt-2 text-sm text-red-500"
          >
            {state.errors.id.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        ) : null}
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                defaultValue={customer?.name} 
                type="text"
                placeholder="Enter customer name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-error"
              />
            </div>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          {state.errors?.name ? (
            <div
              id="name-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.name.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>
        {/* Customer Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                defaultValue={customer?.email} 
                type="email"
                placeholder="Enter customer email"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="email-error"
              />
            </div>
            <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          {state.errors?.email ? (
            <div
              id="email-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.email.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>
        {/* Customer Image URL */}
        <div className="mb-4">
          <label htmlFor="image_url" className="mb-2 block text-sm font-medium">
            Image
          </label>
          <div className={`flex flex-wrap justify-start items-center gap-5 w-full`}>
            <Image alt='Preview' src={imageUrl} className={`rounded-lg`} width={150} height={150}/>
            <CldUploadWidget
              options={{ 
                sources: ['local'], 
                multiple: false,
              }}
              signatureEndpoint="/api/sign-cloudinary-params"
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}
              onSuccess={(result, { widget }) => {
                if (result?.info && typeof result.info === 'object') {
                  setImageUrl(result.info.secure_url);
                }
                widget.close();
              }}
            >
              {({ open }) => {
                function handleOnClick() {
                  open();
                }
                return (
                  <Button type="button" onClick={handleOnClick}>Upload Image</Button>
                );
              }}
            </CldUploadWidget>
          </div>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="image_url"
                name="image_url"
                type="text"
                placeholder="Enter customer image url"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="image-error"
                value={imageUrl}
              />
            </div>
            <PhotoIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          {state.errors?.image_url ? (
            <div
              id="image-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.image_url.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/customers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Customer</Button>
      </div>
    </form>
  );
}
