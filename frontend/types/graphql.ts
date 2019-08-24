export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Mutation = {
  __typename?: 'Mutation',
  _empty?: Maybe<Scalars['String']>,
  signUp?: Maybe<UserToken>,
  signIn?: Maybe<UserToken>,
};


export type MutationSignUpArgs = {
  input?: Maybe<UserInput>
};


export type MutationSignInArgs = {
  input?: Maybe<UserInput>
};

export type Query = {
  __typename?: 'Query',
  _empty?: Maybe<Scalars['String']>,
};

export type User = {
  __typename?: 'User',
  id: Scalars['ID'],
  email?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
};

export type UserInput = {
  email: Scalars['String'],
  password: Scalars['String'],
};

export type UserToken = {
  __typename?: 'UserToken',
  token?: Maybe<Scalars['String']>,
};
