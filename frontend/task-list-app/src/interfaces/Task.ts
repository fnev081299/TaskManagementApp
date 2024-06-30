export interface Task {
    id: number;
    title: string;
    description: string;
    status: 'Pending' | 'InProgress' | 'Completed';
    userId: number;
  }
  