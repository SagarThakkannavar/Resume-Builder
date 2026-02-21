const STORAGE_KEY = 'rb_final_submission';

export interface FinalSubmissionLinks {
  lovable: string;
  github: string;
  deploy: string;
}

const empty: FinalSubmissionLinks = {
  lovable: '',
  github: '',
  deploy: '',
};

export function getFinalSubmission(): FinalSubmissionLinks {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<FinalSubmissionLinks>;
      return { ...empty, ...parsed };
    }
  } catch {
    // ignore
  }
  return { ...empty };
}

export function setFinalSubmission(links: FinalSubmissionLinks): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
  } catch {
    // ignore
  }
}

export function setFinalSubmissionLink(
  key: keyof FinalSubmissionLinks,
  value: string
): void {
  const prev = getFinalSubmission();
  setFinalSubmission({ ...prev, [key]: value });
}

/** Valid http(s) URL. */
export function isValidUrl(s: string): boolean {
  if (!s || !s.trim()) return false;
  try {
    const u = new URL(s.trim());
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

export function allLinksValid(links: FinalSubmissionLinks): boolean {
  return (
    isValidUrl(links.lovable) &&
    isValidUrl(links.github) &&
    isValidUrl(links.deploy)
  );
}

export function allLinksProvided(links: FinalSubmissionLinks): boolean {
  return (
    links.lovable.trim() !== '' &&
    links.github.trim() !== '' &&
    links.deploy.trim() !== ''
  );
}
