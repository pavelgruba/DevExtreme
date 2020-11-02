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

import BaseWidget, {
    BaseWidgetOptions,
    BaseWidgetTooltip,
    Font
} from './core/base_widget';

import { HatchingDirectionType } from './common';

export interface dxSankeyOptions extends BaseWidgetOptions<dxSankey> {
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    adaptiveLayout?: { height?: number, keepLabels?: boolean, width?: number };
    /**
     * @docid
     * @type Enums.VerticalAlignment|Array<Enums.VerticalAlignment>
     * @default 'center'
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    alignment?: 'bottom' | 'center' | 'top' | Array<'bottom' | 'center' | 'top'>;
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
     * @type object
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    label?: { border?: { color?: string, visible?: boolean, width?: number }, customizeText?: ((itemInfo: dxSankeyNode) => string), font?: Font, horizontalOffset?: number, overlappingBehavior?: 'ellipsis' | 'hide' | 'none', shadow?: { blur?: number, color?: string, offsetX?: number, offsetY?: number, opacity?: number }, useNodeColors?: boolean, verticalOffset?: number, visible?: boolean };
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    link?: { border?: { color?: string, visible?: boolean, width?: number }, color?: string, colorMode?: 'none' | 'source' | 'target' | 'gradient', hoverStyle?: { border?: { color?: string, visible?: boolean, width?: number }, color?: string, hatching?: { direction?: HatchingDirectionType, opacity?: number, step?: number, width?: number }, opacity?: number }, opacity?: number };
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    node?: { border?: { color?: string, visible?: boolean, width?: number }, color?: string, hoverStyle?: { border?: { color?: string, visible?: boolean, width?: number }, color?: string, hatching?: { direction?: HatchingDirectionType, opacity?: number, step?: number, width?: number }, opacity?: number }, opacity?: number, padding?: number, width?: number };
    /**
     * @docid
     * @extends Action
     * @type function|string
     * @type_function_param1 e:object
     * @type_function_param1_field4 event:event
     * @type_function_param1_field5 target:dxSankeyLink
     * @notUsedInTheme
     * @action
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    onLinkClick?: ((e: { component?: dxSankey, element?: dxElement, model?: any, event?: event, target?: dxSankeyLink }) => any) | string;
    /**
     * @docid
     * @extends Action
     * @type function
     * @type_function_param1 e:object
     * @type_function_param1_field4 target:dxSankeyLink
     * @notUsedInTheme
     * @action
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    onLinkHoverChanged?: ((e: { component?: dxSankey, element?: dxElement, model?: any, target?: dxSankeyLink }) => any);
    /**
     * @docid
     * @extends Action
     * @type function|string
     * @type_function_param1 e:object
     * @type_function_param1_field4 event:event
     * @type_function_param1_field5 target:dxSankeyNode
     * @notUsedInTheme
     * @action
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    onNodeClick?: ((e: { component?: dxSankey, element?: dxElement, model?: any, event?: event, target?: dxSankeyNode }) => any) | string;
    /**
     * @docid
     * @extends Action
     * @type function
     * @type_function_param1 e:object
     * @type_function_param1_field4 target:dxSankeyNode
     * @notUsedInTheme
     * @action
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    onNodeHoverChanged?: ((e: { component?: dxSankey, element?: dxElement, model?: any, target?: dxSankeyNode }) => any);
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
     * @type object
     * @default undefined
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    sortData?: any;
    /**
     * @docid
     * @type string
     * @default 'source'
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    sourceField?: string;
    /**
     * @docid
     * @type string
     * @default 'target'
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    targetField?: string;
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    tooltip?: dxSankeyTooltip;
    /**
     * @docid
     * @type string
     * @default 'weight'
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    weightField?: string;
}
export interface dxSankeyTooltip extends BaseWidgetTooltip {
    /**
     * @docid dxSankeyOptions.tooltip.customizeLinkTooltip
     * @default undefined
     * @type function(info)
     * @type_function_param1 info:object
     * @type_function_param1_field1 source:string
     * @type_function_param1_field2 target:string
     * @type_function_param1_field3 weight:Number
     * @type_function_return object
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    customizeLinkTooltip?: ((info: { source?: string, target?: string, weight?: number }) => any);
    /**
     * @docid dxSankeyOptions.tooltip.customizeNodeTooltip
     * @default undefined
     * @type function(info)
     * @type_function_param1 info:object
     * @type_function_param1_field1 title:string:deprecated(label)
     * @type_function_param1_field2 label:string
     * @type_function_param1_field3 weightIn:Number
     * @type_function_param1_field4 weightOut:Number
     * @type_function_return object
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    customizeNodeTooltip?: ((info: { title?: string, label?: string, weightIn?: number, weightOut?: number }) => any);
    /**
     * @docid dxSankeyOptions.tooltip.enabled
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    enabled?: boolean;
    /**
     * @docid dxSankeyOptions.tooltip.linkTooltipTemplate
     * @type template|function(info, element)
     * @type_function_param1 info:object
     * @type_function_param1_field1 source:string
     * @type_function_param1_field2 target:string
     * @type_function_param1_field3 weight:Number
     * @type_function_param2 element:dxElement
     * @type_function_return string|Element|jQuery
     * @default undefined
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    linkTooltipTemplate?: template | ((info: { source?: string, target?: string, weight?: number }, element: dxElement) => string | Element | JQuery);
    /**
     * @docid dxSankeyOptions.tooltip.nodeTooltipTemplate
     * @type template|function(info, element)
     * @type_function_param1 info:object
     * @type_function_param1_field1 label:string
     * @type_function_param1_field2 weightIn:Number
     * @type_function_param1_field3 weightOut:Number
     * @type_function_param2 element:dxElement
     * @type_function_return string|Element|jQuery
     * @default undefined
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    nodeTooltipTemplate?: template | ((info: { label?: string, weightIn?: number, weightOut?: number }, element: dxElement) => string | Element | JQuery);
}
/**
 * @docid
 * @inherits BaseWidget, DataHelperMixin
 * @module viz/sankey
 * @export default
 * @prevFileNamespace DevExpress.viz
 * @public
 */
export default class dxSankey extends BaseWidget {
    constructor(element: Element, options?: dxSankeyOptions)
    constructor(element: JQuery, options?: dxSankeyOptions)
    /**
     * @docid
     * @publicName getAllLinks()
     * @return Array<dxSankeyLink>
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    getAllLinks(): Array<dxSankeyLink>;
    /**
     * @docid
     * @publicName getAllNodes()
     * @return Array<dxSankeyNode>
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    getAllNodes(): Array<dxSankeyNode>;
    getDataSource(): DataSource;
    /**
     * @docid
     * @publicName hideTooltip()
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    hideTooltip(): void;
}

export interface dxSankeyConnectionInfoObject {
    /**
     * @docid
     * @type string
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    source?: string;
    /**
     * @docid
     * @type string
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    target?: string;
    /**
     * @docid
     * @type Number
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    weight?: number;
}

export interface dxSankeyLink {
    /**
     * @docid
     * @type dxSankeyConnectionInfoObject
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    connection?: dxSankeyConnectionInfoObject;
    /**
     * @docid
     * @publicName hideTooltip()
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    hideTooltip(): void;
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
     * @publicName showTooltip()
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    showTooltip(): void;
}

export interface dxSankeyNode {
    /**
     * @docid
     * @publicName hideTooltip()
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    hideTooltip(): void;
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
     * @type string
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    label?: string;
    /**
     * @docid
     * @type Array<Object>
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    linksIn?: Array<any>;
    /**
     * @docid
     * @type Array<Object>
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    linksOut?: Array<any>;
    /**
     * @docid
     * @publicName showTooltip()
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    showTooltip(): void;
    /**
     * @docid
     * @type string
     * @deprecated
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    title?: string;
}

declare global {
interface JQuery {
    dxSankey(): JQuery;
    dxSankey(options: "instance"): dxSankey;
    dxSankey(options: string): any;
    dxSankey(options: string, ...params: any[]): any;
    dxSankey(options: dxSankeyOptions): JQuery;
}
}
export type Options = dxSankeyOptions;

/** @deprecated use Options instead */
export type IOptions = dxSankeyOptions;
