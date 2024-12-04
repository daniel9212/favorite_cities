import axios from 'axios';

const BASE_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';

interface Config {
  method?: string;
  params?: Record<string, string>;
  withBaseURL?: boolean;
}

export async function request(
  url: string,
  { withBaseURL = true, method = 'GET', ...config }: Config = {} as Config,
) {
  return axios({
    url: withBaseURL ? `${BASE_URL}${url}` : url,
    method,
    ...config,
  });
}
