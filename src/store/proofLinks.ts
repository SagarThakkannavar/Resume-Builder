const KEYS = {
  lovable: 'rb_proof_lovable_link',
  github: 'rb_proof_github_link',
  deploy: 'rb_proof_deploy_link',
} as const;

export function getProofLinks() {
  return {
    lovable: localStorage.getItem(KEYS.lovable) ?? '',
    github: localStorage.getItem(KEYS.github) ?? '',
    deploy: localStorage.getItem(KEYS.deploy) ?? '',
  };
}

export function setProofLink(key: 'lovable' | 'github' | 'deploy', value: string) {
  localStorage.setItem(KEYS[key], value);
}
