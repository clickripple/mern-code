"use client";
import { BookingType } from "@/types/BookingType";
import { fD, fT } from "@/utils/format";
import React from "react";

const BookSuccess = ({ item }: { item: BookingType }) => {
  return (
    <div className="content-form mt-5 mt-5 mb-4">
      <div className="row d-flex cart align-items-center justify-content-center">
        <div className="col-md-10">
          <div className="card">
            <div className="row g-0">
              <div className="col-md-6 border-right p-5">
                <div className="text-center order-details h-100">
                  <div className="d-flex justify-content-center mb-5 flex-column align-items-center h-100">
                    {" "}
                    <span className="check1">
                      <i className="fa fa-check"></i>
                    </span>{" "}
                    <span className="font-weight-bold">Order Confirmed</span>{" "}
                    <small className="mt-2">
                      Your invoice has been sent to your email address
                    </small>{" "}
                    <a
                      href="#"
                      className="text-decoration-none invoice-link d-none"
                    >
                      View Invoice
                    </a>{" "}
                  </div>{" "}
                  {/* <button className="btn btn-danger btn-block order-button d-none">
                    Go to your Order
                  </button> */}
                </div>
              </div>
              <div className="col-md-6 background-muted">
                <div className="p-3 border-bottom">
                  <div className="d-flex justify-content-between align-items-center">
                    {" "}
                    <span>
                      <i className="fa fa-clock-o text-muted"></i> Booking Id :{" "}
                      {item.uniqueId}
                    </span>
                    
                    <span>
                      <i className="fa-solid fa-calendar-days text-muted"></i>{" "}
                      {fD(item.createdAt)}
                    </span>
                  </div>
                  <span>
                      <i className="fa fa-clock-o text-muted"></i> Transaction Id :{" "}
                      {item.transactionId}
                    </span>
                  <div className="mt-3">
                    <h6 className="mb-0">{`From ${item.fromStopId.name} to ${item.toStopId.name}`}</h6>{" "}
                    <small className="d-block mt-2">
                      Departure: Start time {fT(item.departure_data.start_time)}
                      , Reach time {fT(item.departure_data.end_time)}
                    </small>
                    {item.return_data && (
                      <small className="d-block">
                        Arrival: Start time {fT(item.return_data.start_time)},
                        Reach time {fT(item.return_data.end_time)}
                      </small>
                    )}
                    <div className="d-flex flex-column mt-3">
                      {item.passengers.map((item, index) => (
                        <small key={index}>
                          <i className="fa-solid fa-person text-muted"></i>{" "}
                          {`${item.name}, ${item.phone}`}
                        </small>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="row g-0">
                  <div className="col-md-6">
                    <div className="p-3 d-flex justify-content-center align-items-center">
                      {" "}
                      <span className="font-weight-bold">Total</span>{" "}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="p-3 d-flex justify-content-center align-items-center">
                      {" "}
                      <span className="font-weight-bold">{`$ ${item.totalPrice}.00`}</span>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div> </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSuccess;
