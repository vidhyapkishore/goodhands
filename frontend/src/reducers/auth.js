import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  GOOGLE_AUTH_SUCCESS,
  GOOGLE_AUTH_FAIL,
  FACEBOOK_AUTH_SUCCESS,
  FACEBOOK_AUTH_FAIL,
  LOGOUT,
} from "../actions/types";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  user: null,
  email: localStorage.getItem("email"),
  namee: localStorage.getItem("namee"),
  phone: localStorage.getItem("phone"),
  user_login: localStorage.getItem("user_login"),
  id: localStorage.getItem("id"),
  address: localStorage.getItem("address"),
  zip_code: localStorage.getItem("zip_code"),
  city: localStorage.getItem("city"),
  state: localStorage.getItem("state"),
  country: localStorage.getItem("country"),
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGIN_SUCCESS:
    case GOOGLE_AUTH_SUCCESS:
    case FACEBOOK_AUTH_SUCCESS:
      localStorage.setItem("access", payload.access);
      localStorage.setItem("refresh", payload.refresh);
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
        user: payload,
        email: payload.email,
        namee: payload.namee,
        phone: payload.phone,
        user_login: payload.user_login,
        id: payload.id,
        address: payload.address,
        zip_code: payload.zip_code,
        city: payload.city,
        state: payload.state,
        country: payload.country,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };
    case USER_LOADED_SUCCESS:
      localStorage.setItem("email", payload.email);
      localStorage.setItem("namee", payload.namee);
      localStorage.setItem("phone", payload.phone);
      localStorage.setItem("user_login", payload.user_login);
      localStorage.setItem("id", payload.id);
      localStorage.setItem("address", payload.address);
      localStorage.setItem("zip_code", payload.zip_code);
      localStorage.setItem("city", payload.city);
      localStorage.setItem("state", payload.state);
      localStorage.setItem("country", payload.country);
      return {
        ...state,
        user: payload,
        phone: payload.phone,
        user_login: payload.user_login,
        email: payload.email,
        namee: payload.namee,
        address: payload.address,
        zip_code: payload.zip_code,
        city: payload.city,
        state: payload.state,
        country: payload.country,
      };
    case AUTHENTICATED_FAIL:
        
    localStorage.removeItem("email");
    localStorage.removeItem("namee");
    localStorage.removeItem("phone");
    localStorage.removeItem("user_login");
    localStorage.removeItem("id");
    localStorage.removeItem("address");
    localStorage.removeItem("zip_code");
    localStorage.removeItem("city");
    localStorage.removeItem("state");
    localStorage.removeItem("country");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        phone: null,
        email: null,
        namee: null,
        address: null,
        zip_code: null,
        city: null,
        state: null,
        country: null,
      };
    case USER_LOADED_FAIL:
      return {
        ...state,
        user: null,
        user: null,
        phone: null,
        email: null,
        namee: null,
        address: null,
        zip_code: null,
        city: null,
        state: null,
        country: null,
      };  
    case GOOGLE_AUTH_FAIL:
    case FACEBOOK_AUTH_FAIL:
    case LOGIN_FAIL:
    case SIGNUP_FAIL:
    case LOGOUT:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");      
      localStorage.removeItem("email");
      localStorage.removeItem("namee");
      localStorage.removeItem("phone");
      localStorage.removeItem("user_login");
      localStorage.removeItem("id");
      localStorage.removeItem("address");
      localStorage.removeItem("zip_code");
      localStorage.removeItem("city");
      localStorage.removeItem("state");
      localStorage.removeItem("country");
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
        phone: null,
        email: null,
        namee: null,
        address: null,
        zip_code: null,
        city: null,
        state: null,
        country: null,
      };
    case PASSWORD_RESET_SUCCESS:
    case PASSWORD_RESET_FAIL:
    case PASSWORD_RESET_CONFIRM_SUCCESS:
    case PASSWORD_RESET_CONFIRM_FAIL:
    case ACTIVATION_SUCCESS:
    case ACTIVATION_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
