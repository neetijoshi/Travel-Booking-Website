"use client"
import Input from '@/ui/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { createNewListing } from './api';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { schema } from './schema';
import Select from '@/ui/Select';
import { optionLocations, optionTypes } from '@/data/data';
import Button from '@/ui/Button';
import toast from 'react-hot-toast';
import { postImages } from './api';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
const Create = () => {
    const CLOUD_NAME= process.env.CLOUD_NAME
    const UPLOAD_PRESET= process.env.UPLOAD_PRESET
    const router =useRouter()
    const [image, setImage] = React.useState([])

    const{mutateAsync, isLoading} = useMutation({
        mutationFn: ({data, imageUrls}) => createNewListing(data, imageUrls),
        mutationKey: ["listings"]
    })
    const{
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            desc: "",
            beds: 5,
            hasFreeWifi: false,
            type: "luxury",
            location: "dubai",
            pricePerNight: 123
        }
    })

    useEffect(() => {
        if(Object.keys(errors).length > 0){
            Object.keys(errors).forEach((errorKey) => {
                toast.error(errors[errorKey]?.message)
            })
        }
    }, [errors])

    const handleImage =(e) =>{
        setImage((prev) => {
            return [...prev, e.target.files[0]]
        })
    }

    const uploadImage = async(image, idx) =>{
        if(!image) return 

        const toastId = toast.loading(`Image ${idx +1} is being uploded`)

        const formData = new FormData()
        formData.append("file",image)
        formData.append("uplaod_preset", UPLOAD_PRESET)

        try {
            const imageUrl = await postImages(CLOUD_NAME, formData)
            toast.success(`Sucessfully uploaded ${idx + 1}`)
            toast.dismiss(toastId)

            return imageUrl
        } catch (error) {
            console.error(error)
        }
    }
    const onSubmit = async(data) =>{
        if(!image?.length) return toast.error("You must publish an image")

        const imageUrls = await Promise.all(image.map((img, idx) => {
            const imageUrl = uploadImage(img, idx)
            return imageUrl
        }))

        const newListing = await mutateAsync({ data, imageUrls})
        toast.success("Redrecting to listing....")
        router.push(`/details/${newListing.id}`)
    }
  return (
    <div className="min-h-[900px] w-full flex justify-center items-center">
      <div className="h-2/5 w-1/5 rounded-xl border border-slate-300">
        <div className="p-3 w-full border-b border-slate-300">
            <h3 className='text-center font-semibold text-2xl'>
                Create a listing
            </h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full px-4 py-6 flex flex-col items-center gap-8'>
            <Input 
                type="text" 
                className="text-slate-400 w-2/3 outline-none p-2"
                register={register("name")}
                placeholder="Arabian Paradise"
            />
            <Input 
                type="text" 
                className="text-slate-400 w-2/3 outline-none p-2"
                register={register("desc")}
                placeholder="This hotel is amazing! It has amazing view"
            />
            <Select
                data={optionLocations}
                className="text-slate-400 w-2/3 outline-none ml-2"
                register={register("location")}
            />
            <Select
                data={optionTypes}
                className="text-slate-400 w-2/3 outline-none ml-2"
                register={register("type")}
            />
            <Input 
                type="number" 
                className="text-slate-400 w-2/3 outline-none p-2"
                register={register("pricePerNight", { valueAsNumber: true})}
                step={0.01}
                placeholder="₹5000"
            />
            <Input 
                type="number" 
                className="text-slate-400 w-2/3 outline-none p-2"
                register={register("pricePerNight", { valueAsNumber: true})}
                step={1}
            />
            <div className='text-slate-400 ml-4 w-2/3 flex items-center gap-4'>
                <label htmlFor="freeWifi">
                    Free Wifi
                </label>
                <Input
                    register={register("hasFreeWifi")}
                    type="checkbox"
                    id="freeWifi"
                    className="w-4 h-4"
                />
            </div>
            <label className="text-slate-400 w-2/3 ml-4" htmlFor='images'>
                Upload Images
            </label>
            <input 
                onChange={handleImage}
                type="file" 
                className='text-slate-400'
                style={{display: "none"}}
                id="images"
            />
            <Button
             disabled={isLoading}
             className="w-2/3 bg-blue-500 text-white px-4 py-2 rounded-xl disabled:bg-blue-700"
             label="Submit"
            />
        </form>
      </div>
    </div>
  );
}

export default Create;