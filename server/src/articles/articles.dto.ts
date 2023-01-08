export class InsertArticleDTO {
  readonly content: string;
}

export class FindArticleDTO {
  readonly keyword: string;
}

export class UpdateArticleDTO {
  readonly id: number;
  readonly content: string;
}

export class DeleteArticleDTO {
  readonly id: number;
}
