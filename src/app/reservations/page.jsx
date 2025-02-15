import React from 'react';
import listing_image from "../../../public/assets/hr_1.jpg"
import Card from "./Card"
const Reservations = () => {
  const data=[
    {
      id:crypto.randomUUID(),
      listingId: 1,
      image: listing_image,
      location: "Dubai",
      name: "Arabian Paradaise",
      startDate: new Date(),
      endDate: new Date(),
      daysDifference: 3,
      pricePerNight: 5500,
    },
    {
      id:crypto.randomUUID(),
      listingId: 2,
      image: listing_image,
      location: "Dubai",
      name: "Arabian Paradaise",
      startDate: new Date(),
      endDate: new Date(),
      daysDifference: 3,
      pricePerNight: 5500,
    },
    {
      id:crypto.randomUUID(),
      listingId: 3,
      image: listing_image,
      location: "Dubai",
      name: "Arabian Paradaise",
      startDate: new Date(),
      endDate: new Date(),
      daysDifference: 3,
      pricePerNight: 5500,
    },
  ]
  return (
    <div className="mt-24 px-16 min-h-screen w-full">
      <div className="h-full w-full flex flex-wrap gap-12">
      {data?.map((hotel) => (
          <Card
            key={hotel.id}
            hotel={hotel}
            // mutate={mutate}
          />
        )) }
      </div>
    </div>
  );
}

export default Reservations;
