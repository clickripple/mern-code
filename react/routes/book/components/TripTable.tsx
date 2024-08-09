import React from 'react'
import { useBookingStore } from '../booking.store';
import { Availablity } from '@/types/Availablity';

const TripTable = ({ item }: {item: Availablity }) => {
    const { step1, passengers } = useBookingStore();

    return (
        <table className="table table-hover">
            <thead className="table-primary">
                <tr>
                    <th scope="col">Depart</th>
                    <th scope="col">Arrive</th>
                    <th scope="col">Passengers</th>
                </tr>
            </thead>
            <tbody>
                <tr className="table-row">
                    <td>
                        <strong>{step1.from_city_obj?.name}</strong>
                        <div>{step1.from_city_obj?.address}</div>
                        <strong>{item.dateShow}</strong>
                        <p>
                            <strong>{item.startTime}</strong>
                        </p>
                    </td>
                    <td>
                        <strong>{step1.to_city_obj?.name}</strong>
                        <div>{step1.to_city_obj?.address}</div>
                        <strong>{item.dateShow}</strong>
                        <p>
                            <strong>{item.endTime}</strong>
                        </p>
                    </td>
                    <td>
                        {passengers.map((i, index) => <div key={index}>{`${++index} - ${i?.data?.name ?? ''}`}</div>)}
                    </td>
                </tr>


            </tbody>
        </table>
    )
}

export default TripTable