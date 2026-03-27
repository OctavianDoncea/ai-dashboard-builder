export type WidgetType = 'chart' | 'stat' | 'table' | 'text'

export type ChartType = 
    | 'bar'
    | 'line'
    | 'pie'
    | 'donut'
    | 'area'
    | 'scatter'
    | 'horizontal-bar'

export interface GridPosition {
    x: number
    y: number
    w: number
    h: number
}

export interface BaseWidget {
    id: string
    type: WidgetType
    title: string
    grid: GridPosition
    datasetId?: string
}

export interface ChartConfig {
    chartType: ChartType
    xAxis?: string
    yAxis?: string
    groupBy?: string
    colors: string[]
    showLegend: boolean
    showGrid: boolean
    data: ChartDataPoint[]
}

export interface ChartDataPoint {
    label: string
    value: number
    group?: string
}

export interface StatConfig {
    value: string | number
    label: string
    change? : number
    changeLabel?: string
    icon?: string
    color: string
}

export interface TableConfig {
    columns: string[]
    rows: Record<string, any>[]
    pageSize: number
    sortBy?: string
    sortDir?: 'asc' | 'desc'
}

export interface TextConfig {
    content: string
    fontSize: number
    color: string
    align: 'left' | 'center' | 'right'
    fontWeight: 'normal' | 'bold'
}

export interface ChartWidget extends BaseWidget {
    type: 'chart'
    config: ChartConfig
}

export interface StatWidget extends BaseWidget {
    type: 'stat'
    config: StatConfig
}

export interface TableWidget extends BaseWidget {
    type: 'stat'
    config: TableConfig
}

export interface TextWidget extends BaseWidget {
    type: 'text'
    config: TextConfig
}

export type DashboardWidget = 
    | ChartWidget
    | StatWidget
    | TableWidget
    | TextWidget