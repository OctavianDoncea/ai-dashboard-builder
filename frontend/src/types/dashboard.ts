import { DashboardWidget } from "./widget";

export interface DashboardTheme {
    primaryColor: string
    backgroundColor: string
    cardBackground: string
    textColor: string
    accentColor: string
    borderRadius: number
}

export interface Dashboard {
    id: string
    title: string
    description: string
    theme: DashboardTheme
    gridCols: number
    widgets: DashboardWidget[]
    createdAt: string
    updatedAt: string
}

export const DEFAULT_THEME: DashboardTheme = {
    primaryColor: '#3b82f6',
    backgroundColor: '#f8fafc',
    cardBackground: '#ffffff',
    textColor: '#1e293b',
    accentColor: '#10b981',
    borderRadius: 12, 
}