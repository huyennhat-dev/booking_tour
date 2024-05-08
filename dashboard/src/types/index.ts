export type TOUR_TYPE = {
  id?: number;
  tour_name: string;
  initial_price: number;
  departure_day: string;
  end_tour_day: string;
  promotional: number;
  destination: string;
  vehicle: string;
  photos?: string[];
  introduce: string;
  highlight: string;
  point_rating?: number;
  insurance: boolean;
  meal: boolean;
  max_user: number;
  id_staff: number;
  id_manager: number;
};

export type USER_TYPE = {
  id: number;
  email: string;
  name: string;
  avatar: string;
};

export type BOOK_INFO = {
  name: string;
  email: string;
  phone_number: string;
  address: string;
  message: string;
};

export type BOOK_TYPE = {
  id: number;
  userData: USER_TYPE;
  tourData: TOUR_TYPE;
  status: string;
  booking_info: BOOK_INFO;
  member: number;
  total_price: number;
  createdAt?: string;
};

export type CANCEL_TOUR_TYPE = {
  id: number;
  userData: USER_TYPE;
  tourData: TOUR_TYPE;
  status: string;
  booking_info: BOOK_INFO;
  member: number;
  total_price: number;
  cancelData: {
    id?: number;
    is_refund: boolean;
    reason: string;
    stk: {
      name: string;
      bank: string;
      stk: string;
    };
    createdAt: string;
  };
};

export type ACCOUNT_TYPE = {
  email: string;
  username: string;
  role?: string;
  avatar?: string;
  phoneNumber: string;
};

export type PARAM_TYPE = {
  page?: number;
  limit?: number;
  exp?: number;
};
