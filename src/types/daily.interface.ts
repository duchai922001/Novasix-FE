export interface IDailyTask {
  _id?: string;
  title?: string;
  description?: string;
  attachedFile?: string;
  numberOfPomodoros?: number;
  type?: string;
  status?: string;
}
