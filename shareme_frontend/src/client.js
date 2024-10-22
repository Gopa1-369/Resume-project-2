///this is the file for our sanity client side


import { createClient } from '@sanity/client';

import imageUrlBuilder from '@sanity/image-url'



export const client = createClient({
projectId:import.meta.env.VITE_SANITY_PROJECT_ID,
dataset:'production',
apiVersion:'2024-10-14',
//more quicky show the images around the world
useCdn:true,
token:import.meta.env.VITE_SANITY_TOKEN,
ignoreBrowserTokenWarning: true,
})

const builder = imageUrlBuilder(client);

//this is utility function
export const urlFor = (source)=>builder.image(source)