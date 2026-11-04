/** Paths relative to API_BASE_URL. They mirror the server controllers. */
export const ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    passwordResetRequest: "/auth/password-reset/request",
    passwordResetConfirm: "/auth/password-reset/confirm",
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
  payments: {
    root: "/payments",
    byId: (id: number) => `/payments/${id}`,
    execute: (reservationId: number) => `/payments/execute/${reservationId}`,
  },
  tickets: {
    search: "/tickets/search",
    byId: (id: number) => `/tickets/${id}`,
    cancel: (id: number) => `/tickets/${id}/cancel`,
  },
  transactions: { byId: (id: number) => `/transactions/${id}` },
  accounts: {
    balance: (userId: number) => `/accounts/user/${userId}/balance`,
    history: (userId: number) => `/accounts/user/${userId}/history`,
  },
  notifications: {
    forUser: (userId: number) => `/notifications/user/${userId}`,
    counts: (userId: number) => `/notifications/user/${userId}/counts`,
    read: (id: number) => `/notifications/${id}/read`,
  },
  userRequests: { root: "/user-requests", byId: (id: number) => `/user-requests/${id}` },
  tracking: {
    timeline: (refType: string, refId: number) => `/tracking/${refType}/${refId}`,
    comments: (refType: string, refId: number) => `/tracking/${refType}/${refId}/comments`,
  },
  reports: "/reports",
  media: { root: "/media", byId: (id: number) => `/media/${id}` },
} as const;
