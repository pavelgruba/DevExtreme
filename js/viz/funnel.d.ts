import '../jquery_augmentation';

import {
    dxElement
} from '../core/element';

import {
    PaletteType,
    PaletteExtensionModeType
} from './palette';

import {
    template
} from '../core/templates/template';

import DataSource, {
    DataSourceOptions
} from '../data/data_source';

import {
    event
} from '../events/index';

import {
    format
} from '../ui/widget/ui.widget';

import {
    BaseLegend,
    BaseLegendItem,
    DashStyleType,
    HatchingDirectionType
} from './common';

import BaseWidget, {
    BaseWidgetOptions,
    BaseWidgetTooltip,
    Font,
    WordWrapType,
    VizTextOverflowType
} from './core/base_widget';

export interface FunnelLegendItem extends BaseLegendItem {
    /**
     * @docid
     * @type dxFunnelItem
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    item?: dxFunnelItem;
}

export interface dxFunnelOptions extends BaseWidgetOptions<dxFunnel> {
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    adaptiveLayout?: { height?: number, keepLabels?: boolean, width?: number };
    /**
     * @docid
     * @type Enums.FunnelAlgorithm
     * @default 'dynamicSlope'
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    algorithm?: 'dynamicHeight' | 'dynamicSlope';
    /**
     * @docid
     * @type string
     * @default 'arg'
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    argumentField?: string;
    /**
     * @docid
     * @type string
     * @default 'color'
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    colorField?: string;
    /**
     * @docid
     * @extends CommonVizDataSource
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    dataSource?: Array<any> | DataSource | DataSourceOptions | string;
    /**
     * @docid
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    hoverEnabled?: boolean;
    /**
     * @docid
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    inverted?: boolean;
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    item?: { border?: { color?: string, visible?: boolean, width?: number }, hoverStyle?: { border?: { color?: string, visible?: boolean, width?: number }, hatching?: { direction?: HatchingDirectionType, opacity?: number, step?: number, width?: number } }, selectionStyle?: { border?: { color?: string, visible?: boolean, width?: number }, hatching?: { direction?: HatchingDirectionType, opacity?: number, step?: number, width?: number } } };
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    label?: { backgroundColor?: string, border?: { color?: string, dashStyle?: DashStyleType, visible?: boolean, width?: number }, connector?: { color?: string, opacity?: number, visible?: boolean, width?: number }, customizeText?: ((itemInfo: { item?: dxFunnelItem, value?: number, valueText?: string, percent?: number, percentText?: string }) => string), font?: Font, format?: format, horizontalAlignment?: 'left' | 'right', horizontalOffset?: number, position?: 'columns' | 'inside' | 'outside', showForZeroValues?: boolean, textOverflow?: VizTextOverflowType, visible?: boolean, wordWrap?: WordWrapType };
    /**
     * @docid
     * @inherits BaseLegend
     * @type object
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    legend?: dxFunnelLegend;
    /**
     * @docid
     * @type number
     * @default 0
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    neckHeight?: number;
    /**
     * @docid
     * @type number
     * @default 0
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    neckWidth?: number;
    /**
     * @docid
     * @extends Action
     * @type function
     * @type_function_param1 e:object
     * @type_function_param1_field4 item:dxFunnelItem
     * @notUsedInTheme
     * @action
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    onHoverChanged?: ((e: { component?: dxFunnel, element?: dxElement, model?: any, item?: dxFunnelItem }) => any);
    /**
     * @docid
     * @extends Action
     * @type function|string
     * @type_function_param1 e:object
     * @type_function_param1_field4 event:event
     * @type_function_param1_field5 item:dxFunnelItem
     * @notUsedInTheme
     * @action
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    onItemClick?: ((e: { component?: dxFunnel, element?: dxElement, model?: any, event?: event, item?: dxFunnelItem }) => any) | string;
    /**
     * @docid
     * @extends Action
     * @type function|string
     * @type_function_param1 e:object
     * @type_function_param1_field4 event:event
     * @type_function_param1_field5 item:dxFunnelItem
     * @notUsedInTheme
     * @action
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    onLegendClick?: ((e: { component?: dxFunnel, element?: dxElement, model?: any, event?: event, item?: dxFunnelItem }) => any) | string;
    /**
     * @docid
     * @extends Action
     * @type function
     * @type_function_param1 e:object
     * @type_function_param1_field4 item:dxFunnelItem
     * @notUsedInTheme
     * @action
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    onSelectionChanged?: ((e: { component?: dxFunnel, element?: dxElement, model?: any, item?: dxFunnelItem }) => any);
    /**
     * @docid
     * @extends CommonVizPalette
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    palette?: Array<string> | PaletteType;
    /**
     * @docid
     * @type Enums.VizPaletteExtensionMode
     * @default 'blend'
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    paletteExtensionMode?: PaletteExtensionModeType;
    /**
     * @docid
     * @type Enums.FunnelResolveLabelOverlapping
     * @default "shift"
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    resolveLabelOverlapping?: 'hide' | 'none' | 'shift';
    /**
     * @docid
     * @type Enums.SelectionMode
     * @default 'single'
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    selectionMode?: 'multiple' | 'none' | 'single';
    /**
     * @docid
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    sortData?: boolean;
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    tooltip?: dxFunnelTooltip;
    /**
     * @docid
     * @type string
     * @default 'val'
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    valueField?: string;
}
export interface dxFunnelLegend extends BaseLegend {
    /**
     * @docid dxFunnelOptions.legend.customizeHint
     * @type function(itemInfo)
     * @type_function_param1 itemInfo:object
     * @type_function_param1_field1 item:dxFunnelItem
     * @type_function_param1_field2 text:string
     * @type_function_return string
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    customizeHint?: ((itemInfo: { item?: dxFunnelItem, text?: string }) => string);
    /**
     * @docid dxFunnelOptions.legend.customizeItems
     * @type function(items)
     * @type_function_param1 items:Array<FunnelLegendItem>
     * @type_function_return Array<FunnelLegendItem>
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    customizeItems?: ((items: Array<FunnelLegendItem>) => Array<FunnelLegendItem>);
    /**
     * @docid dxFunnelOptions.legend.customizeText
     * @type function(itemInfo)
     * @type_function_param1 itemInfo:object
     * @type_function_param1_field1 item:dxFunnelItem
     * @type_function_param1_field2 text:string
     * @type_function_return string
     * @notUsedInTheme
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    customizeText?: ((itemInfo: { item?: dxFunnelItem, text?: string }) => string);
    /**
     * @docid dxFunnelOptions.legend.markerTemplate
     * @type template|function
     * @default undefined
     * @type_function_param1 legendItem:FunnelLegendItem
     * @type_function_param2 element:SVGGElement
     * @type_function_return string|SVGElement|jQuery
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    markerTemplate?: template | ((legendItem: FunnelLegendItem, element: SVGGElement) => string | SVGElement | JQuery);
    /**
     * @docid dxFunnelOptions.legend.visible
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    visible?: boolean;
}
export interface dxFunnelTooltip extends BaseWidgetTooltip {
    /**
     * @docid dxFunnelOptions.tooltip.contentTemplate
     * @type template|function(info, element)
     * @type_function_param1 info:object
     * @type_function_param1_field1 item:dxFunnelItem
     * @type_function_param1_field2 value:Number
     * @type_function_param1_field3 valueText:string
     * @type_function_param1_field4 percent:Number
     * @type_function_param1_field5 percentText:string
     * @type_function_param2 element:dxElement
     * @type_function_return string|Element|jQuery
     * @default undefined
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    contentTemplate?: template | ((info: { item?: dxFunnelItem, value?: number, valueText?: string, percent?: number, percentText?: string }, element: dxElement) => string | Element | JQuery);
    /**
     * @docid dxFunnelOptions.tooltip.customizeTooltip
     * @default undefined
     * @type function(info)
     * @type_function_param1 info:object
     * @type_function_param1_field1 item:dxFunnelItem
     * @type_function_param1_field2 value:Number
     * @type_function_param1_field3 valueText:string
     * @type_function_param1_field4 percent:Number
     * @type_function_param1_field5 percentText:string
     * @type_function_return object
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    customizeTooltip?: ((info: { item?: dxFunnelItem, value?: number, valueText?: string, percent?: number, percentText?: string }) => any);
}
/**
 * @docid
 * @inherits BaseWidget, DataHelperMixin
 * @module viz/funnel
 * @export default
 * @prevFileNamespace DevExpress.viz
 * @public
 */
export default class dxFunnel extends BaseWidget {
    constructor(element: Element, options?: dxFunnelOptions)
    constructor(element: JQuery, options?: dxFunnelOptions)
    /**
     * @docid
     * @publicName clearSelection()
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    clearSelection(): void;
    /**
     * @docid
     * @publicName getAllItems()
     * @return Array<dxFunnelItem>
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    getAllItems(): Array<dxFunnelItem>;
    getDataSource(): DataSource;
    /**
     * @docid
     * @publicName hideTooltip()
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    hideTooltip(): void;
}

export interface dxFunnelItem {
    /**
     * @docid
     * @type string|Date|number
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    argument?: string | Date | number;
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    data?: any;
    /**
     * @docid
     * @publicName getColor()
     * @return string
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    getColor(): string;
    /**
     * @docid
     * @publicName hover(state)
     * @param1 state:boolean
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    hover(state: boolean): void;
    /**
     * @docid
     * @publicName isHovered()
     * @return boolean
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    isHovered(): boolean;
    /**
     * @docid
     * @publicName isSelected()
     * @return boolean
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    isSelected(): boolean;
    /**
     * @docid
     * @type number
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    percent?: number;
    /**
     * @docid
     * @publicName select(state)
     * @param1 state:boolean
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    select(state: boolean): void;
    /**
     * @docid
     * @publicName showTooltip()
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    showTooltip(): void;
    /**
     * @docid
     * @type number
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    value?: number;
}

declare global {
interface JQuery {
    dxFunnel(): JQuery;
    dxFunnel(options: "instance"): dxFunnel;
    dxFunnel(options: string): any;
    dxFunnel(options: string, ...params: any[]): any;
    dxFunnel(options: dxFunnelOptions): JQuery;
}
}
export type Options = dxFunnelOptions;

/** @deprecated use Options instead */
export type IOptions = dxFunnelOptions;
