import '../jquery_augmentation';

import {
    dxElement
} from '../core/element';

import {
    PaletteType
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
    BaseLegend,
    BaseLegendItem
} from './common';

import BaseWidget, {
    BaseWidgetOptions,
    BaseWidgetTooltip,
    Font,
    BaseWidgetAnnotationConfig
} from './core/base_widget';

import {
    VectorMapProjectionConfig
} from './vector_map/projection';

export interface MapLayer {
    /**
     * @docid
     * @publicName clearSelection()
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    clearSelection(): void;
    /**
     * @docid
     * @type string
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    elementType?: string;
    /**
     * @docid
     * @publicName getDataSource()
     * @return DataSource
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    getDataSource(): DataSource;
    /**
     * @docid
     * @publicName getElements()
     * @return Array<MapLayerElement>
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    getElements(): Array<MapLayerElement>;
    /**
     * @docid
     * @type number
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    index?: number;
    /**
     * @docid
     * @type string
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    name?: string;
    /**
     * @docid
     * @type string
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    type?: string;
}

export interface MapLayerElement {
    /**
     * @docid
     * @publicName applySettings(settings)
     * @param1 settings:object
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    applySettings(settings: any): void;
    /**
     * @docid
     * @publicName attribute(name)
     * @return any
     * @param1 name:string
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    attribute(name: string): any;
    /**
     * @docid
     * @publicName attribute(name, value)
     * @param1 name:string
     * @param2 value:any
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    attribute(name: string, value: any): void;
    /**
     * @docid
     * @publicName coordinates()
     * @return object
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    coordinates(): any;
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    layer?: any;
    /**
     * @docid
     * @publicName selected()
     * @return boolean
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    selected(): boolean;
    /**
     * @docid
     * @publicName selected(state)
     * @param1 state:boolean
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    selected(state: boolean): void;
}

export interface VectorMapLegendItem extends BaseLegendItem {
    /**
     * @docid
     * @type string
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    color?: string;
    /**
     * @docid
     * @type number
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    end?: number;
    /**
     * @docid
     * @type number
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    size?: number;
    /**
     * @docid
     * @type number
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    start?: number;
}

export interface dxVectorMapOptions extends BaseWidgetOptions<dxVectorMap> {
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    background?: { borderColor?: string, color?: string };
    /**
     * @docid
     * @type Array<number>
     * @default undefined
     * @notUsedInTheme
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    bounds?: Array<number>;
    /**
     * @docid
     * @type Array<number>
     * @default [0, 0]
     * @notUsedInTheme
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    center?: Array<number>;
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    controlBar?: { borderColor?: string, color?: string, enabled?: boolean, horizontalAlignment?: 'center' | 'left' | 'right', margin?: number, opacity?: number, verticalAlignment?: 'bottom' | 'top' };
    /**
     * @docid
     * @type Array<Object>|Object
     * @default undefined
     * @notUsedInTheme
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    layers?: Array<{ borderColor?: string, borderWidth?: number, color?: string, colorGroupingField?: string, colorGroups?: Array<number>, customize?: ((elements: Array<MapLayerElement>) => any), dataField?: string, dataSource?: any | DataSource | DataSourceOptions | string, elementType?: 'bubble' | 'dot' | 'image' | 'pie', hoverEnabled?: boolean, hoveredBorderColor?: string, hoveredBorderWidth?: number, hoveredColor?: string, label?: { dataField?: string, enabled?: boolean, font?: Font }, maxSize?: number, minSize?: number, name?: string, opacity?: number, palette?: Array<string> | PaletteType, paletteSize?: number, selectedBorderColor?: string, selectedBorderWidth?: number, selectedColor?: string, selectionMode?: 'multiple' | 'none' | 'single', size?: number, sizeGroupingField?: string, sizeGroups?: Array<number>, type?: 'area' | 'line' | 'marker' }> | { borderColor?: string, borderWidth?: number, color?: string, colorGroupingField?: string, colorGroups?: Array<number>, customize?: ((elements: Array<MapLayerElement>) => any), dataField?: string, dataSource?: any | DataSource | DataSourceOptions | string, elementType?: 'bubble' | 'dot' | 'image' | 'pie', hoverEnabled?: boolean, hoveredBorderColor?: string, hoveredBorderWidth?: number, hoveredColor?: string, label?: { dataField?: string, enabled?: boolean, font?: Font }, maxSize?: number, minSize?: number, name?: string, opacity?: number, palette?: Array<string> | PaletteType, paletteSize?: number, selectedBorderColor?: string, selectedBorderWidth?: number, selectedColor?: string, selectionMode?: 'multiple' | 'none' | 'single', size?: number, sizeGroupingField?: string, sizeGroups?: Array<number>, type?: 'area' | 'line' | 'marker' };
    /**
     * @docid
     * @type Array<Object>
     * @inherits BaseLegend
     * @default undefined
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    legends?: Array<dxVectorMapLegends>;
    /**
     * @docid
     * @type number
     * @default 256
     * @notUsedInTheme
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    maxZoomFactor?: number;
    /**
     * @docid
     * @extends Action
     * @type function
     * @type_function_param1 e:object
     * @type_function_param1_field4 center:Array<number>
     * @notUsedInTheme
     * @action
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    onCenterChanged?: ((e: { component?: dxVectorMap, element?: dxElement, model?: any, center?: Array<number> }) => any);
    /**
     * @docid
     * @extends Action
     * @type function|string
     * @type_function_param1 e:object
     * @type_function_param1_field4 event:event
     * @type_function_param1_field5 target:MapLayerElement
     * @notUsedInTheme
     * @action
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    onClick?: ((e: { component?: dxVectorMap, element?: dxElement, model?: any, event?: event, target?: MapLayerElement }) => any) | string;
    /**
     * @docid
     * @extends Action
     * @type function
     * @type_function_param1 e:object
     * @type_function_param1_field4 target:MapLayerElement
     * @notUsedInTheme
     * @action
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    onSelectionChanged?: ((e: { component?: dxVectorMap, element?: dxElement, model?: any, target?: MapLayerElement }) => any);
    /**
     * @docid
     * @extends Action
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 target:MapLayerElement | dxVectorMapAnnotationConfig
     * @notUsedInTheme
     * @action
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    onTooltipHidden?: ((e: { component?: dxVectorMap, element?: dxElement, model?: any, target?: MapLayerElement | dxVectorMapAnnotationConfig | any }) => any);
    /**
     * @docid
     * @extends Action
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 target:MapLayerElement | dxVectorMapAnnotationConfig
     * @notUsedInTheme
     * @action
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    onTooltipShown?: ((e: { component?: dxVectorMap, element?: dxElement, model?: any, target?: MapLayerElement | dxVectorMapAnnotationConfig | any }) => any);
    /**
     * @docid
     * @extends Action
     * @type function
     * @type_function_param1 e:object
     * @type_function_param1_field4 zoomFactor:number
     * @notUsedInTheme
     * @action
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    onZoomFactorChanged?: ((e: { component?: dxVectorMap, element?: dxElement, model?: any, zoomFactor?: number }) => any);
    /**
     * @docid
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    panningEnabled?: boolean;
    /**
     * @docid
     * @type Enums.VectorMapProjection|VectorMapProjectionConfig|string|object
     * @default "mercator"
     * @notUsedInTheme
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    projection?: 'equirectangular' | 'lambert' | 'mercator' | 'miller' | VectorMapProjectionConfig | string | any;
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    tooltip?: dxVectorMapTooltip;
    /**
     * @docid
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    touchEnabled?: boolean;
    /**
     * @docid
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    wheelEnabled?: boolean;
    /**
     * @docid
     * @type number
     * @default 1
     * @notUsedInTheme
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    zoomFactor?: number;
    /**
     * @docid
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    zoomingEnabled?: boolean;
    /**
     * @docid
     * @type dxVectorMapCommonAnnotationConfig
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    commonAnnotationSettings?: dxVectorMapCommonAnnotationConfig;
    /**
     * @docid
     * @type Array<dxVectorMapAnnotationConfig,object>
     * @inherits dxVectorMapOptions.commonAnnotationSettings
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    annotations?: Array<dxVectorMapAnnotationConfig | any>;
    /**
     * @docid
     * @type function(annotation)
     * @type_function_param1 annotation:dxVectorMapAnnotationConfig|any
     * @type_function_return dxVectorMapAnnotationConfig
     * @default undefined
     * @notUsedInTheme
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    customizeAnnotation?: ((annotation: dxVectorMapAnnotationConfig | any) => dxVectorMapAnnotationConfig);
}

export interface dxVectorMapAnnotationConfig extends dxVectorMapCommonAnnotationConfig {
    /**
     * @docid
     * @type string
     * @default undefined
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    name?: string;
}

export interface dxVectorMapCommonAnnotationConfig extends BaseWidgetAnnotationConfig {
    /**
     * @docid
     * @type Array<number>
     * @default undefined
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    coordinates?: Array<number>;
    /**
     * @docid
     * @type function(annotation)
     * @type_function_param1 annotation:dxVectorMapAnnotationConfig|any
     * @type_function_return object
     * @default undefined
     * @notUsedInTheme
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    customizeTooltip?: ((annotation: dxVectorMapAnnotationConfig | any) => any);
    /**
     * @docid
     * @type template|function
     * @default undefined
     * @type_function_param1 annotation:dxVectorMapAnnotationConfig|any
     * @type_function_param2 element:SVGGElement
     * @type_function_return string|SVGElement|jQuery
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    template?: template | ((annotation: dxVectorMapAnnotationConfig | any, element: SVGGElement) => string | SVGElement | JQuery);
    /**
     * @docid
     * @type template|function(annotation, element)
     * @type_function_param1 annotation:dxVectorMapAnnotationConfig|any
     * @type_function_param2 element:dxElement
     * @type_function_return string|Element|jQuery
     * @default undefined
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    tooltipTemplate?: template | ((annotation: dxVectorMapAnnotationConfig | any, element: dxElement) => string | Element | JQuery);
}

export interface dxVectorMapLegends extends BaseLegend {
    /**
     * @docid dxVectorMapOptions.legends.customizeHint
     * @type function(itemInfo)
     * @type_function_param1 itemInfo:object
     * @type_function_param1_field1 start:number
     * @type_function_param1_field2 end:number
     * @type_function_param1_field3 index:number
     * @type_function_param1_field4 color:string
     * @type_function_param1_field5 size:number
     * @type_function_return string
     * @notUsedInTheme
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    customizeHint?: ((itemInfo: { start?: number, end?: number, index?: number, color?: string, size?: number }) => string);
    /**
     * @docid dxVectorMapOptions.legends.customizeItems
     * @type function(items)
     * @type_function_param1 items:Array<VectorMapLegendItem>
     * @type_function_return Array<VectorMapLegendItem>
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    customizeItems?: ((items: Array<VectorMapLegendItem>) => Array<VectorMapLegendItem>);
    /**
     * @docid dxVectorMapOptions.legends.customizeText
     * @type function(itemInfo)
     * @type_function_param1 itemInfo:object
     * @type_function_param1_field1 start:number
     * @type_function_param1_field2 end:number
     * @type_function_param1_field3 index:number
     * @type_function_param1_field4 color:string
     * @type_function_param1_field5 size:number
     * @type_function_return string
     * @notUsedInTheme
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    customizeText?: ((itemInfo: { start?: number, end?: number, index?: number, color?: string, size?: number }) => string);
    /**
     * @docid dxVectorMapOptions.legends.font
     * @type Font
     * @default '#2b2b2b' [prop](color)
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    font?: Font;
    /**
     * @docid dxVectorMapOptions.legends.markerColor
     * @type string
     * @default undefined
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    markerColor?: string;
    /**
     * @docid dxVectorMapOptions.legends.markerShape
     * @type Enums.VectorMapMarkerShape
     * @default "square"
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    markerShape?: 'circle' | 'square';
    /**
     * @docid dxVectorMapOptions.legends.markerSize
     * @type number
     * @default 12
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    markerSize?: number;
    /**
     * @docid dxVectorMapOptions.legends.markerTemplate
     * @type template|function
     * @default undefined
     * @type_function_param1 legendItem:VectorMapLegendItem
     * @type_function_param2 element:SVGGElement
     * @type_function_return string|SVGElement|jQuery
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    markerTemplate?: template | ((legendItem: VectorMapLegendItem, element: SVGGElement) => string | SVGElement | JQuery);
    /**
     * @docid dxVectorMapOptions.legends.source
     * @type object
     * @notUsedInTheme
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    source?: { grouping?: string, layer?: string };
}
export interface dxVectorMapTooltip extends BaseWidgetTooltip {
    /**
     * @docid dxVectorMapOptions.tooltip.contentTemplate
     * @type template | function(info, element)
     * @type_function_param1 info:MapLayerElement
     * @type_function_param2 element:dxElement
     * @type_function_return string|Element|jQuery
     * @default undefined
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    contentTemplate?: template | ((info: MapLayerElement, element: dxElement) => string | Element | JQuery);
    /**
     * @docid dxVectorMapOptions.tooltip.customizeTooltip
     * @type function(info)
     * @type_function_param1 info:MapLayerElement
     * @type_function_return object
     * @default undefined
     * @notUsedInTheme
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    customizeTooltip?: ((info: MapLayerElement) => any);
}
/**
 * @docid
 * @inherits BaseWidget
 * @module viz/vector_map
 * @export default
 * @prevFileNamespace DevExpress.viz
 * @public
 */
export default class dxVectorMap extends BaseWidget {
    constructor(element: Element, options?: dxVectorMapOptions)
    constructor(element: JQuery, options?: dxVectorMapOptions)
    /**
     * @docid
     * @publicName center()
     * @return Array<number>
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    center(): Array<number>;
    /**
     * @docid
     * @publicName center(centerCoordinates)
     * @param1 centerCoordinates:Array<number>
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    center(centerCoordinates: Array<number>): void;
    /**
     * @docid
     * @publicName clearSelection()
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    clearSelection(): void;
    /**
     * @docid
     * @publicName convertCoordinates(x, y)
     * @param1 x:number
     * @param2 y:number
     * @return Array<number>
     * @deprecated dxVectorMap.convertToGeo
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    convertCoordinates(x: number, y: number): Array<number>;
    /**
     * @docid
     * @publicName convertToGeo(x, y)
     * @param1 x:number
     * @param2 y:number
     * @return Array<number>
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    convertToGeo(x: number, y: number): Array<number>;
    /**
     * @docid
     * @publicName convertToXY(longitude, latitude)
     * @param1 longitude:number
     * @param2 latitude:number
     * @return Array<number>
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    convertToXY(longitude: number, latitude: number): Array<number>;
    /**
     * @docid
     * @publicName getLayerByIndex(index)
     * @return MapLayer
     * @param1 index:number
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    getLayerByIndex(index: number): MapLayer;
    /**
     * @docid
     * @publicName getLayerByName(name)
     * @return MapLayer
     * @param1 name:string
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    getLayerByName(name: string): MapLayer;
    /**
     * @docid
     * @publicName getLayers()
     * @return Array<MapLayer>
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    getLayers(): Array<MapLayer>;
    /**
     * @docid
     * @publicName viewport()
     * @return Array<number>
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    viewport(): Array<number>;
    /**
     * @docid
     * @publicName viewport(viewportCoordinates)
     * @param1 viewportCoordinates:Array<number>
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    viewport(viewportCoordinates: Array<number>): void;
    /**
     * @docid
     * @publicName zoomFactor()
     * @return number
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    zoomFactor(): number;
    /**
     * @docid
     * @publicName zoomFactor(zoomFactor)
     * @param1 zoomFactor:number
     * @prevFileNamespace DevExpress.viz
     * @public
     */
    zoomFactor(zoomFactor: number): void;
}

declare global {
interface JQuery {
    dxVectorMap(): JQuery;
    dxVectorMap(options: "instance"): dxVectorMap;
    dxVectorMap(options: string): any;
    dxVectorMap(options: string, ...params: any[]): any;
    dxVectorMap(options: dxVectorMapOptions): JQuery;
}
}
export type Options = dxVectorMapOptions;

/** @deprecated use Options instead */
export type IOptions = dxVectorMapOptions;
