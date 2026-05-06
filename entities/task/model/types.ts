export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  name: string;
  isComplete: boolean;
  priority: Priority;
  deadline?: string;
}
