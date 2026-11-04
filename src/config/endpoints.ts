/** Paths relative to API_BASE_URL. They mirror the server controllers. */
export const ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    passwordResetRequest: "/auth/password-reset/request",
  },
  users: { byId: (id: number) => `/users/${id}`, myProfile: "/users/me/profile" },
  countries: "/countries",
  tours: { catalog: "/tours/catalog", byId: (id: number) => `/tours/${id}` },
  seats: { search: "/seats/search" },
  reservations: {
    root: "/reservations",
    byId: (id: number) => `/reservations/${id}`,
    cancel: (id: number) => `/reservations/${id}/cancel`,
  },
  payments: { execute: (reservationId: number) => `/payments/execute/${reservationId}` },
  tickets: { search: "/tickets/search", cancel: (id: number) => `/tickets/${id}/cancel` },
  accounts: {
    balance: (userId: number) => `/accounts/user/${userId}/balance`,
    history: (userId: number) => `/accounts/user/${userId}/history`,
  },
  notifications: {
    forUser: (userId: number) => `/notifications/user/${userId}`,
    counts: (userId: number) => `/notifications/user/${userId}/counts`,
    read: (id: number) => `/notifications/${id}/read`,
  },
} as const;
