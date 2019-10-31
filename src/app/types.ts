export class Post {
  id: number;
  message?: string;
  story?: string;
  // tslint:disable-next-line: variable-name
  created_time: string;
}

export class Accounts {
  // tslint:disable-next-line: variable-name
  data: Array<Account>;
  paging: any;
}

export class Account {
  // tslint:disable-next-line: variable-name
  access_token: string;
  category: string;
  // tslint:disable-next-line: variable-name
  category_list: any[];
  name: string;
  id: string;
  tasks: any[];
}

export class Live {
  status: string;
  // tslint:disable-next-line: variable-name
  stream_url: string;
  // tslint:disable-next-line: variable-name
  secure_stream_url: string;
  // tslint:disable-next-line: variable-name
  embed_html: string;
  description: string;
  id: string;
  viewer?: string;
}

export class AuthResponse {
  accessToken: string;
  userID: string;
  expiresIn: number;
  signedRequest: string;
  // tslint:disable-next-line: variable-name
  data_access_expiration_time: number;
}

export class Comment {
  // tslint:disable-next-line: variable-name
  created_time: string;
  from: {
    name: string;
    id: string
  };
  message: string;
  id: string;
  replied?: boolean;
}
