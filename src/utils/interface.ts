import { Request } from "express";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: number;
  location: {
    latittude: string;
    longitude: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export type IUpdatedRequest = Request & { user: IUser };
