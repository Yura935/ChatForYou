// Decodes demo credentials from the URL. Inputs: demo query token. Returns: user/password or null.

export interface DemoCredentials {
  u: string;
  p: string;
}

// Decodes a base64url `demo` token into credentials.
export function decodeDemoCredentials(token: string): DemoCredentials | null {
  try {
    let base64 = token.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const parsed = JSON.parse(atob(base64)) as Partial<DemoCredentials>;
    if (typeof parsed.u !== 'string' || typeof parsed.p !== 'string') {
      return null;
    }
    return { u: parsed.u, p: parsed.p };
  } catch {
    return null;
  }
}
