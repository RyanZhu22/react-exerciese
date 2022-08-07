import request from './request'

// Register
export const RegisterApi = (params) => request.post('/register', params)

// Login
export const LoginApi = (params) => request.post('/login', params)