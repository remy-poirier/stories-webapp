export interface Message {
  id: string;
  order: number;
  storyId: string;
  text: string;
  from: SenderTypes;
}

export enum SenderTypes {
  Witness= "WITNESS",
  Victim = "VICTIM",
  Narrator = "NARRATOR"
}
