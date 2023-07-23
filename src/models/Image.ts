export interface Tags {
  name: string
};

export interface Image {
  name: string,
  data: Buffer,
  contentType: string,
  tags: Tags[]
};