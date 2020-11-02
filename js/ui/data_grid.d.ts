import '../jquery_augmentation';

import {
    dxElement
} from '../core/element';

import {
    template
} from '../core/templates/template';

import Store from '../data/abstract_store';

import DataSource, {
    DataSourceOptions
} from '../data/data_source';

import {
    event
} from '../events/index';

import {
    ExcelDataGridCell
} from '../excel_exporter';

import {
    ExcelFont
} from '../exporter/excel/excel.doc_comments';

import dxDraggable from './draggable';

import {
    dxFilterBuilderOptions
} from './filter_builder';

import {
    dxFormOptions,
    dxFormSimpleItem
} from './form';

import {
    dxPopupOptions
} from './popup';

import dxScrollable from './scroll_view/ui.scrollable';

import dxSortable from './sortable';

import {
    dxToolbarOptions
} from './toolbar';

import {
    AsyncRule,
    CompareRule,
    CustomRule,
    EmailRule,
    NumericRule,
    PatternRule,
    RangeRule,
    RequiredRule,
    StringLengthRule
} from './validation_engine';

import Widget, {
    format,
    WidgetOptions
} from './widget/ui.widget';

export interface GridBaseOptions<T = GridBase> extends WidgetOptions<T> {
    /**
     * @docid
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    allowColumnReordering?: boolean;
    /**
     * @docid
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    allowColumnResizing?: boolean;
    /**
     * @docid
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    autoNavigateToFocusedRow?: boolean;
    /**
     * @docid
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    cacheEnabled?: boolean;
    /**
     * @docid
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    cellHintEnabled?: boolean;
    /**
     * @docid
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    columnAutoWidth?: boolean;
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    columnChooser?: { allowSearch?: boolean, emptyPanelText?: string, enabled?: boolean, height?: number, mode?: 'dragAndDrop' | 'select', searchTimeout?: number, title?: string, width?: number };
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    columnFixing?: { enabled?: boolean, texts?: { fix?: string, leftPosition?: string, rightPosition?: string, unfix?: string } };
    /**
     * @docid
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    columnHidingEnabled?: boolean;
    /**
     * @docid
     * @type number
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    columnMinWidth?: number;
    /**
     * @docid
     * @type Enums.ColumnResizingMode
     * @default "nextColumn"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    columnResizingMode?: 'nextColumn' | 'widget';
    /**
     * @docid
     * @type number
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    columnWidth?: number;
    /**
     * @docid
     * @type Array<GridBaseColumn, string>
     * @fires GridBaseOptions.onOptionChanged
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    columns?: Array<GridBaseColumn | string>;
    /**
     * @docid
     * @type string|Array<Object>|DataSource|DataSourceOptions
     * @default null
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    dataSource?: string | Array<any> | DataSource | DataSourceOptions;
    /**
     * @docid
     * @type string
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    dateSerializationFormat?: string;
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    editing?: GridBaseEditing;
    /**
     * @docid
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    errorRowEnabled?: boolean;
    /**
     * @docid
     * @type dxFilterBuilderOptions
     * @default {}
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    filterBuilder?: dxFilterBuilderOptions;
    /**
     * @docid
     * @type dxPopupOptions
     * @default {}
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    filterBuilderPopup?: dxPopupOptions;
    /**
     * @docid
     * @type object
     * @default {}
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    filterPanel?: { customizeText?: ((e: { component?: T, filterValue?: any, text?: string }) => string), filterEnabled?: boolean, texts?: { clearFilter?: string, createFilter?: string, filterEnabledHint?: string }, visible?: boolean };
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    filterRow?: { applyFilter?: 'auto' | 'onClick', applyFilterText?: string, betweenEndText?: string, betweenStartText?: string, operationDescriptions?: { between?: string, contains?: string, endsWith?: string, equal?: string, greaterThan?: string, greaterThanOrEqual?: string, lessThan?: string, lessThanOrEqual?: string, notContains?: string, notEqual?: string, startsWith?: string }, resetOperationText?: string, showAllText?: string, showOperationChooser?: boolean, visible?: boolean };
    /**
     * @docid
     * @type boolean|Enums.Mode
     * @default "auto"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    filterSyncEnabled?: boolean | 'auto';
    /**
     * @docid
     * @type Filter expression
     * @default null
     * @fires GridBase.onOptionChanged
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    filterValue?: string | Array<any> | Function;
    /**
     * @docid
     * @type number
     * @default -1
     * @fires GridBaseOptions.onFocusedCellChanged
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    focusedColumnIndex?: number;
    /**
     * @docid
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    focusedRowEnabled?: boolean;
    /**
     * @docid
     * @type number
     * @default -1
     * @fires GridBaseOptions.onFocusedRowChanged
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    focusedRowIndex?: number;
    /**
     * @docid
     * @type any
     * @default undefined
     * @fires GridBaseOptions.onFocusedRowChanged
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    focusedRowKey?: any;
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    headerFilter?: { allowSearch?: boolean, height?: number, searchTimeout?: number, texts?: { cancel?: string, emptyValue?: string, ok?: string }, visible?: boolean, width?: number };
    /**
     * @docid
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    highlightChanges?: boolean;
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    keyboardNavigation?: { editOnKeyPress?: boolean, enabled?: boolean, enterKeyAction?: 'startEdit' | 'moveFocus', enterKeyDirection?: 'none' | 'column' | 'row' };
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    loadPanel?: { enabled?: boolean | 'auto', height?: number, indicatorSrc?: string, shading?: boolean, shadingColor?: string, showIndicator?: boolean, showPane?: boolean, text?: string, width?: number };
    /**
     * @docid
     * @type string
     * @default "No data"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    noDataText?: string;
    /**
     * @docid
     * @extends Action
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 formOptions:object
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onAdaptiveDetailRowPreparing?: ((e: { component?: T, element?: dxElement, model?: any, formOptions?: any }) => any);
    /**
     * @docid
     * @extends Action
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 error:Error
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onDataErrorOccurred?: ((e: { component?: T, element?: dxElement, model?: any, error?: Error }) => any);
    /**
     * @docid
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 changes:Array<any>
     * @extends Action
     * @action
     * @public
     */
    onEditCanceled?: ((e: { component?: T, element?: dxElement, model?: any, changes?: Array<any> }) => any);
    /**
     * @docid
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 changes:Array<any>
     * @type_function_param1_field5 cancel:boolean
     * @extends Action
     * @action
     * @public
     */
    onEditCanceling?: ((e: { component?: T, element?: dxElement, model?: any, changes?: Array<any>, cancel?: boolean }) => any);
    /**
     * @docid
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 data:object
     * @type_function_param1_field5 promise:Promise<void>
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onInitNewRow?: ((e: { component?: T, element?: dxElement, model?: any, data?: any, promise?: Promise<void> | JQueryPromise<void> }) => any);
    /**
     * @docid
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 event:event
     * @type_function_param1_field5 handled:boolean
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onKeyDown?: ((e: { component?: T, element?: dxElement, model?: any, event?: event, handled?: boolean }) => any);
    /**
     * @docid
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 key:any
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onRowCollapsed?: ((e: { component?: T, element?: dxElement, model?: any, key?: any }) => any);
    /**
     * @docid
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 key:any
     * @type_function_param1_field5 cancel:boolean
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onRowCollapsing?: ((e: { component?: T, element?: dxElement, model?: any, key?: any, cancel?: boolean }) => any);
    /**
     * @docid
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 key:any
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onRowExpanded?: ((e: { component?: T, element?: dxElement, model?: any, key?: any }) => any);
    /**
     * @docid
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 key:any
     * @type_function_param1_field5 cancel:boolean
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onRowExpanding?: ((e: { component?: T, element?: dxElement, model?: any, key?: any, cancel?: boolean }) => any);
    /**
     * @docid
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 data:object
     * @type_function_param1_field5 key:any
     * @type_function_param1_field6 error:Error
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onRowInserted?: ((e: { component?: T, element?: dxElement, model?: any, data?: any, key?: any, error?: Error }) => any);
    /**
     * @docid
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 data:object
     * @type_function_param1_field5 cancel:boolean|Promise<void>
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onRowInserting?: ((e: { component?: T, element?: dxElement, model?: any, data?: any, cancel?: boolean | Promise<void> | JQueryPromise<void> }) => any);
    /**
     * @docid
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 data:object
     * @type_function_param1_field5 key:any
     * @type_function_param1_field6 error:Error
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onRowRemoved?: ((e: { component?: T, element?: dxElement, model?: any, data?: any, key?: any, error?: Error }) => any);
    /**
     * @docid
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 data:object
     * @type_function_param1_field5 key:any
     * @type_function_param1_field6 cancel:boolean|Promise<void>
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onRowRemoving?: ((e: { component?: T, element?: dxElement, model?: any, data?: any, key?: any, cancel?: boolean | Promise<void> | JQueryPromise<void> }) => any);
    /**
     * @docid
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 data:object
     * @type_function_param1_field5 key:any
     * @type_function_param1_field6 error:Error
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onRowUpdated?: ((e: { component?: T, element?: dxElement, model?: any, data?: any, key?: any, error?: Error }) => any);
    /**
     * @docid
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 oldData:object
     * @type_function_param1_field5 newData:object
     * @type_function_param1_field6 key:any
     * @type_function_param1_field7 cancel:boolean|Promise<void>
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onRowUpdating?: ((e: { component?: T, element?: dxElement, model?: any, oldData?: any, newData?: any, key?: any, cancel?: boolean | Promise<void> | JQueryPromise<void> }) => any);
    /**
     * @docid
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 brokenRules:Array<RequiredRule,NumericRule,RangeRule,StringLengthRule,CustomRule,CompareRule,PatternRule,EmailRule,AsyncRule>
     * @type_function_param1_field5 isValid:boolean
     * @type_function_param1_field6 key:any
     * @type_function_param1_field7 newData:object
     * @type_function_param1_field8 oldData:object
     * @type_function_param1_field9 errorText:string
     * @type_function_param1_field10 promise:Promise<void>
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onRowValidating?: ((e: { component?: T, element?: dxElement, model?: any, brokenRules?: Array<RequiredRule | NumericRule | RangeRule | StringLengthRule | CustomRule | CompareRule | PatternRule | EmailRule | AsyncRule>, isValid?: boolean, key?: any, newData?: any, oldData?: any, errorText?: string, promise?: Promise<void> | JQueryPromise<void> }) => any);
    /**
     * @docid
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 changes:Array<any>
     * @extends Action
     * @action
     * @public
     */
    onSaved?: ((e: { component?: T, element?: dxElement, model?: any, changes?: Array<any> }) => any);
    /**
     * @docid
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 changes:Array<any>
     * @type_function_param1_field5 promise:Promise<void>
     * @type_function_param1_field6 cancel:boolean
     * @extends Action
     * @action
     * @public
     */
    onSaving?: ((e: { component?: T, element?: dxElement, model?: any, changes?: Array<any>, promise?: Promise<void> | JQueryPromise<void>, cancel?: boolean }) => any);
    /**
     * @docid
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 currentSelectedRowKeys:Array<any>
     * @type_function_param1_field5 currentDeselectedRowKeys:Array<any>
     * @type_function_param1_field6 selectedRowKeys:Array<any>
     * @type_function_param1_field7 selectedRowsData:Array<Object>
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onSelectionChanged?: ((e: { component?: T, element?: dxElement, model?: any, currentSelectedRowKeys?: Array<any>, currentDeselectedRowKeys?: Array<any>, selectedRowKeys?: Array<any>, selectedRowsData?: Array<any> }) => any);
    /**
     * @docid
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 toolbarOptions:dxToolbarOptions
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onToolbarPreparing?: ((e: { component?: T, element?: dxElement, model?: any, toolbarOptions?: dxToolbarOptions }) => any);
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    pager?: { allowedPageSizes?: Array<(number | 'all')> | 'auto', displayMode: 'adaptive' | 'compact' | 'full', infoText?: string, showInfo?: boolean, showNavigationButtons?: boolean, showPageSizeSelector?: boolean, visible?: boolean | 'auto' };
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    paging?: GridBasePaging;
    /**
     * @docid
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    renderAsync?: boolean;
    /**
     * @docid
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    repaintChangesOnly?: boolean;
    /**
     * @docid
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    rowAlternationEnabled?: boolean;
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    rowDragging?: { allowDropInsideItem?: boolean, allowReordering?: boolean, autoScroll?: boolean, boundary?: string | Element | JQuery, container?: string | Element | JQuery, cursorOffset?: string | { x?: number, y?: number }, data?: any, dragDirection?: 'both' | 'horizontal' | 'vertical', dragTemplate?: template | ((dragInfo: { itemData?: any, itemElement?: dxElement }, containerElement: dxElement) => string | Element | JQuery), dropFeedbackMode?: 'push' | 'indicate', filter?: string, group?: string, handle?: string, onAdd?: ((e: { event?: event, itemData?: any, itemElement?: dxElement, fromIndex?: number, toIndex?: number, fromComponent?: dxSortable | dxDraggable, toComponent?: dxSortable | dxDraggable, fromData?: any, toData?: any, dropInsideItem?: boolean }) => any), onDragChange?: ((e: { event?: event, cancel?: boolean, itemData?: any, itemElement?: dxElement, fromIndex?: number, toIndex?: number, fromComponent?: dxSortable | dxDraggable, toComponent?: dxSortable | dxDraggable, fromData?: any, toData?: any, dropInsideItem?: boolean }) => any), onDragEnd?: ((e: { event?: event, cancel?: boolean, itemData?: any, itemElement?: dxElement, fromIndex?: number, toIndex?: number, fromComponent?: dxSortable | dxDraggable, toComponent?: dxSortable | dxDraggable, fromData?: any, toData?: any, dropInsideItem?: boolean }) => any), onDragMove?: ((e: { event?: event, cancel?: boolean, itemData?: any, itemElement?: dxElement, fromIndex?: number, toIndex?: number, fromComponent?: dxSortable | dxDraggable, toComponent?: dxSortable | dxDraggable, fromData?: any, toData?: any, dropInsideItem?: boolean }) => any), onDragStart?: ((e: { event?: event, cancel?: boolean, itemData?: any, itemElement?: dxElement, fromIndex?: number, fromData?: any }) => any), onRemove?: ((e: { event?: event, itemData?: any, itemElement?: dxElement, fromIndex?: number, toIndex?: number, fromComponent?: dxSortable | dxDraggable, toComponent?: dxSortable | dxDraggable, fromData?: any, toData?: any }) => any), onReorder?: ((e: { event?: event, itemData?: any, itemElement?: dxElement, fromIndex?: number, toIndex?: number, fromComponent?: dxSortable | dxDraggable, toComponent?: dxSortable | dxDraggable, fromData?: any, toData?: any, dropInsideItem?: boolean, promise?: Promise<void> | JQueryPromise<void> }) => any), scrollSensitivity?: number, scrollSpeed?: number, showDragIcons?: boolean };
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    scrolling?: GridBaseScrolling;
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    searchPanel?: { highlightCaseSensitive?: boolean, highlightSearchText?: boolean, placeholder?: string, searchVisibleColumnsOnly?: boolean, text?: string, visible?: boolean, width?: number };
    /**
     * @docid
     * @type Array<any>
     * @fires GridBaseOptions.onSelectionChanged
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    selectedRowKeys?: Array<any>;
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    selection?: GridBaseSelection;
    /**
     * @docid
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    showBorders?: boolean;
    /**
     * @docid
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    showColumnHeaders?: boolean;
    /**
     * @docid
     * @type boolean
     * @default false [for](Material)
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    showColumnLines?: boolean;
    /**
     * @docid
     * @type boolean
     * @default true [for](iOS)
     * @default true [for](Material)
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    showRowLines?: boolean;
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    sorting?: { ascendingText?: string, clearText?: string, descendingText?: string, mode?: 'multiple' | 'none' | 'single', showSortIndexes?: boolean };
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    stateStoring?: { customLoad?: (() => Promise<any> | JQueryPromise<any>), customSave?: ((gridState: any) => any), enabled?: boolean, savingTimeout?: number, storageKey?: string, type?: 'custom' | 'localStorage' | 'sessionStorage' };
    /**
     * @docid
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    twoWayBindingEnabled?: boolean;
    /**
     * @docid
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    wordWrapEnabled?: boolean;
}
export interface GridBaseEditing {
    /**
     * @docid GridBaseOptions.editing.confirmDelete
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    confirmDelete?: boolean;
    /**
     * @docid GridBaseOptions.editing.changes
     * @type Array<any>
     * @default []
     * @fires GridBaseOptions.onOptionChanged
     * @public
     */
    changes?: Array<any>;
    /**
     * @docid GridBaseOptions.editing.editColumnName
     * @type string
     * @default null
     * @fires GridBaseOptions.onOptionChanged
     * @public
    */
    editColumnName?: string;
    /**
     * @docid GridBaseOptions.editing.editRowKey
     * @type any
     * @default null
     * @fires GridBaseOptions.onOptionChanged
     * @public
    */
    editRowKey?: any;
    /**
     * @docid GridBaseOptions.editing.form
     * @type dxFormOptions
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    form?: dxFormOptions;
    /**
     * @docid GridBaseOptions.editing.mode
     * @type Enums.GridEditMode
     * @default "row"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    mode?: 'batch' | 'cell' | 'row' | 'form' | 'popup';
    /**
     * @docid GridBaseOptions.editing.popup
     * @type dxPopupOptions
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    popup?: dxPopupOptions;
    /**
     * @docid GridBaseOptions.editing.refreshMode
     * @type Enums.GridEditRefreshMode
     * @default "full"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    refreshMode?: 'full' | 'reshape' | 'repaint';
    /**
     * @docid GridBaseOptions.editing.selectTextOnEditStart
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    selectTextOnEditStart?: boolean;
    /**
     * @docid GridBaseOptions.editing.startEditAction
     * @type Enums.GridStartEditAction
     * @default "click"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    startEditAction?: 'click' | 'dblClick';
    /**
     * @docid GridBaseOptions.editing.texts
     * @type object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    texts?: GridBaseEditingTexts;
    /**
     * @docid GridBaseOptions.editing.useIcons
     * @type boolean
     * @default true [for](Material)
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    useIcons?: boolean;
}
export interface GridBaseEditingTexts {
    /**
     * @docid GridBaseOptions.editing.texts.addRow
     * @type string
     * @default "Add a row"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    addRow?: string;
    /**
     * @docid GridBaseOptions.editing.texts.cancelAllChanges
     * @type string
     * @default "Discard changes"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    cancelAllChanges?: string;
    /**
     * @docid GridBaseOptions.editing.texts.cancelRowChanges
     * @type string
     * @default "Cancel"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    cancelRowChanges?: string;
    /**
     * @docid GridBaseOptions.editing.texts.confirmDeleteMessage
     * @type string
     * @default "Are you sure you want to delete this record?"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    confirmDeleteMessage?: string;
    /**
     * @docid GridBaseOptions.editing.texts.confirmDeleteTitle
     * @type string
     * @default ""
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    confirmDeleteTitle?: string;
    /**
     * @docid GridBaseOptions.editing.texts.deleteRow
     * @type string
     * @default "Delete"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    deleteRow?: string;
    /**
     * @docid GridBaseOptions.editing.texts.editRow
     * @type string
     * @default "Edit"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    editRow?: string;
    /**
     * @docid GridBaseOptions.editing.texts.saveAllChanges
     * @type string
     * @default "Save changes"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    saveAllChanges?: string;
    /**
     * @docid GridBaseOptions.editing.texts.saveRowChanges
     * @type string
     * @default "Save"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    saveRowChanges?: string;
    /**
     * @docid GridBaseOptions.editing.texts.undeleteRow
     * @type string
     * @default "Undelete"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    undeleteRow?: string;
    /**
     * @docid GridBaseOptions.editing.texts.validationCancelChanges
     * @type string
     * @default "Cancel changes"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    validationCancelChanges?: string;
}
export interface GridBasePaging {
    /**
     * @docid GridBaseOptions.paging.enabled
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    enabled?: boolean;
    /**
     * @docid GridBaseOptions.paging.pageIndex
     * @type number
     * @default 0
     * @fires GridBaseOptions.onOptionChanged
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    pageIndex?: number;
    /**
     * @docid GridBaseOptions.paging.pageSize
     * @type number
     * @default 20
     * @fires GridBaseOptions.onOptionChanged
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    pageSize?: number;
}
export interface GridBaseScrolling {
    /**
     * @docid GridBaseOptions.scrolling.columnRenderingMode
     * @type Enums.GridColumnRenderingMode
     * @default "standard"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    columnRenderingMode?: 'standard' | 'virtual';
    /**
     * @docid GridBaseOptions.scrolling.preloadEnabled
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    preloadEnabled?: boolean;
    /**
     * @docid GridBaseOptions.scrolling.rowRenderingMode
     * @type Enums.GridRowRenderingMode
     * @default "standard"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    rowRenderingMode?: 'standard' | 'virtual';
    /**
     * @docid GridBaseOptions.scrolling.scrollByContent
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    scrollByContent?: boolean;
    /**
     * @docid GridBaseOptions.scrolling.scrollByThumb
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    scrollByThumb?: boolean;
    /**
     * @docid GridBaseOptions.scrolling.showScrollbar
     * @type Enums.ShowScrollbarMode
     * @default 'onScroll'
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    showScrollbar?: 'always' | 'never' | 'onHover' | 'onScroll';
    /**
     * @docid GridBaseOptions.scrolling.useNative
     * @type boolean|Enums.Mode
     * @default "auto"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    useNative?: boolean | 'auto';
}
export interface GridBaseSelection {
    /**
     * @docid GridBaseOptions.selection.allowSelectAll
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    allowSelectAll?: boolean;
    /**
     * @docid GridBaseOptions.selection.mode
     * @type Enums.SelectionMode
     * @default "none"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    mode?: 'multiple' | 'none' | 'single';
}
/**
 * @docid
 * @inherits Widget, DataHelperMixin
 * @module ui/grid_base
 * @export default
 * @hidden
 * @prevFileNamespace DevExpress.ui
 */
export interface GridBase {
    /**
     * @docid
     * @publicName beginCustomLoading(messageText)
     * @param1 messageText:string
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    beginCustomLoading(messageText: string): void;
    /**
     * @docid
     * @publicName byKey(key)
     * @param1 key:object|string|number
     * @return Promise<Object>
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    byKey(key: any | string | number): Promise<any> & JQueryPromise<any>;
    /**
     * @docid
     * @publicName cancelEditData()
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    cancelEditData(): void;
    /**
     * @docid
     * @publicName cellValue(rowIndex, dataField)
     * @param1 rowIndex:number
     * @param2 dataField:string
     * @return any
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    cellValue(rowIndex: number, dataField: string): any;
    /**
     * @docid
     * @publicName cellValue(rowIndex, dataField, value)
     * @param1 rowIndex:number
     * @param2 dataField:string
     * @param3 value:any
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    cellValue(rowIndex: number, dataField: string, value: any): void;
    /**
     * @docid
     * @publicName cellValue(rowIndex, visibleColumnIndex)
     * @param1 rowIndex:number
     * @param2 visibleColumnIndex:number
     * @return any
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    cellValue(rowIndex: number, visibleColumnIndex: number): any;
    /**
     * @docid
     * @publicName cellValue(rowIndex, visibleColumnIndex, value)
     * @param1 rowIndex:number
     * @param2 visibleColumnIndex:number
     * @param3 value:any
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    cellValue(rowIndex: number, visibleColumnIndex: number, value: any): void;
    /**
     * @docid
     * @publicName clearFilter()
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    clearFilter(): void;
    /**
     * @docid
     * @publicName clearFilter(filterName)
     * @param1 filterName:string
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    clearFilter(filterName: string): void;
    /**
     * @docid
     * @publicName clearSelection()
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    clearSelection(): void;
    /**
     * @docid
     * @publicName clearSorting()
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    clearSorting(): void;
    /**
     * @docid
     * @publicName closeEditCell()
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    closeEditCell(): void;
    /**
     * @docid
     * @publicName collapseAdaptiveDetailRow()
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    collapseAdaptiveDetailRow(): void;
    /**
     * @docid
     * @publicName columnCount()
     * @return number
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    columnCount(): number;
    /**
     * @docid
     * @publicName columnOption(id)
     * @param1 id:number|string
     * @return object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    columnOption(id: number | string): any;
    /**
     * @docid
     * @publicName columnOption(id, optionName)
     * @param1 id:number|string
     * @param2 optionName:string
     * @return any
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    columnOption(id: number | string, optionName: string): any;
    /**
     * @docid
     * @publicName columnOption(id, optionName, optionValue)
     * @param1 id:number|string
     * @param2 optionName:string
     * @param3 optionValue:any
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    columnOption(id: number | string, optionName: string, optionValue: any): void;
    /**
     * @docid
     * @publicName columnOption(id, options)
     * @param1 id:number|string
     * @param2 options:object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    columnOption(id: number | string, options: any): void;
    /**
     * @docid
     * @publicName deleteColumn(id)
     * @param1 id:number|string
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    deleteColumn(id: number | string): void;
    /**
     * @docid
     * @publicName deleteRow(rowIndex)
     * @param1 rowIndex:number
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    deleteRow(rowIndex: number): void;
    /**
     * @docid
     * @publicName deselectAll()
     * @return Promise<void>
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    deselectAll(): Promise<void> & JQueryPromise<void>;
    /**
     * @docid
     * @publicName deselectRows(keys)
     * @param1 keys:Array<any>
     * @return Promise<any>
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    deselectRows(keys: Array<any>): Promise<any> & JQueryPromise<any>;
    /**
     * @docid
     * @publicName editCell(rowIndex, dataField)
     * @param1 rowIndex:number
     * @param2 dataField:string
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    editCell(rowIndex: number, dataField: string): void;
    /**
     * @docid
     * @publicName editCell(rowIndex, visibleColumnIndex)
     * @param1 rowIndex:number
     * @param2 visibleColumnIndex:number
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    editCell(rowIndex: number, visibleColumnIndex: number): void;
    /**
     * @docid
     * @publicName editRow(rowIndex)
     * @param1 rowIndex:number
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    editRow(rowIndex: number): void;
    /**
     * @docid
     * @publicName endCustomLoading()
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    endCustomLoading(): void;
    /**
     * @docid
     * @publicName expandAdaptiveDetailRow(key)
     * @param1 key:any
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    expandAdaptiveDetailRow(key: any): void;
    /**
     * @docid
     * @publicName filter()
     * @return any
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    filter(): any;
    /**
     * @docid
     * @publicName filter(filterExpr)
     * @param1 filterExpr:any
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    filter(filterExpr: any): void;
    focus(): void;
    /**
     * @docid
     * @publicName focus(element)
     * @param1 element:Element|jQuery
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    focus(element: Element | JQuery): void;
    /**
     * @docid
     * @publicName getCellElement(rowIndex, dataField)
     * @param1 rowIndex:number
     * @param2 dataField:string
     * @return dxElement|undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    getCellElement(rowIndex: number, dataField: string): dxElement | undefined;
    /**
     * @docid
     * @publicName getCellElement(rowIndex, visibleColumnIndex)
     * @param1 rowIndex:number
     * @param2 visibleColumnIndex:number
     * @return dxElement|undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    getCellElement(rowIndex: number, visibleColumnIndex: number): dxElement | undefined;
    /**
     * @docid
     * @publicName getCombinedFilter()
     * @return any
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    getCombinedFilter(): any;
    /**
     * @docid
     * @publicName getCombinedFilter(returnDataField)
     * @param1 returnDataField:boolean
     * @return any
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    getCombinedFilter(returnDataField: boolean): any;
    getDataSource(): DataSource;
    /**
     * @docid
     * @publicName getKeyByRowIndex(rowIndex)
     * @param1 rowIndex:numeric
     * @return any
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    getKeyByRowIndex(rowIndex: number): any;
    /**
     * @docid
     * @publicName getRowElement(rowIndex)
     * @param1 rowIndex:number
     * @return Array<Element>|jQuery|undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    getRowElement(rowIndex: number): Array<Element> & JQuery | undefined;
    /**
     * @docid
     * @publicName getRowIndexByKey(key)
     * @param1 key:object|string|number
     * @return numeric
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    getRowIndexByKey(key: any | string | number): number;
    /**
     * @docid
     * @publicName getScrollable()
     * @return dxScrollable
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    getScrollable(): dxScrollable;
    /**
     * @docid
     * @publicName getVisibleColumnIndex(id)
     * @param1 id:number|string
     * @return number
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    getVisibleColumnIndex(id: number | string): number;
    /**
     * @docid
     * @publicName hasEditData()
     * @return boolean
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    hasEditData(): boolean;
    /**
     * @docid
     * @publicName hideColumnChooser()
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    hideColumnChooser(): void;
    /**
     * @docid
     * @publicName isAdaptiveDetailRowExpanded(key)
     * @param1 key:any
     * @return boolean
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    isAdaptiveDetailRowExpanded(key: any): boolean;
    /**
     * @docid
     * @publicName isRowFocused(key)
     * @param1 key:any
     * @return boolean
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    isRowFocused(key: any): boolean;
    /**
     * @docid
     * @publicName isRowSelected(key)
     * @param1 key:any
     * @return boolean
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    isRowSelected(key: any): boolean;
    /**
     * @docid
     * @publicName keyOf(obj)
     * @param1 obj:object
     * @return any
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    keyOf(obj: any): any;
    /**
     * @docid
     * @publicName navigateToRow(key)
     * @param1 key:any
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    navigateToRow(key: any): void;
    /**
     * @docid
     * @publicName pageCount()
     * @return numeric
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    pageCount(): number;
    /**
     * @docid
     * @publicName pageIndex()
     * @return numeric
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    pageIndex(): number;
    /**
     * @docid
     * @publicName pageIndex(newIndex)
     * @param1 newIndex:numeric
     * @return Promise<void>
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    pageIndex(newIndex: number): Promise<void> & JQueryPromise<void>;
    /**
     * @docid
     * @publicName pageSize()
     * @return numeric
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    pageSize(): number;
    /**
     * @docid
     * @publicName pageSize(value)
     * @param1 value:numeric
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    pageSize(value: number): void;
    /**
     * @docid
     * @publicName refresh()
     * @return Promise<void>
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    refresh(): Promise<void> & JQueryPromise<void>;
    /**
     * @docid
     * @publicName refresh(changesOnly)
     * @param1 changesOnly:boolean
     * @return Promise<void>
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    refresh(changesOnly: boolean): Promise<void> & JQueryPromise<void>;
    /**
     * @docid
     * @publicName repaintRows(rowIndexes)
     * @param1 rowIndexes:Array<number>
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    repaintRows(rowIndexes: Array<number>): void;
    /**
     * @docid
     * @publicName saveEditData()
     * @return Promise<void>
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    saveEditData(): Promise<void> & JQueryPromise<void>;
    /**
     * @docid
     * @publicName searchByText(text)
     * @param1 text:string
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    searchByText(text: string): void;
    /**
     * @docid
     * @publicName selectAll()
     * @return Promise<void>
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    selectAll(): Promise<void> & JQueryPromise<void>;
    /**
     * @docid
     * @publicName selectRows(keys, preserve)
     * @param1 keys:Array<any>
     * @param2 preserve:boolean
     * @return Promise<any>
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    selectRows(keys: Array<any>, preserve: boolean): Promise<any> & JQueryPromise<any>;
    /**
     * @docid
     * @publicName selectRowsByIndexes(indexes)
     * @param1 indexes:Array<number>
     * @return Promise<any>
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    selectRowsByIndexes(indexes: Array<number>): Promise<any> & JQueryPromise<any>;
    /**
     * @docid
     * @publicName showColumnChooser()
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    showColumnChooser(): void;
    /**
     * @docid
     * @publicName state()
     * @return object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    state(): any;
    /**
     * @docid
     * @publicName state(state)
     * @param1 state:object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    state(state: any): void;
    /**
     * @docid
     * @publicName undeleteRow(rowIndex)
     * @param1 rowIndex:number
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    undeleteRow(rowIndex: number): void;
    /**
     * @docid
     * @publicName updateDimensions()
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    updateDimensions(): void;
}

export interface GridBaseColumn {
    /**
     * @docid
     * @type Enums.HorizontalAlignment
     * @default undefined
     * @acceptValues undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    alignment?: 'center' | 'left' | 'right' | undefined;
    /**
     * @docid
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    allowEditing?: boolean;
    /**
     * @docid
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    allowFiltering?: boolean;
    /**
     * @docid
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    allowFixing?: boolean;
    /**
     * @docid
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    allowHeaderFiltering?: boolean;
    /**
     * @docid
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    allowHiding?: boolean;
    /**
     * @docid
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    allowReordering?: boolean;
    /**
     * @docid
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    allowResizing?: boolean;
    /**
     * @docid
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    allowSearch?: boolean;
    /**
     * @docid
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    allowSorting?: boolean;
    /**
     * @docid
     * @type function(rowData)
     * @type_function_param1 rowData:object
     * @type_function_return any
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    calculateCellValue?: ((rowData: any) => any);
    /**
     * @docid
     * @type string|function(rowData)
     * @type_function_param1 rowData:object
     * @type_function_return any
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    calculateDisplayValue?: string | ((rowData: any) => any);
    /**
     * @docid
     * @type function(filterValue, selectedFilterOperation, target)
     * @type_function_param1 filterValue:any
     * @type_function_param2 selectedFilterOperation:string
     * @type_function_param3 target:string
     * @type_function_return Filter expression
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    calculateFilterExpression?: ((filterValue: any, selectedFilterOperation: string, target: string) => string | Array<any> | Function);
    /**
     * @docid
     * @type string|function(rowData)
     * @type_function_param1 rowData:object
     * @type_function_return any
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    calculateSortValue?: string | ((rowData: any) => any);
    /**
     * @docid
     * @type string
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    caption?: string;
    /**
     * @docid
     * @type string
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    cssClass?: string;
    /**
     * @docid
     * @type function(cellInfo)
     * @type_function_param1 cellInfo:object
     * @type_function_param1_field1 value:string|number|date
     * @type_function_param1_field2 valueText:string
     * @type_function_param1_field3 target:string
     * @type_function_param1_field4 groupInterval:string|number
     * @type_function_return string
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    customizeText?: ((cellInfo: { value?: string | number | Date, valueText?: string, target?: string, groupInterval?: string | number }) => string);
    /**
     * @docid
     * @type string
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    dataField?: string;
    /**
     * @docid
     * @type Enums.GridColumnDataType
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    dataType?: 'string' | 'number' | 'date' | 'boolean' | 'object' | 'datetime';
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    editorOptions?: any;
    /**
     * @docid
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    encodeHtml?: boolean;
    /**
     * @docid
     * @type string
     * @default "false"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    falseText?: string;
    /**
     * @docid
     * @type Array<Enums.GridFilterOperations, string>
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    filterOperations?: Array<'=' | '<>' | '<' | '<=' | '>' | '>=' | 'contains' | 'endswith' | 'isblank' | 'isnotblank' | 'notcontains' | 'startswith' | 'between' | 'anyof' | 'noneof'>;
    /**
     * @docid
     * @type Enums.FilterType
     * @default "include"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    filterType?: 'exclude' | 'include';
    /**
     * @docid
     * @type any
     * @default undefined
     * @fires GridBaseOptions.onOptionChanged
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    filterValue?: any;
    /**
     * @docid
     * @type Array<any>
     * @default undefined
     * @fires GridBaseOptions.onOptionChanged
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    filterValues?: Array<any>;
    /**
     * @docid
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    fixed?: boolean;
    /**
     * @docid
     * @type Enums.HorizontalEdge
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    fixedPosition?: 'left' | 'right';
    /**
     * @docid
     * @type dxFormSimpleItem
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    formItem?: dxFormSimpleItem;
    /**
     * @docid
     * @type format
     * @default ""
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    format?: format;
    /**
     * @docid
     * @type object
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    headerFilter?: { allowSearch?: boolean, dataSource?: Array<any> | ((options: { component?: any, dataSource?: DataSourceOptions }) => any) | DataSourceOptions, groupInterval?: 'day' | 'hour' | 'minute' | 'month' | 'quarter' | 'second' | 'year' | number, height?: number, searchMode?: 'contains' | 'startswith' | 'equals', width?: number };
    /**
     * @docid
     * @type number
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    hidingPriority?: number;
    /**
     * @docid
     * @type boolean
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    isBand?: boolean;
    /**
     * @docid
     * @type object
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    lookup?: { allowClearing?: boolean, dataSource?: Array<any> | DataSourceOptions | Store | ((options: { data?: any, key?: any }) => Array<any> | DataSourceOptions | Store), displayExpr?: string | ((data: any) => string), valueExpr?: string };
    /**
     * @docid
     * @type number
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    minWidth?: number;
    /**
     * @docid
     * @type string
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    name?: string;
    /**
     * @docid
     * @type number
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    ownerBand?: number;
    /**
     * @docid
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    renderAsync?: boolean;
    /**
     * @docid
     * @type Enums.FilterOperations
     * @default undefined
     * @fires GridBaseOptions.onOptionChanged
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    selectedFilterOperation?: '<' | '<=' | '<>' | '=' | '>' | '>=' | 'between' | 'contains' | 'endswith' | 'notcontains' | 'startswith';
    /**
     * @docid
     * @type function(newData, value, currentRowData)
     * @type_function_param1 newData:object
     * @type_function_param2 value:any
     * @type_function_param3 currentRowData:object
     * @type_function_return void|Promise<void>
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    setCellValue?: ((newData: any, value: any, currentRowData: any) => void | Promise<void> | JQueryPromise<void>);
    /**
     * @docid
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    showEditorAlways?: boolean;
    /**
     * @docid
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    showInColumnChooser?: boolean;
    /**
     * @docid
     * @type number
     * @default undefined
     * @fires GridBaseOptions.onOptionChanged
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    sortIndex?: number;
    /**
     * @docid
     * @type Enums.SortOrder
     * @default undefined
     * @acceptValues undefined
     * @fires GridBaseOptions.onOptionChanged
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    sortOrder?: 'asc' | 'desc' | undefined;
    /**
     * @docid
     * @type function(value1, value2)
     * @type_function_param1 value1:any
     * @type_function_param2 value2:any
     * @type_function_return number
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    sortingMethod?: ((value1: any, value2: any) => number);
    /**
     * @docid
     * @type string
     * @default "true"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    trueText?: string;
    /**
     * @docid
     * @type Array<RequiredRule,NumericRule,RangeRule,StringLengthRule,CustomRule,CompareRule,PatternRule,EmailRule,AsyncRule>
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    validationRules?: Array<RequiredRule | NumericRule | RangeRule | StringLengthRule | CustomRule | CompareRule | PatternRule | EmailRule | AsyncRule>;
    /**
     * @docid
     * @type boolean
     * @default true
     * @fires GridBaseOptions.onOptionChanged
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    visible?: boolean;
    /**
     * @docid
     * @type number
     * @default undefined
     * @fires GridBaseOptions.onOptionChanged
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    visibleIndex?: number;
    /**
     * @docid
     * @type number|string
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    width?: number | string;
}

export interface GridBaseColumnButton {
    /**
     * @docid
     * @type string
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    cssClass?: string;
    /**
     * @docid
     * @type string
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    hint?: string;
    /**
     * @docid
     * @type string
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    icon?: string;
    /**
     * @docid
     * @type string
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    text?: string;
}

export interface dxDataGridOptions extends GridBaseOptions<dxDataGrid> {
    /**
     * @docid
     * @type Array<dxDataGridColumn,string>
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    columns?: Array<dxDataGridColumn | string>;
    /**
     * @docid
     * @type function(columns)
     * @type_function_param1 columns:Array<dxDataGridColumn>
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    customizeColumns?: ((columns: Array<dxDataGridColumn>) => any);
    /**
     * @docid
     * @deprecated
     * @type function(columns, rows)
     * @type_function_param1 columns:Array<dxDataGridColumn>
     * @type_function_param2 rows:Array<dxDataGridRowObject>
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    customizeExportData?: ((columns: Array<dxDataGridColumn>, rows: Array<dxDataGridRowObject>) => any);
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    editing?: dxDataGridEditing;
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    export?: { allowExportSelectedData?: boolean, customizeExcelCell?: ((options: { component?: dxDataGrid, horizontalAlignment?: 'center' | 'centerContinuous' | 'distributed' | 'fill' | 'general' | 'justify' | 'left' | 'right', verticalAlignment?: 'bottom' | 'center' | 'distributed' | 'justify' | 'top', wrapTextEnabled?: boolean, backgroundColor?: string, fillPatternType?: 'darkDown' | 'darkGray' | 'darkGrid' | 'darkHorizontal' | 'darkTrellis' | 'darkUp' | 'darkVertical' | 'gray0625' | 'gray125' | 'lightDown' | 'lightGray' | 'lightGrid' | 'lightHorizontal' | 'lightTrellis' | 'lightUp' | 'lightVertical' | 'mediumGray' | 'none' | 'solid', fillPatternColor?: string, font?: ExcelFont, value?: string | number | Date, numberFormat?: string, gridCell?: ExcelDataGridCell }) => any), enabled?: boolean, excelFilterEnabled?: boolean, excelWrapTextEnabled?: boolean, fileName?: string, ignoreExcelErrors?: boolean, proxyUrl?: string, texts?: { exportAll?: string, exportSelectedRows?: string, exportTo?: string } };
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    groupPanel?: { allowColumnDragging?: boolean, emptyPanelText?: string, visible?: boolean | 'auto' };
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    grouping?: { allowCollapsing?: boolean, autoExpandAll?: boolean, contextMenuEnabled?: boolean, expandMode?: 'buttonClick' | 'rowClick', texts?: { groupByThisColumn?: string, groupContinuedMessage?: string, groupContinuesMessage?: string, ungroup?: string, ungroupAll?: string } };
    /**
     * @docid
     * @type string|Array<string>
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    keyExpr?: string | Array<string>;
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    masterDetail?: { autoExpandAll?: boolean, enabled?: boolean, template?: template | ((detailElement: dxElement, detailInfo: { key?: any, data?: any, watch?: Function }) => any) };
    /**
     * @docid
     * @type function(e)|string
     * @type_function_param1 e:object
     * @type_function_param1_field4 event:event
     * @type_function_param1_field5 data:object
     * @type_function_param1_field6 key:any
     * @type_function_param1_field7 value:any
     * @type_function_param1_field8 displayValue:any
     * @type_function_param1_field9 text:string
     * @type_function_param1_field10 columnIndex:number
     * @type_function_param1_field11 column:object
     * @type_function_param1_field12 rowIndex:number
     * @type_function_param1_field13 rowType:string
     * @type_function_param1_field14 cellElement:dxElement
     * @type_function_param1_field15 row:dxDataGridRowObject
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onCellClick?: ((e: { component?: dxDataGrid, element?: dxElement, model?: any, event?: event, data?: any, key?: any, value?: any, displayValue?: any, text?: string, columnIndex?: number, column?: any, rowIndex?: number, rowType?: string, cellElement?: dxElement, row?: dxDataGridRowObject }) => any) | string;
    /**
     * @docid
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 event:event
     * @type_function_param1_field5 data:object
     * @type_function_param1_field6 key:any
     * @type_function_param1_field7 value:any
     * @type_function_param1_field8 displayValue:any
     * @type_function_param1_field9 text:string
     * @type_function_param1_field10 columnIndex:number
     * @type_function_param1_field11 column:dxDataGridColumn
     * @type_function_param1_field12 rowIndex:number
     * @type_function_param1_field13 rowType:string
     * @type_function_param1_field14 cellElement:dxElement
     * @type_function_param1_field15 row:dxDataGridRowObject
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onCellDblClick?: ((e: { component?: dxDataGrid, element?: dxElement, model?: any, event?: event, data?: any, key?: any, value?: any, displayValue?: any, text?: string, columnIndex?: number, column?: dxDataGridColumn, rowIndex?: number, rowType?: string, cellElement?: dxElement, row?: dxDataGridRowObject }) => any);
    /**
     * @docid
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 eventType:string
     * @type_function_param1_field5 data:object
     * @type_function_param1_field6 key:any
     * @type_function_param1_field7 value:any
     * @type_function_param1_field8 text:string
     * @type_function_param1_field9 displayValue:any
     * @type_function_param1_field10 columnIndex:number
     * @type_function_param1_field11 rowIndex:number
     * @type_function_param1_field12 column:dxDataGridColumn
     * @type_function_param1_field13 rowType:string
     * @type_function_param1_field14 cellElement:dxElement
     * @type_function_param1_field15 row:dxDataGridRowObject
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onCellHoverChanged?: ((e: { component?: dxDataGrid, element?: dxElement, model?: any, eventType?: string, data?: any, key?: any, value?: any, text?: string, displayValue?: any, columnIndex?: number, rowIndex?: number, column?: dxDataGridColumn, rowType?: string, cellElement?: dxElement, row?: dxDataGridRowObject }) => any);
    /**
     * @docid
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 data:object
     * @type_function_param1_field5 key:any
     * @type_function_param1_field6 value:any
     * @type_function_param1_field7 displayValue:any
     * @type_function_param1_field8 text:string
     * @type_function_param1_field9 columnIndex:number
     * @type_function_param1_field10 column:dxDataGridColumn
     * @type_function_param1_field11 rowIndex:number
     * @type_function_param1_field12 rowType:string
     * @type_function_param1_field13 row:dxDataGridRowObject
     * @type_function_param1_field14 isSelected:boolean
     * @type_function_param1_field15 isExpanded:boolean
     * @type_function_param1_field16 isNewRow:boolean
     * @type_function_param1_field17 cellElement:dxElement
     * @type_function_param1_field18 watch:function
     * @type_function_param1_field19 oldValue:any
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onCellPrepared?: ((e: { component?: dxDataGrid, element?: dxElement, model?: any, data?: any, key?: any, value?: any, displayValue?: any, text?: string, columnIndex?: number, column?: dxDataGridColumn, rowIndex?: number, rowType?: string, row?: dxDataGridRowObject, isSelected?: boolean, isExpanded?: boolean, isNewRow?: boolean, cellElement?: dxElement, watch?: Function, oldValue?: any }) => any);
    /**
     * @docid
     * @type function(e)
     * @type_function_param1 e:Object
     * @type_function_param1_field4 items:Array<Object>
     * @type_function_param1_field5 target:string
     * @type_function_param1_field6 targetElement:dxElement
     * @type_function_param1_field7 columnIndex:number
     * @type_function_param1_field8 column:dxDataGridColumn
     * @type_function_param1_field9 rowIndex:number
     * @type_function_param1_field10 row:dxDataGridRowObject
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onContextMenuPreparing?: ((e: { component?: dxDataGrid, element?: dxElement, model?: any, items?: Array<any>, target?: string, targetElement?: dxElement, columnIndex?: number, column?: dxDataGridColumn, rowIndex?: number, row?: dxDataGridRowObject }) => any);
    /**
     * @docid
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 data:object
     * @type_function_param1_field5 key:any
     * @type_function_param1_field6 cancel:boolean
     * @type_function_param1_field7 column:object
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onEditingStart?: ((e: { component?: dxDataGrid, element?: dxElement, model?: any, data?: any, key?: any, cancel?: boolean, column?: any }) => any);
    /**
     * @docid
     * @type function(options)
     * @type_function_param1 options:object
     * @type_function_param1_field4 parentType:string
     * @type_function_param1_field5 value:any
     * @type_function_param1_field6 setValue(newValue, newText):any
     * @type_function_param1_field7 updateValueTimeout:number
     * @type_function_param1_field8 width:number
     * @type_function_param1_field9 disabled:boolean
     * @type_function_param1_field10 rtlEnabled:boolean
     * @type_function_param1_field11 editorElement:dxElement
     * @type_function_param1_field12 readOnly:boolean
     * @type_function_param1_field13 dataField:string
     * @type_function_param1_field14 row:dxDataGridRowObject
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onEditorPrepared?: ((options: { component?: dxDataGrid, element?: dxElement, model?: any, parentType?: string, value?: any, setValue?: any, updateValueTimeout?: number, width?: number, disabled?: boolean, rtlEnabled?: boolean, editorElement?: dxElement, readOnly?: boolean, dataField?: string, row?: dxDataGridRowObject }) => any);
    /**
     * @docid
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 parentType:string
     * @type_function_param1_field5 value:any
     * @type_function_param1_field6 setValue(newValue, newText):any
     * @type_function_param1_field7 updateValueTimeout:number
     * @type_function_param1_field8 width:number
     * @type_function_param1_field9 disabled:boolean
     * @type_function_param1_field10 rtlEnabled:boolean
     * @type_function_param1_field11 cancel:boolean
     * @type_function_param1_field12 editorElement:dxElement
     * @type_function_param1_field13 readOnly:boolean
     * @type_function_param1_field14 editorName:string
     * @type_function_param1_field15 editorOptions:object
     * @type_function_param1_field16 dataField:string
     * @type_function_param1_field17 row:dxDataGridRowObject
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onEditorPreparing?: ((e: { component?: dxDataGrid, element?: dxElement, model?: any, parentType?: string, value?: any, setValue?: any, updateValueTimeout?: number, width?: number, disabled?: boolean, rtlEnabled?: boolean, cancel?: boolean, editorElement?: dxElement, readOnly?: boolean, editorName?: string, editorOptions?: any, dataField?: string, row?: dxDataGridRowObject }) => any);
    /**
     * @docid
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     * @deprecated
     */
    onExported?: ((e: { component?: dxDataGrid, element?: dxElement, model?: any }) => any);
    /**
     * @docid
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 fileName:string
     * @type_function_param1_field5 cancel:boolean
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onExporting?: ((e: { component?: dxDataGrid, element?: dxElement, model?: any, fileName?: string, cancel?: boolean }) => any);
    /**
     * @docid
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field3 fileName:string
     * @type_function_param1_field4 format:string
     * @type_function_param1_field5 data:BLOB
     * @type_function_param1_field6 cancel:boolean
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     * @deprecated
     */
    onFileSaving?: ((e: { component?: dxDataGrid, element?: dxElement, fileName?: string, format?: string, data?: Blob, cancel?: boolean }) => any);
    /**
     * @docid
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 cellElement:dxElement
     * @type_function_param1_field5 columnIndex:number
     * @type_function_param1_field6 rowIndex:number
     * @type_function_param1_field7 row:dxDataGridRowObject
     * @type_function_param1_field8 column:dxDataGridColumn
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onFocusedCellChanged?: ((e: { component?: dxDataGrid, element?: dxElement, model?: any, cellElement?: dxElement, columnIndex?: number, rowIndex?: number, row?: dxDataGridRowObject, column?: dxDataGridColumn }) => any);
    /**
     * @docid
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 cellElement:dxElement
     * @type_function_param1_field5 prevColumnIndex:number
     * @type_function_param1_field6 prevRowIndex:number
     * @type_function_param1_field7 newColumnIndex:number
     * @type_function_param1_field8 newRowIndex:number
     * @type_function_param1_field9 event:event
     * @type_function_param1_field10 rows:Array<dxDataGridRowObject>
     * @type_function_param1_field11 columns:Array<dxDataGridColumn>
     * @type_function_param1_field12 cancel:boolean
     * @type_function_param1_field13 isHighlighted:boolean
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onFocusedCellChanging?: ((e: { component?: dxDataGrid, element?: dxElement, model?: any, cellElement?: dxElement, prevColumnIndex?: number, prevRowIndex?: number, newColumnIndex?: number, newRowIndex?: number, event?: event, rows?: Array<dxDataGridRowObject>, columns?: Array<dxDataGridColumn>, cancel?: boolean, isHighlighted?: boolean }) => any);
    /**
     * @docid
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 rowElement:dxElement
     * @type_function_param1_field5 rowIndex:number
     * @type_function_param1_field6 row:dxDataGridRowObject
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onFocusedRowChanged?: ((e: { component?: dxDataGrid, element?: dxElement, model?: any, rowElement?: dxElement, rowIndex?: number, row?: dxDataGridRowObject }) => any);
    /**
     * @docid
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 rowElement:dxElement
     * @type_function_param1_field5 prevRowIndex:number
     * @type_function_param1_field6 newRowIndex:number
     * @type_function_param1_field7 event:event
     * @type_function_param1_field8 rows:Array<dxDataGridRowObject>
     * @type_function_param1_field9 cancel:boolean
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onFocusedRowChanging?: ((e: { component?: dxDataGrid, element?: dxElement, model?: any, rowElement?: dxElement, prevRowIndex?: number, newRowIndex?: number, event?: event, rows?: Array<dxDataGridRowObject>, cancel?: boolean }) => any);
    /**
     * @docid
     * @type function(e)|string
     * @type_function_param1 e:object
     * @type_function_param1_field4 event:event
     * @type_function_param1_field5 data:object
     * @type_function_param1_field6 key:any
     * @type_function_param1_field7 values:Array<any>
     * @type_function_param1_field8 columns:Array<Object>
     * @type_function_param1_field9 rowIndex:number
     * @type_function_param1_field10 rowType:string
     * @type_function_param1_field11 isSelected:boolean
     * @type_function_param1_field12 isExpanded:boolean
     * @type_function_param1_field13 isNewRow:boolean
     * @type_function_param1_field14 groupIndex:number
     * @type_function_param1_field15 rowElement:dxElement
     * @type_function_param1_field16 handled:boolean
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onRowClick?: ((e: { component?: dxDataGrid, element?: dxElement, model?: any, event?: event, data?: any, key?: any, values?: Array<any>, columns?: Array<any>, rowIndex?: number, rowType?: string, isSelected?: boolean, isExpanded?: boolean, isNewRow?: boolean, groupIndex?: number, rowElement?: dxElement, handled?: boolean }) => any) | string;
    /**
     * @docid
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 event:event
     * @type_function_param1_field5 data:object
     * @type_function_param1_field6 key:any
     * @type_function_param1_field7 values:Array<any>
     * @type_function_param1_field8 columns:Array<dxDataGridColumn>
     * @type_function_param1_field9 rowIndex:number
     * @type_function_param1_field10 rowType:string
     * @type_function_param1_field11 isSelected:boolean
     * @type_function_param1_field12 isExpanded:boolean
     * @type_function_param1_field13 isNewRow:boolean
     * @type_function_param1_field14 groupIndex:number
     * @type_function_param1_field15 rowElement:dxElement
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onRowDblClick?: ((e: { component?: dxDataGrid, element?: dxElement, model?: any, event?: event, data?: any, key?: any, values?: Array<any>, columns?: Array<dxDataGridColumn>, rowIndex?: number, rowType?: string, isSelected?: boolean, isExpanded?: boolean, isNewRow?: boolean, groupIndex?: number, rowElement?: dxElement }) => any);
    /**
     * @docid
     * @type function(e)
     * @type_function_param1 e:object
     * @type_function_param1_field4 data:object
     * @type_function_param1_field5 key:any
     * @type_function_param1_field6 values:Array<any>
     * @type_function_param1_field7 columns:Array<dxDataGridColumn>
     * @type_function_param1_field8 rowIndex:number
     * @type_function_param1_field9 rowType:string
     * @type_function_param1_field10 groupIndex:number
     * @type_function_param1_field11 isSelected:boolean
     * @type_function_param1_field12 isExpanded:boolean
     * @type_function_param1_field13 isNewRow:boolean
     * @type_function_param1_field14 rowElement:dxElement
     * @extends Action
     * @action
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onRowPrepared?: ((e: { component?: dxDataGrid, element?: dxElement, model?: any, data?: any, key?: any, values?: Array<any>, columns?: Array<dxDataGridColumn>, rowIndex?: number, rowType?: string, groupIndex?: number, isSelected?: boolean, isExpanded?: boolean, isNewRow?: boolean, rowElement?: dxElement }) => any);
    /**
     * @docid
     * @type boolean|object|Enums.Mode
     * @default "auto"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    remoteOperations?: boolean | { filtering?: boolean, groupPaging?: boolean, grouping?: boolean, paging?: boolean, sorting?: boolean, summary?: boolean } | 'auto';
    /**
     * @docid
     * @type template|function
     * @type_function_param1 rowElement:dxElement
     * @type_function_param2 rowInfo:object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    rowTemplate?: template | ((rowElement: dxElement, rowInfo: any) => any);
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    scrolling?: dxDataGridScrolling;
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    selection?: dxDataGridSelection;
    /**
     * @docid
     * @type Filter expression
     * @default []
     * @fires dxDataGridOptions.onOptionChanged
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    selectionFilter?: string | Array<any> | Function;
    /**
     * @docid
     * @type Array<Object>
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    sortByGroupSummaryInfo?: Array<{ groupColumn?: string, sortOrder?: 'asc' | 'desc', summaryItem?: string | number }>;
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    summary?: { calculateCustomSummary?: ((options: { component?: dxDataGrid, name?: string, summaryProcess?: string, value?: any, totalValue?: any, groupIndex?: number }) => any), groupItems?: Array<{ alignByColumn?: boolean, column?: string, customizeText?: ((itemInfo: { value?: string | number | Date, valueText?: string }) => string), displayFormat?: string, name?: string, showInColumn?: string, showInGroupFooter?: boolean, skipEmptyValues?: boolean, summaryType?: 'avg' | 'count' | 'custom' | 'max' | 'min' | 'sum' | string, valueFormat?: format }>, recalculateWhileEditing?: boolean, skipEmptyValues?: boolean, texts?: { avg?: string, avgOtherColumn?: string, count?: string, max?: string, maxOtherColumn?: string, min?: string, minOtherColumn?: string, sum?: string, sumOtherColumn?: string }, totalItems?: Array<{ alignment?: 'center' | 'left' | 'right', column?: string, cssClass?: string, customizeText?: ((itemInfo: { value?: string | number | Date, valueText?: string }) => string), displayFormat?: string, name?: string, showInColumn?: string, skipEmptyValues?: boolean, summaryType?: 'avg' | 'count' | 'custom' | 'max' | 'min' | 'sum' | string, valueFormat?: format }> };
}
export interface dxDataGridEditing extends GridBaseEditing {
    /**
     * @docid dxDataGridOptions.editing.allowAdding
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    allowAdding?: boolean;
    /**
     * @docid dxDataGridOptions.editing.allowDeleting
     * @type boolean|function
     * @default false
     * @type_function_param1 options:object
     * @type_function_param1_field1 component:dxDataGrid
     * @type_function_param1_field2 row:dxDataGridRowObject
     * @type_function_return Boolean
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    allowDeleting?: boolean | ((options: { component?: dxDataGrid, row?: dxDataGridRowObject }) => boolean);
    /**
     * @docid dxDataGridOptions.editing.allowUpdating
     * @type boolean|function
     * @default false
     * @type_function_param1 options:object
     * @type_function_param1_field1 component:dxDataGrid
     * @type_function_param1_field2 row:dxDataGridRowObject
     * @type_function_return Boolean
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    allowUpdating?: boolean | ((options: { component?: dxDataGrid, row?: dxDataGridRowObject }) => boolean);
    /**
     * @docid dxDataGridOptions.editing.texts
     * @type object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    texts?: any;
}
export interface dxDataGridScrolling extends GridBaseScrolling {
    /**
     * @docid dxDataGridOptions.scrolling.mode
     * @type Enums.GridScrollingMode
     * @default "standard"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    mode?: 'infinite' | 'standard' | 'virtual';
}
export interface dxDataGridSelection extends GridBaseSelection {
    /**
     * @docid dxDataGridOptions.selection.deferred
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    deferred?: boolean;
    /**
     * @docid dxDataGridOptions.selection.selectAllMode
     * @type Enums.SelectAllMode
     * @default "allPages"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    selectAllMode?: 'allPages' | 'page';
    /**
     * @docid dxDataGridOptions.selection.showCheckBoxesMode
     * @type Enums.GridSelectionShowCheckBoxesMode
     * @default "onClick"
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    showCheckBoxesMode?: 'always' | 'none' | 'onClick' | 'onLongTap';
}
/**
 * @docid
 * @inherits GridBase
 * @module ui/data_grid
 * @export default
 * @prevFileNamespace DevExpress.ui
 * @public
 */
declare class dxDataGrid extends Widget implements GridBase {
    constructor(element: Element, options?: dxDataGridOptions)
    constructor(element: JQuery, options?: dxDataGridOptions)
    /**
     * @docid
     * @publicName addColumn(columnOptions)
     * @param1 columnOptions:object|string
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    addColumn(columnOptions: any | string): void;
    /**
     * @docid
     * @publicName addRow()
     * @return Promise<void>
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    addRow(): Promise<void> & JQueryPromise<void>;
    /**
     * @docid
     * @publicName clearGrouping()
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    clearGrouping(): void;
    /**
     * @docid
     * @publicName collapseAll(groupIndex)
     * @param1 groupIndex:number | undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    collapseAll(groupIndex?: number): void;
    /**
     * @docid
     * @publicName collapseRow(key)
     * @param1 key:any
     * @return Promise<void>
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    collapseRow(key: any): Promise<void> & JQueryPromise<void>;
    /**
     * @docid
     * @publicName expandAll(groupIndex)
     * @param1 groupIndex:number | undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    expandAll(groupIndex?: number): void;
    /**
     * @docid
     * @publicName expandRow(key)
     * @param1 key:any
     * @return Promise<void>
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    expandRow(key: any): Promise<void> & JQueryPromise<void>;
    /**
     * @docid
     * @publicName exportToExcel(selectionOnly)
     * @deprecated excelExporter.exportDataGrid
     * @param1 selectionOnly:boolean
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    exportToExcel(selectionOnly: boolean): void;
    /**
     * @docid
     * @publicName getSelectedRowKeys()
     * @return Array<any> | Promise<any>
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    getSelectedRowKeys(): Array<any> & Promise<any> & JQueryPromise<any>;
    /**
     * @docid
     * @publicName getSelectedRowsData()
     * @return Array<any> | Promise<any>
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    getSelectedRowsData(): Array<any> & Promise<any> & JQueryPromise<any>;
    /**
     * @docid
     * @publicName getTotalSummaryValue(summaryItemName)
     * @param1 summaryItemName:String
     * @return any
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    getTotalSummaryValue(summaryItemName: string): any;
    /**
     * @docid
     * @publicName getVisibleColumns()
     * @return Array<dxDataGridColumn>
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    getVisibleColumns(): Array<dxDataGridColumn>;
    /**
     * @docid
     * @publicName getVisibleColumns(headerLevel)
     * @param1 headerLevel:number
     * @return Array<dxDataGridColumn>
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    getVisibleColumns(headerLevel: number): Array<dxDataGridColumn>;
    /**
     * @docid
     * @publicName getVisibleRows()
     * @return Array<dxDataGridRowObject>
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    getVisibleRows(): Array<dxDataGridRowObject>;
    /**
     * @docid
     * @publicName isRowExpanded(key)
     * @param1 key:any
     * @return boolean
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    isRowExpanded(key: any): boolean;
    /**
     * @docid
     * @publicName isRowSelected(data)
     * @param1 data:any
     * @return boolean
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    isRowSelected(data: any): boolean;
    isRowSelected(key: any): boolean;
    /**
     * @docid
     * @publicName totalCount()
     * @return numeric
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    totalCount(): number;

    beginCustomLoading(messageText: string): void;
    byKey(key: any | string | number): Promise<any> & JQueryPromise<any>;
    cancelEditData(): void;
    cellValue(rowIndex: number, dataField: string): any;
    cellValue(rowIndex: number, dataField: string, value: any): void;
    cellValue(rowIndex: number, visibleColumnIndex: number): any;
    cellValue(rowIndex: number, visibleColumnIndex: number, value: any): void;
    clearFilter(): void;
    clearFilter(filterName: string): void;
    clearSelection(): void;
    clearSorting(): void;
    closeEditCell(): void;
    collapseAdaptiveDetailRow(): void;
    columnCount(): number;
    columnOption(id: number | string): any;
    columnOption(id: number | string, optionName: string): any;
    columnOption(id: number | string, optionName: string, optionValue: any): void;
    columnOption(id: number | string, options: any): void;
    deleteColumn(id: number | string): void;
    deleteRow(rowIndex: number): void;
    deselectAll(): Promise<void> & JQueryPromise<void>;
    deselectRows(keys: Array<any>): Promise<any> & JQueryPromise<any>;
    editCell(rowIndex: number, dataField: string): void;
    editCell(rowIndex: number, visibleColumnIndex: number): void;
    editRow(rowIndex: number): void;
    endCustomLoading(): void;
    expandAdaptiveDetailRow(key: any): void;
    filter(): any;
    filter(filterExpr: any): void;
    focus(): void;
    focus(element: Element | JQuery): void;
    getCellElement(rowIndex: number, dataField: string): dxElement | undefined;
    getCellElement(rowIndex: number, visibleColumnIndex: number): dxElement | undefined;
    getCombinedFilter(): any;
    getCombinedFilter(returnDataField: boolean): any;
    getDataSource(): DataSource;
    getKeyByRowIndex(rowIndex: number): any;
    getRowElement(rowIndex: number): Array<Element> & JQuery | undefined;
    getRowIndexByKey(key: any | string | number): number;
    getScrollable(): dxScrollable;
    getVisibleColumnIndex(id: number | string): number;
    hasEditData(): boolean;
    hideColumnChooser(): void;
    isAdaptiveDetailRowExpanded(key: any): boolean;
    isRowFocused(key: any): boolean;
    isRowSelected(key: any): boolean;
    keyOf(obj: any): any;
    navigateToRow(key: any): void;
    pageCount(): number;
    pageIndex(): number;
    pageIndex(newIndex: number): Promise<void> & JQueryPromise<void>;
    pageSize(): number;
    pageSize(value: number): void;
    refresh(): Promise<void> & JQueryPromise<void>;
    refresh(changesOnly: boolean): Promise<void> & JQueryPromise<void>;
    repaintRows(rowIndexes: Array<number>): void;
    saveEditData(): Promise<void> & JQueryPromise<void>;
    searchByText(text: string): void;
    selectAll(): Promise<void> & JQueryPromise<void>;
    selectRows(keys: Array<any>, preserve: boolean): Promise<any> & JQueryPromise<any>;
    selectRowsByIndexes(indexes: Array<number>): Promise<any> & JQueryPromise<any>;
    showColumnChooser(): void;
    state(): any;
    state(state: any): void;
    undeleteRow(rowIndex: number): void;
    updateDimensions(): void;
}

export interface dxDataGridColumn extends GridBaseColumn {
    /**
     * @docid
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    allowExporting?: boolean;
    /**
     * @docid
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    allowGrouping?: boolean;
    /**
     * @docid
     * @type boolean
     * @default true
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    autoExpandGroup?: boolean;
    /**
     * @docid
     * @type Array<Enums.GridColumnButtonName,dxDataGridColumnButton>
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    buttons?: Array<'cancel' | 'delete' | 'edit' | 'save' | 'undelete' | dxDataGridColumnButton>;
    /**
     * @docid
     * @type string|function(rowData)
     * @type_function_param1 rowData:object
     * @type_function_return any
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    calculateGroupValue?: string | ((rowData: any) => any);
    /**
     * @docid
     * @type template|function
     * @type_function_param1 cellElement:dxElement
     * @type_function_param2 cellInfo:object
     * @type_function_param2_field1 data:object
     * @type_function_param2_field2 component:dxDataGrid
     * @type_function_param2_field3 value:any
     * @type_function_param2_field4 oldValue:any
     * @type_function_param2_field5 displayValue:any
     * @type_function_param2_field6 text:string
     * @type_function_param2_field7 columnIndex:number
     * @type_function_param2_field8 rowIndex:number
     * @type_function_param2_field9 column:dxDataGridColumn
     * @type_function_param2_field10 row:dxDataGridRowObject
     * @type_function_param2_field11 rowType:string
     * @type_function_param2_field12 watch:function
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    cellTemplate?: template | ((cellElement: dxElement, cellInfo: { data?: any, component?: dxDataGrid, value?: any, oldValue?: any, displayValue?: any, text?: string, columnIndex?: number, rowIndex?: number, column?: dxDataGridColumn, row?: dxDataGridRowObject, rowType?: string, watch?: Function }) => any);
    /**
     * @docid
     * @type Array<dxDataGridColumn,string>
     * @default undefined
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    columns?: Array<dxDataGridColumn | string>;
    /**
     * @docid
     * @type template|function
     * @type_function_param1 cellElement:dxElement
     * @type_function_param2 cellInfo:object
     * @type_function_param2_field1 setValue(newValue, newText):any
     * @type_function_param2_field2 data:object
     * @type_function_param2_field3 component:dxDataGrid
     * @type_function_param2_field4 value:any
     * @type_function_param2_field5 displayValue:any
     * @type_function_param2_field6 text:string
     * @type_function_param2_field7 columnIndex:number
     * @type_function_param2_field8 rowIndex:number
     * @type_function_param2_field9 column:dxDataGridColumn
     * @type_function_param2_field10 row:dxDataGridRowObject
     * @type_function_param2_field11 rowType:string
     * @type_function_param2_field12 watch:function
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    editCellTemplate?: template | ((cellElement: dxElement, cellInfo: { setValue?: any, data?: any, component?: dxDataGrid, value?: any, displayValue?: any, text?: string, columnIndex?: number, rowIndex?: number, column?: dxDataGridColumn, row?: dxDataGridRowObject, rowType?: string, watch?: Function }) => any);
    /**
     * @docid
     * @type template|function
     * @type_function_param1 cellElement:dxElement
     * @type_function_param2 cellInfo:object
     * @type_function_param2_field1 data:object
     * @type_function_param2_field2 component:dxDataGrid
     * @type_function_param2_field3 value:any
     * @type_function_param2_field4 text:string
     * @type_function_param2_field5 displayValue:any
     * @type_function_param2_field6 columnIndex:number
     * @type_function_param2_field7 rowIndex:number
     * @type_function_param2_field8 column:dxDataGridColumn
     * @type_function_param2_field9 row:dxDataGridRowObject
     * @type_function_param2_field10 summaryItems:Array<any>
     * @type_function_param2_field11 groupContinuesMessage:string
     * @type_function_param2_field12 groupContinuedMessage:string
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    groupCellTemplate?: template | ((cellElement: dxElement, cellInfo: { data?: any, component?: dxDataGrid, value?: any, text?: string, displayValue?: any, columnIndex?: number, rowIndex?: number, column?: dxDataGridColumn, row?: dxDataGridRowObject, summaryItems?: Array<any>, groupContinuesMessage?: string, groupContinuedMessage?: string }) => any);
    /**
     * @docid
     * @type number
     * @default undefined
     * @fires dxDataGridOptions.onOptionChanged
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    groupIndex?: number;
    /**
     * @docid
     * @type template|function
     * @type_function_param1 columnHeader:dxElement
     * @type_function_param2 headerInfo:object
     * @type_function_param2_field1 component:dxDataGrid
     * @type_function_param2_field2 columnIndex:number
     * @type_function_param2_field3 column:dxDataGridColumn
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    headerCellTemplate?: template | ((columnHeader: dxElement, headerInfo: { component?: dxDataGrid, columnIndex?: number, column?: dxDataGridColumn }) => any);
    /**
     * @docid
     * @type boolean
     * @default false
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    showWhenGrouped?: boolean;
    /**
     * @docid
     * @publicName type
     * @type Enums.GridCommandColumnType
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    type?: 'adaptive' | 'buttons' | 'detailExpand' | 'groupExpand' | 'selection';
}

export interface dxDataGridColumnButton extends GridBaseColumnButton {
    /**
     * @docid
     * @type Enums.GridColumnButtonName|string
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    name?: 'cancel' | 'delete' | 'edit' | 'save' | 'undelete' | string;
    /**
     * @docid
     * @type function(e)|string
     * @type_function_param1 e:object
     * @type_function_param1_field1 component:dxDataGrid
     * @type_function_param1_field2 element:dxElement
     * @type_function_param1_field3 model:object
     * @type_function_param1_field4 event:event
     * @type_function_param1_field5 row:dxDataGridRowObject
     * @type_function_param1_field6 column:dxDataGridColumn
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    onClick?: ((e: { component?: dxDataGrid, element?: dxElement, model?: any, event?: event, row?: dxDataGridRowObject, column?: dxDataGridColumn }) => any) | string;
    /**
     * @docid
     * @type template|function
     * @type_function_param1 cellElement:dxElement
     * @type_function_param2 cellInfo:object
     * @type_function_param2_field1 component:dxDataGrid
     * @type_function_param2_field2 data:object
     * @type_function_param2_field3 key:any
     * @type_function_param2_field4 columnIndex:number
     * @type_function_param2_field5 column:dxDataGridColumn
     * @type_function_param2_field6 rowIndex:number
     * @type_function_param2_field7 rowType:string
     * @type_function_param2_field8 row:dxDataGridRowObject
     * @type_function_return string|Element|jQuery
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    template?: template | ((cellElement: dxElement, cellInfo: { component?: dxDataGrid, data?: any, key?: any, columnIndex?: number, column?: dxDataGridColumn, rowIndex?: number, rowType?: string, row?: dxDataGridRowObject }) => string | Element | JQuery);
    /**
     * @docid
     * @type boolean|function
     * @default true
     * @type_function_param1 options:object
     * @type_function_param1_field1 component:dxDataGrid
     * @type_function_param1_field2 row:dxDataGridRowObject
     * @type_function_param1_field3 column:dxDataGridColumn
     * @type_function_return Boolean
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    visible?: boolean | ((options: { component?: dxDataGrid, row?: dxDataGridRowObject, column?: dxDataGridColumn }) => boolean);
}

export interface dxDataGridRowObject {
    /**
     * @docid
     * @type object
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    data?: any;
    /**
     * @docid
     * @type number
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    groupIndex?: number;
    /**
     * @docid
     * @type boolean
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    isEditing?: boolean;
    /**
     * @docid
     * @type boolean
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    isExpanded?: boolean;
    /**
     * @docid
     * @type boolean
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    isNewRow?: boolean;
    /**
     * @docid
     * @type boolean
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    isSelected?: boolean;
    /**
     * @docid
     * @type any
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    key?: any;
    /**
     * @docid
     * @type number
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    rowIndex?: number;
    /**
     * @docid
     * @type string
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    rowType?: string;
    /**
     * @docid
     * @type Array<any>
     * @prevFileNamespace DevExpress.ui
     * @public
     */
    values?: Array<any>;
}

declare global {
interface JQuery {
    dxDataGrid(): JQuery;
    dxDataGrid(options: "instance"): dxDataGrid;
    dxDataGrid(options: string): any;
    dxDataGrid(options: string, ...params: any[]): any;
    dxDataGrid(options: dxDataGridOptions): JQuery;
}
}
export type Options = dxDataGridOptions;

/** @deprecated use Options instead */
export type IOptions = dxDataGridOptions;
export type Column = dxDataGridColumn;

export default dxDataGrid;
