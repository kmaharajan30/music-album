export interface Song {
  id: string;
  title: string;
  durationInSeconds: number;
  sizeInBytes: number;
  performers: string[];
}

export interface Collection {
  id: string;
  name: string;
  artist: string;
  type: "EP" | "Album" | "Single";
  songCount: number;
  durationInSeconds: number;
  sizeInBytes: number;
  releasedOn: string;
  songs?: Song[];
}
export interface MusicInterface {
  collections: Collection[] | null;
  filteredCollections: Collection[] | null;
  selectedCollection: Collection | null;
  isFetching: boolean;
  isSuccess: boolean;
  isFailed: boolean;
}
export declare interface FetchMusicInterface {
  params?: { [key: string]: string | number | object };
  id?: string;
  urlParams: { collectionId: string | null };
}
