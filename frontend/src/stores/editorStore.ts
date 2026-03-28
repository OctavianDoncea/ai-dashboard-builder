import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { DashboardWidget, GridPosition, ChartWidget, StatWidget, TextWidget } from '@/types/widget'
import { Dashboard, DashboardTheme, DEFAULT_THEME } from '@/types/dashboard'
import { v4 as uuidv4 } from 'uuid'

interface HistoryEntry {
    widgets: DashboardWidget[]
}

interface EditorState {
    // Dashboard data
    dashboard: Dashboard | null
    widgets: DashboardWidget[]
    selectedWidgetId: string | null
    // History
    history: HistoryEntry[]
    historyIndex: number
    // UI
    isSaving: boolean
    isEditing: boolean
    gridCols: number
    //Actions
    setDashboard: (dashboard: Dashboard) => void
    selectWidget: (id: string | null) => void
    //Widget CRUD
    addWidget: (widget: DashboardWidget) => void
    updateWidget: (id: string, updates: Partial<DashboardWidget>) => void
    updateWidgetConfig: (id: string, config: Record<string, any>) => void
    deleteWidget: (id: string) => void
    moveWidget: (id: string, grid: GridPosition) => void
    resizeWidget: (id: string, grid: GridPosition) => void
    // History
    saveToHistory: () => void
    undo: () => void
    redo: () => void
    // Theme
    updateTheme: (theme: Partial<DashboardTheme>) => void
    updateTitle: (title: string) => void
}

export const useEditorStore = create<EditorState>()(
    immer((set, get) => ({
        dashboard: null,
        widgets: [],
        selectedWidgetId: null,
        history: [],
        historyIndex: -1,
        isSaving: false,
        isEditing: true,
        gridCols: 12,

        setDashboard: (dashboard) =>
            set((state) => {
                state.dashboard = dashboard
                state.widgets = dashboard.widgets
                state.selectedWidgetId = null
                state.gridCols = dashboard.gridCols
            }),

        selectWidget: (id) =>
            set((state) => {
                state.selectedWidgetId = id
            }),

        addWidget: (widget) =>
            set((state) => {
                state.widgets.push(widget)
                state.selectedWidgetId = widget.id
            }),

        updateWidget: (id, updates) =>
            set((state) => {
                const idx = state.widgets.findIndex((w) => w.id === id)

                if (idx !== -1) {
                    Object.assign(state.widgets[idx], updates)
                }
            }),

        updateWidgetConfig: (id, config) =>
            set((state) => {
                const idx = state.widgets.findIndex((w) => w.id === id)

                if (idx !== -1) {
                    Object.assign(state.widgets[idx].config, config)
                }
            }),

        deleteWidget: (id) =>
            set((state) => {
                state.widgets = state.widgets.filter((w) => w.id !== id)

                if (state.selectedWidgetId === id) {
                    state.selectedWidgetId = null
                }
            }),

        moveWidget: (id, grid) =>
            set((state) => {
                const widget = state.widgets.find((w) => w.id === id)

                if (widget) {
                    widget.grid = { ...widget.grid, x: grid.x, y: grid.y }
                }
            }),

        resizeWidget: (id, grid) =>
            set((state) => {
                const widget = state.widgets.find((w) => w.id === id)

                if (widget) {
                    widget.grid = grid
                }
            }),

        saveToHistory: () =>
            set((state) => {
                const entry: HistoryEntry = {
                    widgets: JSON.parse(JSON.stringify(state.widgets)),
                }
                state.history = state.history.slice(0, state.historyIndex + 1)
                state.history.push(entry)
                state.historyIndex = state.history.length - 1
            }),

        undo: () =>
            set((state) => {
                if (state.historyIndex <= 0) return
                state.historyIndex -= 1
                const entry = state.history[state.historyIndex]
                state.widgets = JSON.parse(JSON.stringify(entry.widgets))
                state.selectedWidgetId = null
            }),

        redo: () =>
            set((state) => {
                if (state.historyIndex >= state.history.length - 1) return
                state.historyIndex += 1
                const entry = state.history[state.historyIndex]
                state.widgets = JSON.parse(JSON.stringify(entry.widgets))
                state.selectedWidgetId = null
            }),

        updateTheme: (theme) =>
            set((state) => {
                if (state.dashboard) {
                    Object.assign(state.dashboard.theme, theme)
                }
            }),

        updateTitle: (title) =>
            set((state) => {
                if (state.dashboard) {
                    state.dashboard.title = title
                }
            }),
    }))
)