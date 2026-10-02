import { format } from 'date-fns';

export const formatDateTime = (date: Date) => format(date, 'MMM d, yyyy, h:mm a');