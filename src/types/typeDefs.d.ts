export type Maybe<T> = T | null;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Author = {
  __typename?: 'Author';
  id: Scalars['Int'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;

  /** the list of Posts by this author */
  posts?: Maybe<Array<Maybe<Post>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  upvotePost?: Maybe<Post>;
};

export type MutationUpvotePostArgs = {
  postId: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  author?: Maybe<Author>;
  votes?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  posts?: Maybe<Array<Maybe<Post>>>;
  author?: Maybe<Author>;
};

export type QueryAuthorArgs = {
  id: Scalars['Int'];
};
