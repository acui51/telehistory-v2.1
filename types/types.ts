interface ILinkText {
  type: string;
  text: string;
}

export interface IMessage {
  id: number;
  type: string;
  date: string;
  from: string;
  from_id: number;
  photo?: string;
  width: number;
  height: number;
  text: string | ILinkText[];
  file?: string;
  thumbnail?: string;
}

export interface IKeyword {
  keyword: string;
  confidence_score: number;
}
