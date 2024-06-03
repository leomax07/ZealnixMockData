export interface ScratchpadType {
  id?: string;
  title: string;
  type: string;
  content: string;
  pinned?: boolean;
  tags?: string[];
}
export interface ScratchpadTypeInitialState {
  loading: boolean;
  error: string;
  scratchpads: ScratchpadType[];
}
