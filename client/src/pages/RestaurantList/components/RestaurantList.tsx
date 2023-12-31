import React, { useContext, useEffect } from 'react';
import RestaurantFinder from '../../../setup/apis/RestaurantFinder';
import { RestaurantsContext } from '../../../setup/context/RestaurantContext';
import { RestaurantContextType, Restaurant } from '../../../setup/@types/Restaurant';
import RestaurantComponent from './RestaurantComponent';

import { useErrorBoundary } from "react-error-boundary";

const RestaurantList: React.FC = () => {
    const { restaurants, saveRestaurants, deleteRestaurant } = useContext(RestaurantsContext) as RestaurantContextType;
    const { showBoundary } = useErrorBoundary();

    useEffect(() => {

        async function RestaurantDbCall() {
            try {
                const response = await RestaurantFinder.get("/");
                const restaurantData = response.data.data.restaurants;

                saveRestaurants(restaurantData);
                console.log(restaurantData)
            } catch (error: any) {

                if (error.name === 'AbortError') {
                    console.log('fetch aborted')
                } else {
                    showBoundary(error)
                }
            }
        }
        RestaurantDbCall();
    }, [])
    return (
        <div className='flex justify-center'>
            <table className="table-auto border-separate border border-slate-500 w-11/12">
                <thead>
                    <tr>
                        <th className='border border-slate-600'>Restaurant</th>
                        <th className='border border-slate-600'>Location</th>
                        <th className='border border-slate-600'>Price Range</th>
                        <th className='border border-slate-600'>Ratings</th>
                        <th className='border border-slate-600'>Edit</th>
                        <th className='border border-slate-600'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants?.map((newRestaurant: Restaurant) => (

                        <RestaurantComponent key={newRestaurant.id} deleteRestaurant={deleteRestaurant} restaurant={newRestaurant} />

                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default RestaurantList
