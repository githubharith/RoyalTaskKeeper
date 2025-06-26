export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Task {
  id: string;
  userId: string;
  name: string;
  createdAt: Date;
  dueDate: Date;
  isCompleted: boolean;
  isActive: boolean;
  completedAt?: Date;
}

export interface Log {
  id: string;
  userId: string;
  taskId?: string;
  taskName?: string;
  action: 'created' | 'completed' | 'deleted' | 'edited' | 'toggled';
  timestamp: Date;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}