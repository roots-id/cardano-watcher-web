interface AuthProvider {
  isAuthenticated: boolean;
  aid: null | string;
  signin(aid: string): Promise<void>;
  signout(): Promise<void>;
}

export const authProvider: AuthProvider = {
  isAuthenticated: false,
  aid: null,
  async signin(aid: string) {
    if (!aid) return;

    authProvider.isAuthenticated = true;
    authProvider.aid = aid;
  },
  async signout() {
    authProvider.isAuthenticated = false;
    authProvider.aid = null;
  },
};
