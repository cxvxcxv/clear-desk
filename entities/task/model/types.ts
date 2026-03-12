export type TPriority = 'low' | 'medium' | 'high';

export interface ITask {
  id: string;
  name: string;
  isComplete: boolean;
  priority: TPriority;
  deadline?: Date;
}
