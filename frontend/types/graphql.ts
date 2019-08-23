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
  createPost?: Maybe<Post>,
  updatePost?: Maybe<Post>,
  signUp?: Maybe<UserToken>,
  signIn?: Maybe<UserToken>,
};


export type MutationCreatePostArgs = {
  input?: Maybe<PostInput>
};


export type MutationUpdatePostArgs = {
  id: Scalars['ID'],
  input?: Maybe<PostInput>
};


export type MutationSignUpArgs = {
  input?: Maybe<UserInput>
};


export type MutationSignInArgs = {
  input?: Maybe<UserInput>
};

export type Post = {
  __typename?: 'Post',
  id: Scalars['ID'],
  title?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
  author?: Maybe<User>,
};

export type PostInput = {
  title?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
  author?: Maybe<Scalars['ID']>,
};

export type Query = {
  __typename?: 'Query',
  post?: Maybe<Post>,
  posts?: Maybe<Array<Maybe<Post>>>,
  _empty?: Maybe<Scalars['String']>,
};


export type QueryPostArgs = {
  id: Scalars['ID']
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
