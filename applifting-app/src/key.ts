export enum TokenTypes {
  Bearer = 'Bearer',
}

export type AccessToken = {
  accessToken: string;
  exiresIn: number;
  tokenType: TokenTypes.Bearer;
};
