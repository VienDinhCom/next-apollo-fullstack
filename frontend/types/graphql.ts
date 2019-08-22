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
  createUser?: Maybe<User>,
  updateUser?: Maybe<User>,
};


export type MutationCreatePostArgs = {
  input?: Maybe<PostInput>
};


export type MutationUpdatePostArgs = {
  id: Scalars['ID'],
  input?: Maybe<PostInput>
};


export type MutationCreateUserArgs = {
  input?: Maybe<UserInput>
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'],
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
  user?: Maybe<User>,
  users?: Maybe<Array<Maybe<User>>>,
};


export type QueryPostArgs = {
  id: Scalars['ID']
};


export type QueryUserArgs = {
  id: Scalars['ID']
};

export type User = {
  __typename?: 'User',
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  posts?: Maybe<Array<Maybe<Post>>>,
};

export type UserInput = {
  name?: Maybe<Scalars['String']>,
};
